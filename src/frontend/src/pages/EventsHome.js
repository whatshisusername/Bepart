import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TodayPreview from "./TodayPreview";
import OtherPreview from "./OtherPreview";
import TodayEvents from "./TodayEvents";
import { useNavigate } from "react-router-dom";

const EventsHome = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [allevents, setAllEvents] = useState([]);
  const [error, setError] = useState("");
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const authStatus = useSelector((state) => state?.auth?.status);
  const userData = useSelector((state) => state?.auth?.userData);

  const navigate=useNavigate();

  useEffect(() => {
    axios.get("/api/v1/beachcleanups/today-events")
      .then(function (response) {
        console.log(response);
        setTodayEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log("error=",error);
        setError(error?.response?.data?.errors[0]);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/v1/beachcleanups/other-events")
      .then(function (response) {
        console.log(response);
        setOtherEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log("error=",error);
       
      });
  }, [otherEvents]);

  useEffect(() => {
    axios.get("/api/v1/beachcleanups/all-events")
      .then(function (response) {
        console.log(response);
        setAllEvents(response?.data?.data?.listofevents);
        setError("");
      })
      .catch(function (error) {
        console.log("error=",error);
        
      });
  }, [allevents]);

  // if(allevents.length){
  //   return (
  //     <>
  //     <h1 class="mb-4 mt-64 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">No Event Yet</span> </h1>
  //     </>
  //   )
  // }

  axios.get('https://nominatim.openstreetmap.org/search?q=aksa+beach&format=json')
  .then(function (response) {
    console.log(response)

  })
  .catch(function (error) {
    // console.log(error.response.data.errors[0]);
    console.log("error=",error);

  });




  return (
    <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mt-4">
      <div className="space-x-4">
      <button onClick={()=>{navigate('/today-events')}} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Today
          </button>
          <button onClick={()=>{navigate('/upcoming-events')}}  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Upcoming
          </button>
          <button onClick={()=>{navigate('/other-events')}} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Past
          </button>
          <button onClick={()=>{navigate('/add-event')}}className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Add Event
          </button>
      </div>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight mb-2 pb-4 relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Events</span>
    </h1>
    
    
  </div>


  );
};

export default EventsHome;
