import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState = {
    cmpCreate_msg :"",
    cmpList_msg : "",
    cmpDetail_msg : "",
    company_data : "",
    company_details : "",
    loading : false,
    error : "",
}

export const getCompanyDetails=createAsyncThunk(
    "company/getCompanyDetails",
    async (id,thunkAPI)=>{
        //console.log("**",id)
        const resResult=await fetch(
            `http://localhost:9000/company/details/${id}`,
            {
                method:"get",
                headers:{
                    Accept:"application/json",
                    "context-type":"application/json",
                },
            },
        );
        let data= await resResult.json();
        //console.log("Data",data);
        if(data.status){
            //console.log("IF",data);
            return data;
        }else{
            return thunkAPI.rejectWithValue(data);
        }
    }
)
  
export const getCompanies=createAsyncThunk(
    "company/getCompanies",
    async(thunkAPI)=>{
        //console.log("GET Companies slice");
        const resResult=await fetch("http://localhost:9000/company/list",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
            },
        });
        let data= await resResult.json();
        console.log("Data",data);
        if(data.success){
            //console.log("Success",data);
            return data;
        }else{
            return thunkAPI.rejectWithValues(data);
        }

    }
);


export const createCompany = createAsyncThunk(
    'company/create',
    async (body,thunkAPI) =>{
        const res = await axios.post("http://localhost:9000/company/create",body,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
        });
        return res;
    }
);


const companySlice = createSlice({
    name : "company",
    initialState,
    reducers:{
        clearState : (state) =>{
            state.cmpCreate_msg = "";
            state.error = "";
        },
    },

    extraReducers : {
        //For Create Company
        [createCompany.pending] : (state,{payload}) =>{
            console.log("Pending.....");
            state.loading = true;
            state.error = "";
            state.cmpCreate_msg = ""
        },
        [createCompany.fulfilled] : (state,{payload}) =>{
            state.loading = false;
            console.log("Successful.....",payload);
            state.cmpCreate_msg = payload.data.message;
        },
        [createCompany.rejected] : (state,{payload}) =>{
            console.log("This is Error.....",payload);
            console.log("Request Rejected")
            state.loading = false;
            state.error = payload.error;
        },

        //For Getting All Companies
        [getCompanies.pending]:(state,{payload})=>{
            state.loading=true;
        },
        [getCompanies.fulfilled]:(state,{payload})=>{
            state.loading=false;
            if(payload.error){
                state.error=payload.error;
            }else{
                state.cmpList_msg=payload.message;
                state.company_data=payload.companies;
            }
        },
        [getCompanies.rejected]:(state,{payload})=>{
            state.loading=false;
            state.error=payload.error
        },

        //For Company Details
        [getCompanyDetails.pending]:(state,{payload})=>{
            state.loading=true;
            state.error="";
            state.cmpDetail_msg="";
            state.company_details="";
        },
        [getCompanyDetails.fulfilled]:(state,{payload})=>{
            state.loading=false;
            if(payload.error){
                state.error=payload.error;
                state.cmpCreate_msg="";
                state.company_details="";
            } else{
                state.cmpDetail_msg=payload.message;
                state.company_details=payload.compDetails;
                state.error="";
            }
        },
        [getCompanyDetails.rejected]:(state,{payload})=>{
            state.loading=false;
            state.error=payload.error;
            state.cmpDetail_msg="";
            state.company_details="";
        }
    },
});

export default companySlice.reducer;
export const {clearState} = companySlice.actions;

