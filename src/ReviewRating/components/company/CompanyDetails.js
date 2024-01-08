import React, { useEffect } from 'react'
import './CompanyDetails.css'
import review from  './../../assets/Group 1.png'
import profile from './../../assets/Ellipse 6.png'
import gf from './../../assets/Group 11635.png'
import Logo from './../../assets/Ellipse 5.png'
import Logo1 from './../../assets/Ellipse 5 (1).png'
import Logo3 from './../../assets/Ellipse 5 (2).png'
import { Link, useParams } from 'react-router-dom'
import Navbar_new from '../../navbar/Navbar_new'
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from '../../features/company/companySlice'

const CompanyDetails = () => {


  const param=useParams();
  const { id }=param;

  const companyData=useSelector((state)=>state.company);
  const{company_details,compDetail_msg}=companyData;
  const{companyDetails,comments}=company_details;
  console.log(companyDetails);
  const{companyName,company_logo,city,founded,location}={
    ...companyDetails,
  }

console.log('comments are-',comments);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCompanyDetails(id));
  },[]);
  return (
    <>
    <div className='review'>
      <Navbar_new/>
        {/* <nav className='top'>
            <img src={review}/>
       
            <nav className='search'>
             <input type="search" placeholder='Search' style={{width:"400px",height:"25px"}}/><i style={{border: "1px solid black", color:"purple"}}
             class="fa-solid fa-magnifying-glass"/>
            </nav>
             <img src={profile} id='pro'/>
         </nav> */}
      <div className='review1'>
        <div className='review1-a'>
            <div className='review1-box'>
                    <img src={`http://localhost:9000${company_logo}`}/>
                <div className='text'>
                    <p>Founded:{founded}</p>
                    <h3>{companyName}</h3>
                    <p>{city} {location}</p>
                    <p>4.5 ⭐⭐⭐⭐⭐ 45 Reviwes</p>
                </div>
                    <button><Link  style={{textDecoration:"none"}} to={`/addcompanyreview/${id}`}>Add Review</Link></button>
              </div>
              
              {
              comments &&
              comments.map((value)=>(
                <div className='review1-box'>
                <img src={`http://localhost:9000${value.user_id.profilepic}`} id='logo'/>
                <div className='text1'>
                 <h4>{value.user_id.name}<span style={{marginLeft:"720px"}}>{value.rating}</span></h4>
                 <p id="p">{value.createdAt.slice(0,10)}</p>
                 <p>{value.review}</p>
                 </div>
            </div>
              ))}
              
          </div>

              
            
            
             
             
            
            <p id="all">See All</p>
        </div>
        
    </div>
    </>
  )
}

export default CompanyDetails
