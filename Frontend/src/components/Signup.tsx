
import { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({name: "", phone: "", email: "", pass1: ""});
    const change = (e:any) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    }
    const submit = async (e:any) => {
        e.preventDefault();
        await axios.post("https://task-management-backend-xz9k.onrender.com/api/users/signup", inputs)
        .then((res) => { console.log(res.data);
            if(res.data.message==="Sign Up Successfull"){
                alert(res.data.message);
                // toast.success(res.data.message);
                setInputs({name: "", phone: "", email: "", pass1: ""});
                // window.location.href = "/signin";
                history("/signin");
            }
            else{
                alert(res.data.message);
                // toast.error(res.data.message);
            }
        })
        .catch((err) => { console.log(err);
        toast.error('SignUp Failed! User already exists or please fill all the fields correctly');
        })
    }
  return (
    <>
      <div className='signup'>
        <ToastContainer/>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 d-flex justify-content-center align-items-center column">
                    <div className='d-flex flex-column gap-3 w-100 p-5'>
                        Name
                        <input className='p-2 my-3 input-signup' 
                            type="text" 
                            name="name"
                            placeholder='Enter your name'
                            onChange={change}
                            value={inputs.name}/>
                        Phone Number
                        <input className='p-2 my-3 input-signup' 
                            type="phone" 
                            name="phone"
                            placeholder='Enter your phone number'
                            onChange={change}
                            value={inputs.phone}/>
                        Email
                        <input className='p-2 my-3 input-signup' 
                            type="email" 
                            name="email"
                            placeholder='Enter your email'
                            onChange={change}
                            value={inputs.email}/>
                        Password
                        <input className='p-2 my-lg-0 my-3 mx-lg-0 mx-3 input-signup' 
                            type="password" 
                            name="pass1"
                            placeholder='Enter your password'
                            onChange={change}
                            value={inputs.pass1}/>
                        <button className='p-2 btn-signup' onClick={submit}>Sign Up</button>
                    </div>
                </div>
                <div className="col-lg-4 col-left d-lg-flex justify-content-center align-items-center column d-none ">
                    <h1 className='text-center sign-up-heading'>
                        Sign <br/>Up
                    </h1>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Signup
