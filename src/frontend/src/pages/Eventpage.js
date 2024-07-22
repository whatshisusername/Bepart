// this is individual event page

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";
export default function Eventpage() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const {eventId}=useParams();
    const [event, setevent] = useState([]);

   
    const navigate=useNavigate();
    const [error, seterror] = useState('');
    const [response, setresponse] = useState('');
    const [response1, setresponse1] = useState('');
    const [deleteresponse, setdeleteresponse] = useState('');
    const [joined,setjoined]=useState('');
    const userData = useSelector((state) => state.auth.userData);

    const deleteevent =()=>{
      setdeletingevent(true);
      console.log("deleting event")
      axios.delete(`/api/v1/events/delete-event/${event.events._id}`)
      .then(response => {
          console.log(response)
          setdeleteresponse(response?.data?.message)
          navigate('/my-events');
          
  
    
        
          
      })
      .catch(error => {
          console.error("Error fetching course:", error);
      });
  
  
  
     }

    
        // Fetch course details
                console.log("hitting getevent byid")
                axios.get(`/api/v1/runs/get-event/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.listofevents[0]);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
    
                    axios.get(`/api/v1/beachcleanups/get-event/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.listofevents[0]);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
    


    console.log(event)
    console.log(event)
    console.log(event.events)
    console.log(userData);
    const [deletingevent,setdeletingevent]=useState(false);

    const handleSuccessClose = () => {
      setresponse1('')
    };

    const joinevent=()=>{
      if (!userData){
        setresponse("LOGIN PLEASE")
      }

      else if(event?.events?.endlocation){
        axios.patch(`/api/v1/runs/joinevent/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse1(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.event);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
    
              


      }




      else{
        axios.patch(`/api/v1/beachcleanups/joinevent/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse1(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.event);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
    
              

      }


    }

    useEffect(()=>{

      if (event?.events?.endlocation){
        axios.get(`/api/v1/runs/joined/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.event);
                        setjoined(true);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
    


      }
    
    else{axios.get(`/api/v1/beachcleanups/joined/${eventId}`)
                    .then(response => {
                        console.log(response)
                        setresponse(response?.data?.message)
                        console.log((new Date(event?.events?.date)).getDay())
                        setevent(response?.data?.data?.event);
                        setjoined(true);
                      
                        
                    })
                    .catch(error => {
                        console.error("Error fetching event:", error);
                    });
                  }
                    
},[eventId])



    return (
        <>

{response1 &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{response1}</p>
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
        
        {deleteresponse &&    
             <div className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white ml-96" data-dismissible="alert">
             <div className="absolute top-4 left-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-px h-6 w-6">
                 <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"></path>
               </svg>
             </div>
             <div className="ml-8 mr-12">
               <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">Success</h5>
               <p className="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">{deleteresponse}</p>
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

         

            <section class="text-gray-700 body-font mt-0 overflow-hidden bg-white">
              
  <div class="container px-5 py-24 mx-auto">
    
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      
      <img alt="ecommerce" class="w-96 h-50 object-contain rounded border border-gray-200" src={event?.events?.thumbnail}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        
      {/* delete post button */}
      {userData?._id===event?.events?.owner&&
      <div class="inline-flex items-center rounded-md shadow-sm">
    
    <button
    onClick={deleteevent}
        class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
        <span class="hidden md:inline-block">Delete</span>
    </button>
    {deletingevent&&<h1>he</h1>}
</div>
}



        <h2 class="text-sm title-font text-gray-black tracking-widest">{event?.fullname} Presents</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{event?.events?.title}</h1>
        <div class="flex mb-4">
          
          
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a class="text-gray-500 " href={event?.events?.instagram} target="_blank">
            <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 455.73 455.73"
      width='50px'
      style={{ enableBackground: 'new 0 0 455.73 455.73' }}
      xmlSpace="preserve"
    >
      <path
        style={{ fill: '#C536A4' }}
        d="M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66
      H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66
      H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55
      c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33
      C273.18,202.88,252.85,182.55,227.86,182.55z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
      c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37
      c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
      C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
      c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
      s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
      c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z"
      />
    </svg>
            </a>

            <a class="ml-2 text-gray-500 mt-1" href={event?.events?.twitter} target="_blank">
            <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#1D9BF0" d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.262 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"/></svg>
            </a>
            <a class="ml-2 text-gray-500" href={event?.events?.whatsapp} target="_blank">
            <svg width="40px" height="40px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"/>
      <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"/>
      <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/>
      <defs>
        <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5BD066"/>
          <stop offset="1" stopColor="#27B43E"/>
        </linearGradient>
      </defs>
    </svg>
            </a>
           
          </span>
        </div>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          
          <div class="flex ml-6 items-center">
          <span class="title-font font-medium text-2xl ml-0 text-gray-900">
          <svg
      fill="#000000"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      id="date"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <path
        id="secondary"
        d="M3,10H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V10A0,0,0,0,1,3,10Z"
        style={{ fill: 'rgb(44, 169, 188)', strokeWidth: 2 }}
      ></path>
      <path
        id="primary"
        d="M20,21H4a1,1,0,0,1-1-1V10H21V20A1,1,0,0,1,20,21ZM21,6a1,1,0,0,0-1-1H4A1,1,0,0,0,3,6v4H21ZM16,3V7M8,3V7"
        style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
      ></path>
    </svg>
          { dayNames[(new Date(event?.events?.date)).getDay()]  },{ (new Date(event?.events?.date)).getDate()  } { month[(new Date(event?.events?.date)).getMonth()]  }</span>
          <span class="title-font font-medium text-2xl ml-4 text-gray-900">
          <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M24.0083 12L24.0071 24.0088L32.4865 32.4882" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          {event?.events?.starttime}-{event?.events?.endtime}</span>
          {/* <span class="title-font font-medium text-2xl ml-8 text-blue-500">
          <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
</svg>{event?.events?.location || event?.events?.startlocation}-{event?.events?.endlocation}</span> */}
<div class="w-1/2 text-1xl text-blue-600">
                {/* <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
</svg> */}
<img src='https://thumbs.dreamstime.com/b/start-location-pin-as-vector-illustration-231741521.jpg' className='h-20'></img>{event?.events?.startlocation || event?.events?.location}
                </div>
                
                
                
                  {event?.events?.endlocation &&<div class="w-1/2 text-1xl text-blue-600">
                {/* <svg width="20px" height="20px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
  <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#ff0000"/>
</svg> */}
<img src="https://img.freepik.com/premium-vector/finish-flag_592324-15308.jpg" className='h-20'></img>{event?.events?.endlocation}
                </div>}

          </div>
        </div>
        <p class="leading-relaxed">{event?.events?.description}</p>

       {/* {!joined&& event?.events?.endlocation &&<button
        onClick={joinevent}
    class="nav-button hover:drop-shadow-lg flex w-fit items-center justify-center rounded-full border border-[#0c550c] bg-[#d3e763] bg-gradient-to-tr from-[#97f163] to-[#78c048]/70 px-7 py-2.5 text-base font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1 mt-4">
    <span>Join now</span>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="ml-2" height="1em"
      width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd"
        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z">
      </path>
    </svg>
  </button>}
        */}
      </div>
    </div>
  </div>
</section>

       </>
    );
}
