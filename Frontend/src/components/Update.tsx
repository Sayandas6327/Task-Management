import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
interface UpdateProps{
  display:any;
  update:any
}
const Update = ({display, update}:UpdateProps) => {
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    setInputs({task_title: update.task_title, task_desc: update.task_desc});
  },[update])
    const [inputs, setInputs] = useState({task_title: "", task_desc: ""});
    const change = (e:any) => {
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
          await axios.put(`http://localhost:3000/api/tasks/update/${update._id}`,{...inputs},{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          // .then((res) => { console.log(res.data);})
          // .catch((err) => { console.log(err);});
          setInputs({task_title: "", task_desc: ""});
          toast.success('Task Updated Successfully');
          display("none");
        }
        else{
          toast.error('Task Failed to Update! Please SignUp');
        }
      }
    }
  return (
    <>
      <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
        <h3>Update Your Task</h3>
        <input type='text' className='todo-inputs my-4 w-100 p-3' name='task_title' value={inputs.task_title} onChange={change}/>
        <textarea className='todo-inputs w-100 p-3' name='task_desc' value={inputs.task_desc} onChange={change}/>
        <div>
            <button className='btn btn-dark my-4 mx-3' onClick={submit}>Update</button>
            <button className='btn btn-danger my-4 mx-3' onClick={()=>display("none")}>Close</button>
        </div>
      </div>
    </>
  )
}

export default Update
