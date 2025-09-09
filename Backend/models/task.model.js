const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
       "task_title":{
            type:String,
            minlength:3,
            maxlength:100,
            required:[true,'task title is required']

       },
       "task_desc":{
            type:String,
            minlength:3,
            maxlength:100,
            required:[true,"Task description is Required"]
       },
       "created":{
            type:Date,
            required:true,
            default: new Date()
       },
       //UserCollection relationship
       "user_id":{
            type:mongoose.Types.ObjectId,
            required:[true,'User ID is required'],
            ref:"userModel" //collection name
       }
       
},{versionKey:false});
//versionKey will not generate the __v field into the documents.


//Convert the Schema Object into mongoose model

module.exports=mongoose.model("taskModel",taskSchema,"tasks");
                               //Name      //Schema   //collections_name

console.log("TaskModel is Ready to operate");