const userModel = require("../models/users.model");
//importing TaskModel
const taskModel = require("../models/task.model");
//loading the jwt token
const jwt = require('jsonwebtoken');
//loading the dotenv
const env = require('dotenv').config();
//importing bcrypt
const bcryptjs = require('bcryptjs');
const { default: mongoose } = require("mongoose");
const id = mongoose.Types.ObjectId;

//pasword hashing
const hashedPass = async(inputPass)=>{
    const hashed = await bcryptjs.hashSync(inputPass,10);
    return hashed;
}
const signup = async(req,res)=>{
    try{ 
        let pass1 = req.body.pass1;;
        let hashed = await hashedPass(pass1);
   const userObj= await userModel.create({
        "name":req.body.name,
        "phone":req.body.phone,
        "email":req.body.email,
        "pass1":hashed
    });
    if(!userObj){
        res.status(200).json({"message":"Sign Up Error"});
    }else{
        res.status(200).json({"message":"Sign Up Successfull"});
    }

    }catch(error){
        res.status(403).json(error);
    }
}
// Controller function// Controller function
const showTasksByUserID = async (req, res) => {
  try {
    const { uid } = req.params;   // ✅ correctly extract id
    
     // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    // let userObjectId;
    // try {
    //  userObjectId = new mongoose.Types.ObjectId(id); // force-cast
    // } catch (err) {
    //   return res.status(400).json({ message: "Invalid user ID format" });
    // }
    const tasks = await taskModel.find({ user_id: uid }); // ✅ query MongoDB
    // const tasks = await taskModel.find({ user_id: id });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("showTasksByUserID Error:", error); // ✅ debug log
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const signin = async(req,res)=>{
      const user =  await userModel.findOne({"email":req.body.email}).exec();
      if (user){
          {
            const db_hashed_pass = user.pass1;
            const isValid =  await bcryptjs.compareSync(req.body.pass1,db_hashed_pass) ? true : false;
            if(isValid){
                //if login successfull then we will create the token
                const token = jwt.sign({"_id":user._id},process.env.SECRET_KEY,{expiresIn:"1h"});
                //res.status(200).json({"message":"login successfull","user":user});
                const tasks = await taskModel.find({ userId: user._id });
                res.status(200).json({"message":"Sign In Successfull","tasks":tasks,"token":token,"user":user});
            }else{
                res.status(200).json({"message":"Invalid Username or Password"});
            }
          }
      }else{
         res.status(200).json({"message":"No Such User Exists"});
      }
}

module.exports ={
    signup,signin,showTasksByUserID
};

console.log("user controller is working");