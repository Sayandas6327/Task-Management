
import {useEffect} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Task from './components/Task'
import ChatBot from './components/Chatbot'
import { useDispatch } from 'react-redux'
import { authActions } from './store/store'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if(token){
    dispatch(authActions.login(token));
    }
  }, []);
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/todo' element={<Task/>}/>
          <Route path='/chat' element={<ChatBot/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App

