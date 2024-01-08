import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './ReviewRating/components/auth/Login';
import SignUp from './ReviewRating/components/auth/Signup';
import Page404 from './ReviewRating/components/Page404';
import ForgetPassword from './ReviewRating/components/auth/ForgetPassword';
import CreateCompany from './ReviewRating/components/company/CreateCompany';
import Company_list from './ReviewRating/components/company/Company_list';
import CompanyDetails from './ReviewRating/components/company/CompanyDetails';
import AddNewReview from './ReviewRating/components/company/AddNewReview';
import Protected_route from './ReviewRating/components/protected/Protected_route';
import Navbar_new from './ReviewRating/navbar/Navbar_new';
import ResetPassword from './ReviewRating/components/auth/ResetPassword';

function App() {
  return (
    <>
       
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Signup' element={<SignUp/>}></Route>
        <Route path='/Navbar/' element={<Protected_route Component={Navbar_new}/>}></Route> 
        <Route path='/createcompany/' element={<Protected_route Component={CreateCompany}/>}></Route>
        <Route path='/companyList/' element={<Protected_route Component={Company_list}/>}></Route> 
        <Route path='/Forget' element={<ForgetPassword/>} ></Route>
        <Route path='/*' element={<Page404.js/>}></Route> 
         <Route path='/companydetail/:id' element={<CompanyDetails/>}></Route>
        <Route path='/addcompanyreview/:id' element={<AddNewReview/>}></Route> 
        {/* <Route path='/user/reset-password/:id/:token' element={<ResetPassword/>}></Route> */}
        <Route path='/reset' element={<ResetPassword/>}></Route>
        {/* <Route path='/companydetail' element={<CompanyDetails/>}></Route>
        <Route path='/addcompanyreview/' element={<AddNewReview/>}></Route> */}
        
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
