// for student

import React, {useEffect, useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from "axios"
import validator from 'validator'
import OAuth from './OAuth.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState('') 
    const dispatch = useDispatch()
    

    // creating user connecting front end and backend
  const [registrationid,setregistrationid]=useState('')
  const [email,setemail]=useState('')
  const [fullname,setfullname]=useState('')
  const [password,setpassword]=useState('')
  const [semester,setsemester]=useState('');
  const [branch,setbranch]=useState('')
  const[response,setresponse]=useState('')
  const createaccout= async(e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    const formData = new FormData();
    formData.append('registrationId', registrationid);
    formData.append('email', email);
    formData.append('fullname', fullname);
    formData.append('password', password);
    formData.append('semester', semester===''?1:semester);
    formData.append('branch', branch===''?"Computer Engineering":branch);
    formData.append('userrole', 2);

    // // Append selected files to FormData
    const avatarFile = document.getElementById('avatar').files[0];
    formData.append('avatar', avatarFile);

    console.log(formData)
    // Perform your axios POST request with FormData
    console.log("going to hit signup")
    console.log("goining to hit sign up")
    await axios.post('/api/v1/users/register', formData)
      .then(function (response) {
        console.log(response);
        setresponse(response?.data?.message || response?.data?.errors[0])
        setregistrationid('')
        setemail('')
        setsemester('')
        setbranch('')
        setfullname('')
        setpassword('')

        setError('')
      })
      .catch(function (error) {
        console.log("error",error?.response?.data?.errors[0]);
        if(error?.response?.data?.errors[0]){
          setError(error?.response?.data?.errors[0])};
        console.log("error=",error);
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
  const handleSuccessClose = () => {
    setresponse('')
  };

  return (
    <>
     {response &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{response}</p>
             </div>
             <div data-dismissible-target="alert" data-ripple-dark="true" className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20">
               <div role="button" className="w-max rounded-lg p-1" onClick={handleSuccessClose}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </div>
             </div>
           </div>


       }

<OAuth/>
    </>
  )
}

export default Signup
