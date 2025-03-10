// this to show all events happening today
import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
const UpcomingRun = () => {

  const [events, setevents] = useState([])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
  
    const [response,setresponse]=useState('')
    const [error,seterror]=useState('')
  
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const navigate=useNavigate();

    useEffect(()=>{
      axios.get('/api/v1/runs/upcoming-events')
    .then(function (response) {
      console.log(response);
      setevents(response?.data?.data?.listofevents)
      setresponse(response?.data?.message)
      seterror('')
    })
    .catch(function (error) {
      console.log("error=",error);
      seterror(error?.response?.data?.errors[0])
      setresponse('')
    });
  },[events])

  console.log("error=",error);
  
  if(events.length===0){
    return (
      <>
      <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mt-4">
      <div className="space-x-4">
      <button onClick={()=>{navigate('/today-events-run')}} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Today
          </button>
          <button onClick={()=>{navigate('/upcoming-events-run')}}  className="bg-teal-500 hover:bg-teal-600 text-3xl text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Upcoming
          </button>
          <button onClick={()=>{navigate('/other-events-run')}} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Past
          </button>
          <button onClick={()=>{navigate('/add-event-run')}}className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Add Event
          </button>
      </div>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight mb-2 pb-4 relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"></span>
    </h1>

    
  </div>

      <h1 class="mb-4 mt-64 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Upcoming Run Events</span> </h1>
      </>
    )
  }

  return (
    <>
    <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mt-4">
      <div className="space-x-4">
      <button onClick={()=>{navigate('/today-events-run')}} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Today
          </button>
          <button onClick={()=>{navigate('/upcoming-events-run')}}  className="bg-teal-500 hover:bg-teal-600 text-3xl text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Upcoming
          </button>
          <button onClick={()=>{navigate('/other-events-run')}} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Past
          </button>
          <button onClick={()=>{navigate('/add-event-run')}}className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Add Event
          </button>
      </div>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight mb-2 pb-4 relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"></span>
    </h1>

    
  </div>


<h1 class="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Upcoming</span> </h1>
<div class="h-fit flex  items-center justify-center  mt-0 ">
  
<div class="grid grid-cols-1 gap-4 gap-y-8 w-50 ">

     
       
{events.map((events)=>
        (

//           <div class="col-span-12 sm:col-span-6 md:col-span-3 mt-0" id={events.events._id} key={events.events._id}>
//       <card class="w-60 h-30 flex flex-col">
//         <div class="relative">

//           <a href="#">
//             <img src={events.events.thumbnail} class="w-96 h-auto" />
//           </a>
          

//           <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">{ dayNames[(new Date(events.events.date)).getDay()]  },{ (new Date(events.events.date)).getDate()  } { month[(new Date(events.events.date)).getMonth()]  }</p>
//         </div>

//         <div class="flex flex-row mt-2 gap-2">

        
//           <a href="#">
//             <img src={events.avatar} class="rounded-full max-h-10 max-w-10" />
//             {events.fullname}
//           </a>

          
//           <div clas="flex flex-col">
//             <a href="#">
//               <p class="text-black-100 text-sm font-semibold">{events.events.title}</p>
//             </a>
//             <a class="text-black-100 text-xs mt-2 hover:text-black-100" href="#">{events.events.time}</a>
//             <p class="text-black-100 text-xs mt-1">
//             <svg width="10px" height="10px" viewBox="-5.07 0 43.012 43.012" xmlns="http://www.w3.org/2000/svg">
//   <path id="location" d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z" transform="translate(-389.902 -217)" fill="#2d5be2"/>
// </svg>{events.events.venue}</p>
//           </div>

//         </div>
//       </card>
//     </div>
<EventCard
{...events
  
} />
        ))
}









        

    </div>
</div>
</>
  );
};

export default UpcomingRun;




