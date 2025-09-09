import React, { useState, useEffect } from 'react'
import './Task.css'
import Todocards from './Todocards';
import Update from './Update';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
let token = sessionStorage.getItem("token");
let id = sessionStorage.getItem("_Id");
let toUpdateArray:any[] = [];
// console.log(id);
// console.log(token)
const Task = () => {
    const [inputs, setInputs] = useState({task_title: "", task_desc: ""});
    const [Array, setArray] = useState<any[]>([]);
   
    const show = () => {
        document.getElementById("textarea")!.style.display = "block";
    }
    const change = (e: any) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    }
    const submit = async() => {
        if(!inputs.task_title || !inputs.task_desc){
            toast.error('Please fill all the fields');
            return;
        }
        else{
            if(token){
                await axios.post(`https://task-management-backend-xz9k.onrender.com/api/tasks/add/${id}`,{...inputs},{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // .then((res) => { console.log(res.data);})
                // .catch((err) => { console.log(err);});
                setInputs({task_title: "", task_desc: ""});
                toast.success('Task Added Successfully');
                
            }
            else{
                setArray([...Array, inputs]);
                setInputs({task_title: "", task_desc: ""});
                toast.error('Task Failed to Add! Please SignUp');
            }
        }
    }
    const del = async(id:any) => {
        // console.log(id);
        // Array.splice(id, 1);
        // setArray([...Array]);
       if(token){
            await axios.delete(`https://task-management-backend-xz9k.onrender.com/api/tasks/delete/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // .then((res) => { console.log(res.data);})
            // .catch((err) => { console.log(err);});
            toast.success('Your Task Deleted Successfully');
        }
        else{
            toast.error('Task Failed to Delete! Please Sign In');
        }           
    }
    const dis = (value:any) => {
        document.getElementById("todo-update")!.style.display = value;
    }
    const update = (value:any) => {
        // console.log(value);
        toUpdateArray = Array[value];
        
    }
     useEffect(() => {
        if(token){
            const fetchtask = async() => {
                await axios.get(`https://task-management-backend-xz9k.onrender.com/api/users/tasks/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((res) => { 
                // console.log(res);
                setArray([...res.data]);})
                // .catch((err) => { console.log(err);});
            }
            fetchtask();
        }
        else{
            toast.error('Task Failed to Fetch! Please Sign In');
        }
    },[submit])
  return (
    <>
    <div className='todo'>
        <ToastContainer/>
        <div className='todo-main container d-flex flex-column justify-content-center align-items-center my-4 flex-column'>
            <div className='d-flex flex-column todo-inputs-div w-50 p-3'>
                <input type="text" placeholder='Title' name='task_title' className='my-2 p-2 todo-inputs' 
                value={inputs.task_title}
                onClick={show}
                onChange={change}/>
                <textarea id="textarea" placeholder='Description' name='task_desc' className='my-2 p-2 todo-inputs'
                value={inputs.task_desc}
                onChange={change}/>    
            </div>  
            <div className='my-3 w-50 d-flex justify-content-end'>
                <button className='home-btn px-2 py-1'onClick={submit}>Add</button>
            </div>
        </div>
        <div className='todo-body'>
            <div className="container-fluid">
                <div className='row'> 
                    {Array && Array.map((item:any, index:any) => (
                        <div key={index} className="col-lg-3 col-11 mx-lg-5 mx-3 my-2">
                            <Todocards title={item.task_title} desc={item.task_desc} id={item._id} delid={del} display={dis} updateId={index} toBeUpdate={update}/>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    </div>
    <div className='todo-update' id="todo-update">
        <div className="container update">
            <Update display={dis} update={toUpdateArray} />
        </div>
    </div>
    </>
    
  )
}

export default Task
