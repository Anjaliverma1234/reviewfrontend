import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected_route = (props) => {
  const {Component} =props;
  const navigate=useNavigate();

  useEffect(()=>{
    let  user =localStorage.getItem("user");
    if(!user){
      navigate("/")
    }
  });
  return (
    <>
     <Component/> 
    </>
  )
}

export default Protected_route
