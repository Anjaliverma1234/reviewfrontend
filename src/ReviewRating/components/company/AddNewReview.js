import React, { useEffect } from 'react'
import './AddNewReview.css'
import { Field, Formik,Form,ErrorMessage} from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { companyReview } from '../../features/review/reviewSlice'
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { clearState } from '../../features/auth/authSlice'

const AddNewReview = () => {

  const navigate=useNavigate();

  const param=useParams();
  const {id}=param;

  
  const dispatch=useDispatch();

  const review=useSelector((state)=>state.review);
  //console.log("review",review);
  const{review_msg,loading,error}=review;

  let user=JSON.parse(localStorage.getItem("user"));

   useEffect(()=>{
    if(review_msg){
      toast.success(review_msg,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate(`/companydetail/${id}`);
      },3000);
    }
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER});
    }
   },[review_msg,error]);

  const defaultValue={
   subject:'',
   review:'',
   rating:'',
  }
 
  const validationSchema=yup.object().shape({
     subject:yup.string().required("Please enter subject"),
     review:yup.string().required("please enter review"),
     rating:yup.string().required("please enter rating"),
  })

  const handleSubmit= async(values)=>{
   console.log("values", values);

   let obj={
    ...values,
    company_id:id,
    user_id:user._id,
   };
   
   dispatch(companyReview((obj)));
  }

  return (
    <>
        <ToastContainer/>
        <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
      <Form className='addreview'>
        <div className='addreview1'>
        
        <h1>Add Review</h1>
        <Field type='text' placeholder='Enter Subject' name='subject'/><br></br>
        <span className='danger'><ErrorMessage name='subject'></ErrorMessage></span><br></br><br></br>
      
        <Field type='text' placeholder='Enter Your Review' name='review' id="review"/><br></br>
        <span className='danger'><ErrorMessage name='review'></ErrorMessage></span><br></br><br></br>
        
        <Field type="number" placeholder="Rating" name='rating'/><br></br>
        <span className='danger'><ErrorMessage name='rating'></ErrorMessage></span><br></br><br></br>
       
        <button type='submit'>Save</button>
      </div>
      </Form>
      </Formik>
    </>
  )
}

export default AddNewReview
