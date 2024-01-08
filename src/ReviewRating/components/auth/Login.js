import React from 'react'
import './Login.css'
import img from  './../../assets/reviewimg.png'
//import star from './../../assets/Frame 6.png'
import {Link} from 'react-router-dom'
import { Field, Formik,Form,ErrorMessage} from 'formik'
import *  as yup from "yup"
import { useNavigate } from 'react-router-dom'
import {clearState,SignInUser} from '../../features/auth/authSlice'
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'

const Login = () => {
  let navigate =useNavigate();

 const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message} = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate('/')
      },1000);
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate('/companyList')
      },1000);
    }
  }, [error, message]);

  
  const defaultValue={
    email:"",
    password:"",
  };
  const validationSchema=yup.object().shape({
    email:yup.string().required().email("Please enter your email"),
    password:yup.string().required("Please enter your password"),
  })

  const handleSubmit=async(values)=>{
    //console.log("values",values)
    dispatch(SignInUser(values));
  }
  return (
    
    <div>
    <ToastContainer/>
    <Formik
    initialValues={defaultValue}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
      <Form className='login'>

        <div className='login1'>
            <div className='login1-left'>
              <h1>Welcome</h1>
              <h3>Lorem ipsum dolor sit amet, consectetur <br></br>adipiscing elit.</h3>
              <img src={img} id='Rimage'/>
            </div>
            <div className='login1-right'>
                <h1>Login✪</h1>
                <p>Hello! Please enter your details for login.</p>
                <Field type='email' placeholder='Email' name='email'/><br></br>
                <span className='danger'><ErrorMessage name='email'></ErrorMessage></span>
                <Field type='password' placeholder='Password' name="password"/><br></br>
                <span className='danger'><ErrorMessage name='password'></ErrorMessage></span>
                <h5><Link to="/Forget">Forget Password?</Link></h5>
                <button type='submit'  id="loginbtn">Login</button>
                <p>_____________________________________________________</p>
                <p>I don’t have an account on Review & Rate</p>
                <h3><Link to='/Signup'>Register Now</Link></h3>
                
            </div>
        </div>
      </Form>
      </Formik>
    </div>
  )
}

export default Login
