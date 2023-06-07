const express= require("express");
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");
const bookReviewRoutes = require('./routes/bookReview.js');
require("dotenv").config();
const userRoutes=require('./routes/users.js');
const authRoutes=require('./routes/auth.js');


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use('/api', bookReviewRoutes);


const PORT=process.env.PORT||1523;
app.listen(PORT,()=>console.log(`Listening on Port ${PORT}`));
