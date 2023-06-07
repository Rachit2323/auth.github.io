const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

			
		const user = await User.findOne({ email: req.body.email });
		//It measn in the User collection you have to find the req.body.email in the email
		console.log('e');
		// console.log(email);
		// console.log(req.body.email);
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		console.log('req');
        console.log(req.body);
		await new User({ ...req.body, password: hashPassword}).save();
		// here what happend is we are copying the all new user detail by spreading operation and 
		// make the password to save the hashPassword
		//The object spreading syntax ...req.body is used to create a new object by copying the properties from the req.body object.
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;