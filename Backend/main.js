//loading the express 
const express = require('express');
const cors    = require('cors');
const env     = require('dotenv').config();
const db = require("./db");
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
})); // to make the server cors free.
//enable POST Request 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to taskAPI</h1>");
});

//consuming the taskRouter here
const taskRouter = require("./routes/tasks.routes");
const userRouter = require('./routes/users.routes');
app.use("/api/tasks",taskRouter);
app.use("/api/users",userRouter);
//consuming the chatRouter here
const geminiRouter = require("./routes/gemini.routes");
app.use("/api/chat",geminiRouter);

app.listen(PORT,HOST,()=>{
    console.log(`Express server has started at http://${HOST}:${PORT}/`);
})