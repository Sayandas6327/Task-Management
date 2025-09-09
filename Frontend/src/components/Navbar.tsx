import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBookOpenReader, FaFacebookMessenger } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/store'


const Navbar = () => {
  const isLoggedIn = useSelector((state: { isLoggedIn: any  }) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(authActions.logout());
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="/"><b><FaBookOpenReader/>&nbsp;ToDo</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-1">
          <Link className="nav-link active text-nav" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link active text-nav" aria-current="page" to="/todo">Todo</Link>
        </li>
        {!isLoggedIn && <>
        <div className=' my-2 my-lg-0'>
        <li className="nav-item mx-1">
          <Link className="nav-link active btn-nav" aria-current="page" to="/signup">SignUp</Link>
        </li>
        </div>
        <div className=''>
        <li className="nav-item mx-1">
          <Link className="nav-link active btn-nav" aria-current="page" to="/signin">SignIn</Link>
        </li>
        </div>
        </>}
        {isLoggedIn && 
        <div className=''>
        <li className="nav-item mx-1" onClick={logout}>
          <Link className="nav-link active btn-nav" aria-current="page" to="/">LogOut</Link>
        </li>
        </div>}
        <li className="nav-item mx-1">
          <Link className="nav-link active" aria-current="page" to="/chat">
            <FaFacebookMessenger className='chaticon' />
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}

export default Navbar
