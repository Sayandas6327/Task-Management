
import './Signup.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/store'
const Signin = () => {
    const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({ email: '', pass1: '' });
  const change = (e:any) => {
          const {name, value} = e.target;
          setInputs({...Inputs, [name]: value});
      }
      const submit = async (e:any) => {
          e.preventDefault();
          axios.post("https://task-management-backend-xz9k.onrender.com/api/users/signin", Inputs)
          .then((res) => { 
            //   console.log(res.data);
            sessionStorage.setItem("token", res.data.token);
                dispatch(authActions.login(res.data.token));
            sessionStorage.setItem("_Id", res.data.user._id);
                dispatch(authActions.login(res.data.user._id));
              if(res.data.message==="Sign In Successfull"){
                  alert(res.data.message);
                //   toast.success(res.data.message);
                  setInputs({email: "", pass1: ""});
                  // window.location.href = "/todo";
                  history("/todo");
                  location.reload();
              }
              else{
                  alert(res.data.message);
                  // toast.error(res.data.message);
              }
          })
          .catch((err) => { 
            console.log(err);
          toast.error('Signin Failed! Please fill all the fields correctly');
          })
      }
  return (
    <>
      <div className='signup'>
        <ToastContainer/>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-left d-none d-lg-flex justify-content-center align-items-center column">
                    <h1 className='text-center sign-up-heading'>
                        Sign <br/>In
                    </h1>
                </div>
                <div className="col-lg-8 d-flex justify-content-center align-items-center column">
                    <div className='d-flex flex-column gap-3 w-100 p-3'>
                        Email
                        <input className='p-2 my-3 input-signup' 
                            type="email" 
                            name="email"
                            placeholder='Enter your email'
                            onChange={change}
                            value={Inputs.email}/>
                        Password
                        <input className='p-2 my-3 input-signup' 
                            type="password" 
                            name="pass1"
                            placeholder='Enter your password'
                            onChange={change}
                            value={Inputs.pass1}/>
                        <button className='p-2 btn-signup' onClick={submit}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Signin
