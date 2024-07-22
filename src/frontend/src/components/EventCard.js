// this is our small events cards u see on home page

import React, { useEffect, useState } from 'react'
import {Link,Navigate, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

// using database function that is image function
// is this postcard we have a box in that one image and below it heading
function EventCard({events,fullname,avatar}) {
    const [response,setresponse]=useState('')
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
    const [error,seterror]=useState('')
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()
  
  
    
    
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
               <div role="button" className="w-max rounded-lg p-1" >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </div>
             </div>
           </div>


       }


{error &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-red-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Error</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{error}</p>
             </div>
             <div data-dismissible-target="alert" data-ripple-dark="true" className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20">
               <div role="button" className="w-max rounded-lg p-1" >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
               </div>
             </div>
           </div>


       }
{/* <Link to={`/event/${events._id}`}>

<div class="col-span-12 sm:col-span-6 md:col-span-3 mt-0 ml-8 mr-8 " id={events?._id} key={events?._id} >
      <card class="w-60 h-30 flex flex-col">
        <div class="relative">

          <a href="#">
            <img src={events?.thumbnail} class="w-96 h-40" />
          </a>
          

          <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">{ dayNames[(new Date(events?.date)).getDay()]  },{ (new Date(events?.date)).getDate()  } { month[(new Date(events?.date)).getMonth()]  }</p>
        </div>

        <div class="flex flex-row mt-2 gap-2">

        
          <a href="#">
            <img src={avatar} class="rounded-full max-h-10 max-w-10" />
            {fullname}
          </a>

          
          <div clas="flex flex-col">
            <a href="#">
              <p class="text-black-100 text-sm font-semibold">{events?.title}</p>
            </a>
            <a class="text-black-100 text-xs mt-2 hover:text-black-100" href="#">{events?.starttime}-{events?.endtime}</a>
            <p class="text-black-100 text-xs mt-1">
            <svg width="10px" height="10px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
</svg>{events?.location}</p>
          </div>

        </div>
      </card>
    </div>


</Link> */}
<Link to={`/event/${events._id}`}>
<div class="mx-auto  h-fit flex items-center justify-center px-8">
  <div class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
    <div class="w-full h-64 bg-top bg-cover rounded-t"  style={{ backgroundImage: `url(${events?.thumbnail})` }}></div>
    <div class="flex flex-col w-full md:flex-row">
        <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
            <div class="md:text-3xl">{ dayNames[(new Date(events?.date)).getDay()]  }</div>
            <div class="md:text-6xl">{ (new Date(events?.date)).getDate()  } { month[(new Date(events?.date)).getMonth()]  }</div>
            <div class="md:text-xl">{events?.starttime}-{events?.endtime}</div>
        </div>
        <div class="p-4 font-normal text-gray-800 md:w-3/4">
            <h1 class="mb-6 text-4xl font-bold leading-none tracking-tight text-gray-800">{events?.title}</h1>
            <a href="#" className='flex flex-row items-center text-1xl font-semibold leading-none tracking-tight text-gray-800'>
              Hosted By-{fullname}
            <img src={avatar} class="ml-2 rounded-full max-h-10 max-w-10" />
          </a>
            <p class="leading-normal">{events?.description}</p>
            <div class="flex flex-row items-center mt-4 text-gray-700">
                <div class="w-1/2 text-1xl text-blue-600">
                {/* <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
</svg> */}
<img src='https://thumbs.dreamstime.com/b/start-location-pin-as-vector-illustration-231741521.jpg' className='h-20'></img>{events?.startlocation || events?.location}
                </div>
                
                
                
                  {events?.endlocation &&<div class="w-1/2 text-1xl text-blue-600">
                {/* <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#ff0000"/>
</svg> */}
<img src="https://img.freepik.com/premium-vector/finish-flag_592324-15308.jpg" className='h-20'></img>{events?.endlocation}
                </div>}

                
           
                <div className="w-1/2 flex items-center justify-end">
  <div className="flex flex-col items-center">
    <svg width="40px" height="40px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5 8.25C6.05228 8.25 6.5 7.80228 6.5 7.25C6.5 6.69772 6.05228 6.25 5.5 6.25C4.94772 6.25 4.5 6.69772 4.5 7.25C4.5 7.80228 4.94772 8.25 5.5 8.25ZM5.5 10.25C7.15685 10.25 8.5 8.90685 8.5 7.25C8.5 5.59315 7.15685 4.25 5.5 4.25C3.84315 4.25 2.5 5.59315 2.5 7.25C2.5 8.90685 3.84315 10.25 5.5 10.25Z" fill="#000000"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5501 11C4.72165 11 4.05006 11.6716 4.05006 12.5L4.05005 14C4.05005 14.5523 3.60233 15 3.05004 15C2.49776 15 2.05005 14.5523 2.05005 14L2.05006 12.5C2.05007 10.567 3.61709 9 5.5501 9C7.48308 9 9.05007 10.567 9.05007 12.5V13C9.05007 13.5523 8.60236 14 8.05007 14C7.49779 14 7.05007 13.5523 7.05007 13V12.5C7.05007 11.6716 6.37851 11 5.5501 11Z" fill="#000000"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5001 8.25C13.9478 8.25 13.5001 7.80228 13.5001 7.25C13.5001 6.69772 13.9478 6.25 14.5001 6.25C15.0523 6.25 15.5001 6.69772 15.5001 7.25C15.5001 7.80228 15.0523 8.25 14.5001 8.25ZM14.5001 10.25C12.8432 10.25 11.5001 8.90685 11.5001 7.25C11.5001 5.59315 12.8432 4.25 14.5001 4.25C16.1569 4.25 17.5001 5.59315 17.5001 7.25C17.5001 8.90685 16.1569 10.25 14.5001 10.25Z" fill="#000000"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.45 11C15.2784 11 15.95 11.6716 15.95 12.5L15.95 14C15.95 14.5523 16.3977 15 16.95 15C17.5023 15 17.95 14.5523 17.95 14L17.95 12.5C17.95 10.567 16.383 9 14.45 9C12.517 9 10.95 10.567 10.95 12.5V13C10.95 13.5523 11.3977 14 11.95 14C12.5023 14 12.95 13.5523 12.95 13V12.5C12.95 11.6716 13.6216 11 14.45 11Z" fill="#000000"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0501 13.75C9.22165 13.75 8.55006 14.4216 8.55006 15.25L8.55005 16.75C8.55005 17.3023 8.10233 17.75 7.55004 17.75C6.99776 17.75 6.55005 17.3023 6.55005 16.75L6.55006 15.25C6.55007 13.317 8.11709 11.75 10.0501 11.75C11.9831 11.75 13.5501 13.317 13.5501 15.25V16.75C13.5501 17.3023 13.1024 17.75 12.5501 17.75C11.9978 17.75 11.5501 17.3023 11.5501 16.75V15.25C11.5501 14.4216 10.8785 13.75 10.0501 13.75Z" fill="#000000"/>
      <path d="M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="#000000"/>
    </svg>
    <span className='text-1xl font-bold '>{events?.participants?.length}</span>
  </div>
</div>






                <div class="w-1/2 flex justify-end">
                    
<svg width="40px" height="40px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF" /><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379" /></svg>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</Link>
</>
  )
}


export default EventCard