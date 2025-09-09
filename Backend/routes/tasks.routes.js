const express = require('express');
const taskRouter = express.Router();
const checkAuth = require("../middleware/auth");

//All task related api endpoint will be mentioned.
const taskController = require("../controllers/tasks.controller");
//all tasks
taskRouter.get("/all",checkAuth,taskController.getAllTasks);
//Perticular Task
taskRouter.get("/show/:taskid",checkAuth,taskController.getTaskById);
//adding a new task 
taskRouter.post("/add/:uid",checkAuth,taskController.addTask);
//update
taskRouter.put("/update/:tid",checkAuth,taskController.updateTask)
//delete
taskRouter.delete("/delete/:tid",checkAuth,taskController.deleteTask);
 

module.exports = taskRouter;
console.log("task router is working");