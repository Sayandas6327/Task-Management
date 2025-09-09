const taskModel = require("../models/task.model");

const addTask = async(req,res)=>{
    try{
           let obj=  await taskModel.create({
                   "task_title": req.body.task_title,
                   "task_desc" : req.body.task_desc,
                   "user_id" : req.params.uid
             });
             if(!obj){
                res.status(403).json({"message":"error adding task"});
             }else{
                res.status(200).json({"message":"task added successfully"});
             }
            }
            catch(error){
                console.log(error);
            }
};
const updateTask= async(req,res)=>{
    try{
      let dt = new Date();
     const taskObj= await taskModel.updateOne(
        {"_id":req.params.tid},
        {$set:{
           "task_title":req.body.task_title,
           "task_desc" :req.body.task_desc,
           "created":dt 
      }});
      if(!taskObj){
        res.status(403).json({"message":"unable to update task"});
      }else{
        res.status(200).json({"message":"Task successfully Updated"});
      }

  }
  catch(error){
    console.log(error);
  }
};
const deleteTask= async(req,res)=>{
    try{
        const taskObj= await taskModel.deleteOne({"_id":req.params.tid});
        if(!taskObj){
            res.status(403).json({"message":"Unable to Delete Task"});
        }else{
            res.status(200).json({"message":"task has been deleted successfully"});
        }
      }catch(error){
        console.log(error);
      }
};
const getAllTasks= async(req,res)=>{
     try{ 
       let tasks= await  taskModel.find({}).exec();
       if(!tasks){
             console.log("empty collection");
       }    else{
           res.status(200).json(tasks);
       }
   }
       catch(error){
           console.log(error);
       }     

};
const getTaskById= async(req,res)=>{
    try{     
    let task = await taskModel.findOne({"_id":req.params.taskid});
    if(!task){
         res.status(403).json({"message":"no such task found"});
    }else{
         res.status(200).json(task);
    }   
}
    catch(error){
         console.log(error); 
    }
};

module.exports = {
      addTask,updateTask,deleteTask,getAllTasks,getTaskById
};
console.log("Task controller is working");