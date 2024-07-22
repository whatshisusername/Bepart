import React, {useState} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { login as authLogin } from '../store/authSlice'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
import OAuth from './OAuth'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // this we using from our react hook form
   
    const [error, setError] = useState("")
    const [registrationid,setregistrationid]=useState('')
    const [password,setpassword]=useState('')
    const[response,setresponse]=useState('')

    const loginaccout= async(e)=>{
        e.preventDefault(); // Prevent default form submission
    
        // Create FormData object to send form data including files
        const formData = new FormData();
        formData.append('registrationId', registrationid);
       
        formData.append('password', password);
        // Perform your axios POST request with FormData
        await axios.post('/api/v1/users/login',{
            "registrationId":registrationid,
            "password":password
        })
          .then(function (response) {
            console.log(response);
            setresponse(response?.data?.message|| response?.data?.errors[0]);
            dispatch(authLogin(response?.data?.data?.user));
            secureLocalStorage.setItem("ui", response?.data?.data?.user);
            console.log('ui=',secureLocalStorage.getItem("ui"));
            // window.localStorage.setItem("loggedIn",true);
            // window.localStorage.setItem('userinfo',JSON.stringify(response?.data?.data?.user));
            // console.log("userinfo local=",JSON.parse(window.localStorage.getItem('userinfo')));
            // dispatch(authLogin(JSON.parse(window.localStorage.getItem('userinfo'))));
            navigate("/")
            setError('')
          })
          .catch(function (error) {
            // console.log(error.response.data.errors[0]);
            console.log("error=",error);
            if(error?.response?.data?.errors[0]){
            setError(error?.response?.data?.errors[0])};
            setresponse('')
          });
      }
      const togglepassword=()=>{
        var passwordField = document.getElementById("passwordfield");
        var eyeIcon = document.getElementById("eyeIcon");
        var eyeCircle = document.getElementById("eyeCircle");
        var eyeLine = document.getElementById("eyeLine");
    
        if (passwordField.type === "password") {
          passwordField.type = "text";
          eyeIcon.setAttribute("class", "hidden");
          eyeCircle.setAttribute("class", "block");
          eyeLine.setAttribute("class", "hidden");
        } else {
          passwordField.type = "password";
          eyeIcon.setAttribute("class", "block");
          eyeCircle.setAttribute("class", "hidden");
          eyeLine.setAttribute("class", "block");
        }
      
      }
      

  return (
    <>

    <OAuth/>
    
    </>
  )
}

export default Login