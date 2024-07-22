import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import {Container} from '../components';
import { useSelector } from "react-redux";
import Header from '../components/Header/Header';

import Autocomplete from "react-google-autocomplete";
import axios from "axios"

function Home() {
    const userData = useSelector((state) => state.auth.userData)
    const [date,setdate]=useState()
    const dates= new Date();
    const dt =String(dates.getFullYear())+"-0"+String(dates.getMonth()+1)+"-"+String(dates.getDate())
    
    console.log((date),dt,date===dt)
    const navigate=useNavigate();

    // axios.get('https://nominatim.openstreetmap.org/search?q=dadar beach&format=json')
    // .then(function (response) {
    //   console.log(response)
  
    // })
    // .catch(function (error) {
    //   // console.log(error.response.data.errors[0]);
    //   console.log("error=",error);

    // });

    // const options = {
    //     method: 'GET',
    //     url: 'https://api.foursquare.com/v3/autocomplete',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'fsq3x1y3OEV1aNPNV7IEv8fKRrxCMPu6VsDHAhT2EOuTe40='
    //     },
    //     params: {
    //       query: 'DADAR',              // Replace with your search query
         
    //     }
    //   }; 
    //   axios(options)
    //     .then(response => {
    //       console.log("api=",response.data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    



        return userData?(
            <>
            <div className="w-full py-8 mt-4 text-center">

                <Container>
{/*                    
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-white-500">
                                welcome {userData.fullname}
                            </h1>
                            
                        </div>
                    </div>
                     */}
<main class="my-8">
        <div class="container mx-auto px-6">
        <div className="w-full h-64 rounded-md overflow-hidden bg-cover bg-center " style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-M_dts0cZvt5WPfajg6zm325ejnSjGTzbw&s')` }}>
    <div className="bg-gradient-to-b from-blue-500 to-blue-300 bg-opacity-50 flex items-center h-full">
        
        <div className="px-10 max-w-xl text-center text-white">
            <h2 className="text-3xl font-semibold">Join a Beach Cleanup Drive</h2>
            <p className="mt-2 text-gray-100">Join us for a beach cleanup drive this weekend and help keep our shores beautiful and pristine! Together, we can make a positive impact on our environment and enjoy a day of community and conservation.</p>
            <button onClick={()=>{navigate('/today-events')}} className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Check Out</span>
                <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
        </div>
    </div>
</div>





            <div class="md:flex mt-8 md:-mx-4">
                <div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{ backgroundImage: `url('https://media.licdn.com/dms/image/D4D12AQGWQD4WD5_FiA/article-cover_image-shrink_720_1280/0/1705904115588?e=2147483647&v=beta&t=ZaIOn8CQTZNio9Sig9xA7KiSAWTmbdzk3FvLTnCeJUo` }} >
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10 max-w-xl">
                            
                            <h2 class="text-2xl text-white font-semibold">Join a Run</h2>
                            <p class="mt-2 text-gray-100">Join us for a refreshing run through scenic trails and city streets, where fitness meets community. Lace up, connect, and embrace the thrill of moving together towards healthier lifestyles.</p>
                            <button onClick={()=>{navigate('/today-events-run')}} class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Check Out</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" >
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full" style={{ backgroundImage: `url('https://www.shoutlo.com/uploads/articles/header-img-mass-tree-plantation-drive-chandigarh-29th-july-2018.jpg` }}>
                        <div class="px-10 max-w-xl">
                            <h2 class="text-2xl text-white font-semibold">Join a Community Gardening</h2>
                            <p class="mt-2 text-gray-100">Join us in contributing to environmental sustainability by participating in our plantation drive. Together, we can make a positive impact on our planet's health and future.</p>
                            <button  class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Check Out</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    </main>
                </Container>
            </div>
            </>
        ):(<>
           
            <div className="w-full py-8 mt-4 text-center">

                <Container>

<main class="my-8">
        <div class="container mx-auto px-6">
        <div className="w-full h-64 rounded-md overflow-hidden bg-cover bg-center " style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-M_dts0cZvt5WPfajg6zm325ejnSjGTzbw&s')` }}>
    <div className="bg-gradient-to-b from-blue-500 to-blue-300 bg-opacity-50 flex items-center h-full">
        
        <div className="px-10 max-w-xl text-center text-white">
            <h2 className="text-3xl font-semibold">Join a Beach Cleanup Drive</h2>
            <p className="mt-2 text-gray-100">Join us for a beach cleanup drive this weekend and help keep our shores beautiful and pristine! Together, we can make a positive impact on our environment and enjoy a day of community and conservation.</p>
            <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Check Out</span>
                <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
        </div>
    </div>
</div>





            <div class="md:flex mt-8 md:-mx-4">
                <div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{ backgroundImage: `url('https://media.licdn.com/dms/image/D4D12AQGWQD4WD5_FiA/article-cover_image-shrink_720_1280/0/1705904115588?e=2147483647&v=beta&t=ZaIOn8CQTZNio9Sig9xA7KiSAWTmbdzk3FvLTnCeJUo` }} >
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10 max-w-xl">
                            
                            <h2 class="text-2xl text-white font-semibold">Join a Run</h2>
                            <p class="mt-2 text-gray-100">Join us for a refreshing run through scenic trails and city streets, where fitness meets community. Lace up, connect, and embrace the thrill of moving together towards healthier lifestyles.</p>
                            <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Check Out</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" >
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full" style={{ backgroundImage: `url('https://www.shoutlo.com/uploads/articles/header-img-mass-tree-plantation-drive-chandigarh-29th-july-2018.jpg` }}>
                        <div class="px-10 max-w-xl">
                            <h2 class="text-2xl text-white font-semibold">Join a Community Gardening</h2>
                            <p class="mt-2 text-gray-100">Join us in contributing to environmental sustainability by participating in our plantation drive. Together, we can make a positive impact on our planet's health and future.</p>
                            <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Check Out</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    </main>

                </Container>
            </div>
            </>)
    }
export default Home