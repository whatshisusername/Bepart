import { Button } from 'flowbite-react'
import React,{useState} from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux'

import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { login as authLogin } from '../store/authSlice'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";

const OAuth = () => {

    //authentication coming from firebase
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState('')     

    // creating user connecting front end and backend
  const [registrationid,setregistrationid]=useState('')
  const [email,setemail]=useState('')
  const [fullname,setfullname]=useState('')
  const [password,setpassword]=useState('')
  const [semester,setsemester]=useState('');
  const [branch,setbranch]=useState('')
  const[response,setresponse]=useState('')


    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        //will popup user when signin to choose account
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            await axios.post('/api/v1/users/googlesignup', {
                email:resultsFromGoogle.user.email,
                fullname:resultsFromGoogle.user.displayName,
                avatar:resultsFromGoogle.user.photoURL
            })
      .then(function (response) {
        console.log(response);
        setresponse(response?.data?.message || response?.data?.errors[0])
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
        console.log("error",error?.response?.data?.errors[0]);
        if(error?.response?.data?.errors[0]){
          setError(error?.response?.data?.errors[0])};
        console.log("error=",error);
        setresponse('')
      });

        } catch (error) {
            console.error(error);
        }
    };

    
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

{error && <p>{error}</p>}
{/* 
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google
    </Button> */}

    <div class="bg-gray-100 flex justify-center items-center h-auto mt-0 ml-4 mr-4">
    
<div class="w-1/2 h-screen hidden lg:block mt-0">
  <img src="https://assets-global.website-files.com/62c6b224be780a3bf588c484/62e7cdd0005b5f0282b676a4_hb-cleanup10-0604_-2.jpeg" alt="Placeholder Image" class="object-fit w-full h-full"/>
</div>

<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
  <div className="flex items-center justify-center min-h-screen mt-0 ">
      <button onClick={handleGoogleClick} className="flex items-center  bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">
          <title>Google-color</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
              <g id="Google" transform="translate(401.000000, 860.000000)">
                <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
                <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
                <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path>
                <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
              </g>
            </g>
          </g>
        </svg>
        <span>Signin with Google</span>
      </button>
    </div>

  
</div>
</div>
<div class="mx-auto bg-gray-700 w-fit h-fit flex items-center justify-center px-8">
  <div class="flex flex-col w-fit bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
    <div class="w-full h-64 bg-top bg-cover rounded-t" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-M_dts0cZvt5WPfajg6zm325ejnSjGTzbw&s')` }}></div>
    <div class="flex flex-col w-full md:flex-row">
        <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
            <div class="md:text-3xl">Jan</div>
            <div class="md:text-6xl">13</div>
            <div class="md:text-xl">7 pm</div>
        </div>
        <div class="p-4 font-normal text-gray-800 md:w-3/4">
            <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">2020 National Championship</h1>
            <p class="leading-normal">The College Football Playoff (CFP) determines the national champion of the top division of college football. The format fits within the academic calendar and preserves the sport’s unique and compelling regular season.</p>
            <div class="flex flex-row items-center mt-4 text-gray-700">
                <div class="w-1/2">
                    Mercedes-Benz Superdome
                </div>
                <div class="w-1/2 flex justify-end">
                    <img src="https://collegefootballplayoff.com/images/section_logo.png" alt="" class="w-8"/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    </>
  )
}

export default OAuth