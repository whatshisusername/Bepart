import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'



import Home from './pages/Home.js'

import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import UpdateDetails from './pages/UpdateDetails.js'
import UpdateAvatar from './pages/UpdataAvatar.js'
import AllCourses from './pages/AllCourses.js'
import AddCourse from './pages/AddCourse.js'
import Coursepage from './pages/Coursepage.js'
import TeacherSignup from './components/TeacherSignup.js'
import MyCourses from './pages/MyCourses.js'
import Notification from './pages/Notification.js'

import AddEvent from './pages/AddEvent.js'
import TodayEvents from './pages/TodayEvents.js'
import EventsHome from './pages/EventsHome.js'
import OtherEvents from './pages/OtherEvents.js'
import Eventpage from './pages/Eventpage.js'
import MyEvents from './pages/MyEvents.js'
import HallTicket from './pages/HallTicket.js'
import Marksheet from './pages/Marksheet.js'
import Applications from './pages/Applications.js'
import Applicant from './pages/Applicant.js'
import UpcomingEvents from './pages/UpcomingEvents.js'
import AddRun from './pages/AddRun.js'
import TodayRun from './pages/TodayRun.js'
import UpcomingRun from './pages/UpcomingRun.js'
import OtherRun from './pages/OtherRun.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
    },
        
        {
            path: "/signup",
            element: (
                    <Signup />
            ),
        },
        {
          path: "/teacher-signup",
          element: (
                  <TeacherSignup/>
          ),
      },

        {
          path: "/login",
          element: (
                  <Login/>
          ),
      },
      {
        path: "/update-account",
        element: (
                <UpdateDetails/>
        ),
    },
    {
      path: "/update-avatar",
      element: (
              <UpdateAvatar/>
      ),
  },
  {
    path: "/all-courses",
    element: (
        
            <AllCourses />
       
    ),
},
{
  path: "/my-courses",
  element: (
      
          <MyCourses />
     
  ),
},
{
  path: "/add-course",
  element: (
      
          <AddCourse />
     
  ),
},
{
  path: "/hallticket",
  element: (
      
          <HallTicket />
     
  ),
},
{
  path: "/marksheet",
  element: (
      
          <Marksheet />
     
  ),
},
{
  path: "/applications",
  element: (
      
          <Applications />
     
  ),
},
{
  path: "/applicant/:applicantid",
  element: (
      
          <Applicant />
     
  ),
},
{
  path: "/course/:courseId",
  element: <Coursepage />,
},

{
  path: "/all-notifications",
  element: (
      
          <Notification />
     
  ),
},
{
  path: "/events",
  element: (
      
          <EventsHome/>
  ),
  },
{
path: "/today-events",
element: (
    
        <TodayEvents/>
),
},

{
  path: "/other-events",
  element: (
      
          <OtherEvents/>
  ),
  },

  {
    path: "/upcoming-events",
    element: (
        
            <UpcomingEvents/>
    ),
    },

{
  path: "/add-event",
  element: (
      
          <AddEvent/>
  ),
  },
  {
    path: "/add-event-run",
    element: (
        
            <AddRun/>
    ),
    },
    {
      path: "/today-events-run",
      element: (
          
              <TodayRun/>
      ),
      },
      {
        path: "/upcoming-events-run",
        element: (
            
                <UpcomingRun/>
        ),
        },
  
        {
          path: "/other-events-run",
          element: (
              
                  <OtherRun/>
          ),
          },
    
  {
    path: "/my-events",
    element: (
        
            <MyEvents/>
    ),
    },

  {
    path: "/event/:eventId",
    element: <Eventpage />,
  },
        
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
