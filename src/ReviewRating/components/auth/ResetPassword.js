import React, { useEffect } from 'react'
import './ResetPassword.css'
import { Field, Formik,Form,ErrorMessage} from 'formik'
import *  as yup from "yup"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from '../../features/auth/authSlice'
const ResetPassword = () => {
    
    const param=useParams();
    const {token,id}=param;

    const dispatch=useDispatch();

    const navigate=useNavigate();

    const resetstate=useSelector((state)=>state.user);
    //console.log(resetstate);

    const{error,message}=resetstate;
    //console.log(error,message);

   useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
     
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        navigate('/')
      },1000);
    }
  }, [error, message]);
  const defaultValue={
    password:"",
    cpassword:"",
  }

 const validationSchema=yup.object().shape({
  password:yup.string().required("Please enter your password"),
  cpassword:yup.string().required("please enter confirm password")
  })

  const handleSubmit=async(values)=>{
    //console.log("values",values);
     let obj={
      ...values,
      id:id,
      token:token,
     };
     dispatch(resetPassword(obj));
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
            <Field type='password' placeholder='Password' name='password'/><br></br>
            <span className='danger'><ErrorMessage name='password'></ErrorMessage></span>
            <Field type='password' placeholder='ConfirmPassword' name='cpassword'/><br></br>
            <span className='danger'><ErrorMessage name='cpassword'></ErrorMessage></span><br></br>
            <button type='submit'>Reset</button>
        </div>
      </Form>
      </Formik>
    </>
  )
}

export default ResetPassword
