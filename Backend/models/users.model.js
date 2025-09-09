const mongoose = require('mongoose');
//Adding mongoose server side validation.
const userSchema = mongoose.Schema({
      "name":{
          type:'String',
          required:[true,"Name is Required"],
          validate:{
            validator : (value)=>{
                return /^[a-zA-Z\s-]{3,20}$/.test(value);
            },
            message:(props)=>`${props.value} must contains letters min 3 to max 20 chars long`
          }
      },
      "phone":{
        type:'String',
        required:[true,'Mobile number is required'],
        unique:true,
        validate:{
            validator:(phone)=>{
                return /^[6-9]\d{9}$/.test(phone);
            },
            message:(props)=>`${props.value} is Invalid Indian Mobile number , must starts with 6-9 and min or max has to be 10 digited.`
        }
      },
      "email":{
         type:'String',
         required:[true,'email is Required'],
         unique:true,
         validate:{
            validator:(email)=>{
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

            },
            message: (props)=>`{props.value} is Invalid Email address`
         }
      },
      "pass1":{
        type:'String',
        required:[true,'password is required'],
        // validate:{
        //     validator:(pass1)=>{
        //          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(pass1);

        //     },
        //     message:(props)=>`Password should contains 
        //        Atleast one Uppercase,LowerCase,Digit,one spl charecter ,& min 8 to max 15 chars long.
        //     `
        // }
      },
      "created":{
          type:Date,
          default: new Date()
      }
},{versionKey:false});

module.exports=mongoose.model("userModel",userSchema,"users");
console.log("user model is working");
