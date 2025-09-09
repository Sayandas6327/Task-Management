const mongoose = require('mongoose');
const env  = require('dotenv').config();
const test =async()=>{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Successfully connected to MongoDB");

}
//Handling the Promise .

test().catch((error)=>{
      console.log(error);
});