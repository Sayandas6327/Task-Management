
import './Footer.css'
import { FaGithub } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer'>
      <div className='container-fluid d-flex justify-content-center'>
        <h4>Todo</h4>
      </div>
      <div className='container-fluid d-flex justify-content-center'>
        &nbsp;<p className='m-0'>&copy; Sayan Das</p>
      </div>
      <div className='container-fluid d-flex justify-content-center'>
        <a href="https://www.github.com/Sayandas6327"><FaGithub className='footer-icons'/></a>
      
        <a href="https://www.instagram.com/sayandas6327"><FaInstagram className='footer-icons'/></a>
      </div>
    </div>
  )
}

export default Footer
