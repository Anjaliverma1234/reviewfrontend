import React, { useState } from 'react'
import './Signup.css'
import img from './../../assets/reviewimg.png'
import {Link} from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as yup from 'yup'
import { useSelector,useDispatch } from 'react-redux'
import { clearState, signUpUser } from '../../features/auth/authSlice'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'


const Signup = () => {

  const[pic,setPic]=useState("");
 
  const initialState={
    name:'',
    email:'',
    password:'',
    mobile:'',
    city:'',
    state:'',
  }
  const dispatch = useDispatch();

  const data = useSelector((state)=>state.user);
  let {error,message,loading} = data;
  console.log(data)

  useEffect(()=>{
    if(error){
      toast.error(error, {position: toast.POSITION.TOP_CENTER});
       setTimeout(()=>{
        dispatch(clearState());
      },500)
    }
    if(message){
      toast.success(message, {position: toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
      },500)
    }
  },[error,message]);

  const validationSchema=yup.object().shape({
    name : yup.string().required('please enter the name'),
    email : yup.string().required().email('please enter the email'),
    password:yup.string().required("please enter password").min(8,"password must be a 8 char"),
    mobile : yup.string().required('please enter the mobile number'),
    city : yup.string().required('please enter the city'),
    state : yup.string().required('please enter the state')
  })

  const handleSubmit=(values)=>{
    let obj = {
      profilepic : pic,
      ...values,
    }
    dispatch(signUpUser(obj))
  }

  const picSelect=(e)=>{
    setPic(e.target.files[0]);
  }
  return (
    <>
    <ToastContainer />
    <div>
      <div className='SignUp'>
     <div className='SignUp1'>
            <div className='SignUp1-left'>
      <h1>Welcome</h1>
      <h3>Lorem ipsum dolor sit amet, consectetur <br></br>adipiscing elit.</h3>
      <img src={img} id='Rimage'/>
            </div>
            <div className='SignUp1-right'>
              <h1>SignUp✪</h1>
              <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Form>
              <Field type='text' placeholder='👤-Full Name' name='name' /><br></br>
              <span className='danger'><ErrorMessage name='name'></ErrorMessage></span>
              <Field type='email' placeholder='✉-Email Id' name='email'/><br></br>
              <span className='danger'><ErrorMessage name='email'></ErrorMessage></span>
              <Field type='password' placeholder='Password' name='password'/><br></br>
              <span className='danger'><ErrorMessage name='password'></ErrorMessage></span>
              <Field type='number' placeholder='✆-Phone Number' name='mobile'/><br></br>
              <span className='danger'><ErrorMessage name='mobile'></ErrorMessage></span>
              <Field type='text' placeholder='🏛-City' name='city'/><br></br>
              <span className='danger'><ErrorMessage name='city'></ErrorMessage></span>
              <Field type='text' placeholder='🏙-State' name='state'/><br></br>
              <span className='danger'><ErrorMessage name='state'></ErrorMessage></span>
              <input type='file' onChange={picSelect}/><br></br>
              <button type='submit' id="signbtn">SignUp</button>
              </Form>
              </Formik>
              <p>_____________________________________________________</p>
              <p>I already have an account  <span style={{fontWeight:'bold',textDecoration:'underline'}}><Link to='/'>Login</Link></span></p>
            </div>
            </div>
      </div>
              
     
    </div>
    </>
  )
}

export default Signup
