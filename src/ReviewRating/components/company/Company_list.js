import React from 'react'
import './Company_list.css'
import review from  './../../assets/Group 1.png'
import profile from './../../assets/Ellipse 6.png'
import gf from './../../assets/Group 11635.png'
import ct from './../../assets/ct.png'
import info from './../../assets/info.jpg'
import pt from './../../assets/pt.jpg'
import sort from './../../assets/Group 11647.png'
//import 'https://kit.fontawesome.com/c4b613c9c1.js'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { getCompanies } from '../../features/company/companySlice'
import Navbar_new from '../../navbar/Navbar_new'


const Company_list = () => {
     const companies=useSelector((state)=>state.company);
     const{cmpList_msg,company_data,error,loading,count}=companies;
     
     const navigate=useNavigate();
     const dispatch=useDispatch();

     useEffect(()=>{
      dispatch(getCompanies());
     },[]);
  return (
    <div>
      <div className='company'>
      <Navbar_new/>
         
         <nav className='top1'>
            
             
             <button id="btn2"><Link style={{textDecoration:"none"}} to='/createcompany'>Add Company</Link></button>
             
             
             
         </nav>
         <div className='company1'>
        
            <div className='company1-a'>
               
                {company_data &&
           company_data.map(
            ({_id,company_logo,companyName,location,city,founded})=>(
               <Link className='Company_link'  style={{textDecoration:"none"}} to={`/companydetail/${_id}`}>
                <div className='company1-box'>

                  <img src={`http://localhost:9000${company_logo}`}/>
                 <div className='text'>
                    <p>Founded:{founded}</p>
                    <h3>{companyName}</h3>
                    <p>{city} {location} </p>
                    <p>4.5 ⭐⭐⭐⭐⭐ 45 Reviwes</p>
                 </div>
                  </div>
               </Link>
            )
           )
         }
                 
               
            </div>
         </div>
      </div>
    </div>
  )
}

export default Company_list
