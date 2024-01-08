import React, { useEffect } from 'react'
import './ForgetPassword.css'
import { Field, Formik,Form,ErrorMessage} from 'formik'
import *  as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { forgetPassword } from '../../features/auth/authSlice'
const ForgetPassword = () => {

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const forgetData=useSelector((state)=>state.user);
  const{error,forget_message}=forgetData;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      
    }
    if (forget_message) {
      toast.success(forget_message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        navigate('/')
      },1000);
    }
  }, [error, forget_message]);
  const defaultValue={
   email:"",
  }
  const validationSchema=yup.object().shape({
  email:yup.string().required().email("Please enter your email")
  })

  const handleSubmit=async(values)=>{
      //console.log("Values",values);
      dispatch(forgetPassword(values));
  }
  return (
    <>
    <ToastContainer/>
    <Formik
    initialValues={defaultValue}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
      <Form className='password'>
        <div className='password1'>
            <h1>Reset Password</h1>
            <Field type='email' placeholder='✉-Enter Email' name="email"/><br></br>
            <span className='danger'><ErrorMessage name='email'></ErrorMessage></span><br></br><br></br>
            <button type='submit' id="Resetbtn">Reset</button>
        </div>
      </Form>
      </Formik>
    </>
  )
}

export default ForgetPassword