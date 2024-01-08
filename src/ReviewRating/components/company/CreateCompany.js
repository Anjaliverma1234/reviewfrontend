import React, { useState } from 'react'
import './CreateCompany.css'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Formik,Form,ErrorMessage} from 'formik'
import * as yup from 'yup'
import { clearState,createCompany } from '../../features/company/companySlice';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import  { useEffect }  from "react";

const CreateCompany = () => {
  const[pic,setPic]=useState("")
  const navigate =useNavigate();
 const dispatch = useDispatch();
    const companyData = useSelector((state)=> state.company);
    let { error , cmpCreate_msg, loading } = companyData;

    useEffect(() => {
        if(cmpCreate_msg) {
          toast.success(cmpCreate_msg, { position: toast.POSITION.TOP_CENTER });
          setTimeout(()=>{
        dispatch(clearState());
        navigate('/companyList');
      },3000);
        }
        if(error) {
          toast.error(error, {position: toast.POSITION.TOP_CENTER});
        }
        
      }, [cmpCreate_msg , error]);
  
  const initialState={
      companyName:"",
      location:"",
      city:"",
      founded:"",
  };
  const validationSchema=yup.object().shape({
  companyName:yup.string().required("Please enter name"),
  location:yup.string().required("Please Enter Location"),
  city:yup.string().required("please enter city"),
  founded:yup.string().required("please enter founded")
  });
  const handleSubmit=(values)=>{
      //console.log("values",values)
      const user=JSON.parse(localStorage.getItem("user"));
      let obj={
        ...values,
        company_logo:pic,
        userId: user._id,
      };
      //console.log("this is object",obj);
      dispatch(createCompany(obj));
     }

  function addCompanyPic(e){
     setPic(e.target.files[0]);
  }
  
  return (
    <>
    <ToastContainer/>
     <div className='form'>
        <div className='form1'>
        
            <h1>Add Company</h1>
            <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            
            
            <Form className='input'>
          
            <Field type='text' placeholder='Enter' name='companyName'/>
            <br/>
           <span className='danger'><ErrorMessage name='companyName' ></ErrorMessage>{" "}</span><br/>
            
            <Field type='text' placeholder='Select Location' name='location'/>
            <br/>
            <span className='danger'><ErrorMessage name='location' ></ErrorMessage></span>{" "}<br/>
            
            <Field type='text' placeholder='Select City' name='city'/>
             <br/>
            <span className='danger'><ErrorMessage name='city' ></ErrorMessage>{" "}</span><br/>
          
            <Field type='date' name='founded' />
            <br/>
            <span className='danger'><ErrorMessage name='founded'></ErrorMessage>{" "}</span><br/>
            <input type='file' placeholder='Choose Image' name='company_logo' onChange={addCompanyPic}/><br></br><br></br><br></br>
            <button type="submit">Save</button>
            
            </Form>
            
             
            </Formik>
        </div>
      </div> 
    </>
  )
}

export default CreateCompany
