import React from 'react'
import './Navbar_new.css'
import review from  './../assets/Group 1.png'
import profile from './../assets/Ellipse 6.png'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Navbar_new = () => {

  const navigate=useNavigate();
  const res=localStorage.getItem("user");
  const user=JSON.parse(res);
 const handleLogout=()=>{
  localStorage.clear();
 }

  return (
    <div>
      <nav className='top'>
            <img src={review}/>
            {user?.name ?(
             <h3>Welcome:{user?.name}</h3>
            ):(
           navigate('/')
          )}
          
         
             
         {/* <img src={`http:/localhost:9000${user?.profilepic}`} id='pro'/> */}
         <button><Link  style={{textDecoration:"none"}} to="/" onClick={handleLogout}>Logout</Link></button>
         </nav>
    </div>
  )
}

export default Navbar_new
