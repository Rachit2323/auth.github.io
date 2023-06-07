const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { BookReview } = require("./book.js");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	bookReviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BookReview',
	  }]
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	// console.log('dtaa');
	// console.log(data);
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		bookReviews: Joi.array().items(Joi.object({
            title: Joi.string().required().label("Book Title"),
            author: Joi.string().required().label("Book Author"),
            rating: Joi.number().integer().min(1).max(5).required().label("Rating"),
            reviewText: Joi.string().required().label("Review Text")
        }))
	});
	return schema.validate(data);
};

module.exports = { User, validate };