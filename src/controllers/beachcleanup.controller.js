import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'
import { Event } from '../models/event.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import { BeachCleanup } from '../models/beachcleanup.model.js'






//Beach cleanup
const createEvent = asyncHandler(async (req,res)=>{
    


    
    const {title,description,date,starttime,endtime,location,instagram,twitter,whatsapp}=req.body;

    // console.log(req.body)
    //  validate user details got  from front end

    // must be not empty
    if (title===""){
        return res.status(404).json(
            new ApiError(404,"title is required",["title is required"])
         )
    }
    // must be not empty
    if (description===""){
        return res.status(404).json(
            new ApiError(404,"description is required",["description is required"])
         )
    }
    if (!date){
        return res.status(404).json(
            new ApiError(404,"date is required",["date is required"])
         )
    }
    if (starttime===""){
        return res.status(404).json(new ApiError(404,"starttime is required",['starttime is required']))
    }
    if (endtime===""){
        return res.status(404).json(new ApiError(404,"endtime is required",['endtime is required']))
    }
    if (location===""){
        return res.status(404).json(new ApiError(404,"location is required",['location is required']))
    }

    const thumbnailLocalPath=req.file.path;

    

    if (!thumbnailLocalPath){
        return res.status(404).json(new ApiError(400,"thumbnail is required",["thumbnail is required"]));
    }

    // upload on cloudinary

     const thumbnailCloudinaryPath = await uploadOnCloudinary(thumbnailLocalPath);
    

    //  console.log(avatarCloudinaryPath)

     if (!thumbnailCloudinaryPath){
        return res.status(404).json(new ApiError(400,"thumbnail is required",["thumbnail is required"]));
     }

     console.log("location",location)


     function convertTo12HourFormat(time) {
        // Split the input time string into hours and minutes
        let [hour, minute] = time.split(':').map(Number);
    
        // Determine the period (AM/PM)
        let period = hour >= 12 ? 'PM' : 'AM';
    
        // Convert hour from 24-hour format to 12-hour format
        hour = hour % 12 || 12;
    
        // Format the hour and minute with leading zeros if necessary
        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;
    
        // Return the formatted time
        return `${hour}:${minute} ${period}`;
    }
    
    // Example usage:
    const stime=convertTo12HourFormat(starttime)
    const etime=convertTo12HourFormat(endtime)
    
    

    const event = await BeachCleanup.create({
        title:title,
        description:description,
        date:date,
        starttime:stime,
        endtime:etime,
        location:location,
        owner:req.user._id,
        instagram:instagram||"",
        
        twitter:twitter||"",
        whatsapp:whatsapp||"",
        thumbnail:thumbnailCloudinaryPath.url || ""})

    const createdevent = await BeachCleanup.findById(event._id)  
    if (!createdevent){

        return res.status(404).json(new ApiError(500,"something went wrong while adding event to database",["something went wrong while adding event to database"]));
    }

     // return response
     return res.status(201).json(
        new ApiResponse(200,{event:createdevent},"event created successfully")
     )




    
})
























const updateEventDetails = asyncHandler(async(req, res) => {
    const {eventId} = req.params;
    const {title,description,date,time,venue}=req.body;
    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

 
    if (!title || !date || !description || !time || !venue ) {
        return res
    .status(404)
    .json(new ApiError(404,"All fields are required",["All fields are required"]))
    
    }

    

    if(event.owner.equals(req.user._id)){
    const newevent = await Event.findByIdAndUpdate(
        event._id,
        {
            $set: {
                title:title?title:event.title,
               description:description?description:event.description,
                date:date?date:event.date,
                time:time?time:event.time,
                venue:venue?venue:event.venue,
               
            }
        },
        {new: true}
        
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {event:newevent}, "Event details updated successfully"))}

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

});


const updateEventThumbnail = asyncHandler(async(req, res) => {
    const {eventId}=req.params
    const thumbnailLocalPath = req.file?.path
    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail file is missing")
    }

    //TODO: delete old image - assignment

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnail.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    if(event.owner.equals(req.user._id)){
    const newevent = await Event.findByIdAndUpdate(
        eventId,
        {
            $set:{
                thumbnail: thumbnail.url
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, {event:newevent}, "thumbnail image updated successfully")
    )}

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

})

const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params
    

    const event = await Event.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(404,"event donot exists ",["event donot exists"]))

    }

    if (event.owner.equals(req.user._id)){
        await Event.findByIdAndDelete(eventId);

        return 
        res.status(200).json(new ApiResponse(200, {}, "event deleted successfully"))

    }

    return res.status(404).json(new ApiError(404,"you are not owner of event",["you are not owner of event"]))

 



})

const getAllEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const listofevents = await Event.find({});
   const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  

//  do it

    console.log(listofevents,"kjj");
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events all fetched successfully"));
});


const getTodayEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
   // Date object initialized as per New Zealand timezone. Returns a datetime string
let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

// Date object initialized from the above datetime string
let date_nz = new Date(nz_date_string);

// year as (YYYY) format
let year1 = date_nz.getFullYear();

// month as (MM) format
let month1 = ("0" + (date_nz.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_nz.getDate()).slice(-2);

// hours as (HH) format
let hours = ("0" + date_nz.getHours()).slice(-2);

// minutes as (mm) format
let minutes = ("0" + date_nz.getMinutes()).slice(-2);

// seconds as (ss) format
let seconds = ("0" + date_nz.getSeconds()).slice(-2);

// date as YYYY-MM-DD format
let date_yyyy_mm_dd = year1 + "-" + month1 + "-" + date;
console.log("Date in YYYY-MM-DD format: " + date_yyyy_mm_dd);

// time as hh:mm:ss format
let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;
console.log("Time in hh:mm:ss format: " + time_hh_mm_ss);

// date and time as YYYY-MM-DD hh:mm:ss format
let date_time = year1 + "-" + month1 + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log("Date and Time in YYYY-MM-DD hh:mm:ss format: " + date_time);
    
    const dates= new Date();
    let day=dates.getDate();
    if(day<10){
        day="0"+String(day);
    }
    let month=dates.getMonth()+1;
    if(month<10){
        month="0"+String(month);
    }
    const year=String(dates.getFullYear())
    const dt =year+"-"+month+"-"+day
    console.log(dt)
    const listofevents = await BeachCleanup.find({date:date_yyyy_mm_dd}).sort({'updatedAt':-1 });
    const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events today fetched successfully"));
});


// for other events search event by title
const searchbytitle = asyncHandler(async(req, res) => {
     // Retrieve all courses from the database
     let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

// Date object initialized from the above datetime string
let date_nz = new Date(nz_date_string);

// year as (YYYY) format
let year1 = date_nz.getFullYear();

// month as (MM) format
let month1 = ("0" + (date_nz.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_nz.getDate()).slice(-2);

// hours as (HH) format
let hours = ("0" + date_nz.getHours()).slice(-2);

// minutes as (mm) format
let minutes = ("0" + date_nz.getMinutes()).slice(-2);

// seconds as (ss) format
let seconds = ("0" + date_nz.getSeconds()).slice(-2);

// date as YYYY-MM-DD format
let date_yyyy_mm_dd = year1 + "-" + month1 + "-" + date;
console.log("Date in YYYY-MM-DD format: " + date_yyyy_mm_dd);

// time as hh:mm:ss format
let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;
console.log("Time in hh:mm:ss format: " + time_hh_mm_ss);

// date and time as YYYY-MM-DD hh:mm:ss format
let date_time = year1 + "-" + month1 + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log("Date and Time in YYYY-MM-DD hh:mm:ss format: " + date_time);
     const dates= new Date();
     let day=dates.getDate();
     if(day<10){
         day="0"+String(day);
     }
     let month=dates.getMonth()+1;
     if(month<10){
         month="0"+String(month);
     }
     const year=String(dates.getFullYear())
     const dt =year+"-"+month+"-"+day
     console.log(dt)
    const { title} = req.query;
    console.log(title)
    const queryObject = {};

    if (title) {
        queryObject.title = title;
    }

    try {
        const listofevents = await Event.find({title:{ $regex:`${title}`},date: {$ne:date_yyyy_mm_dd}});
        console.log(listofevents)
        const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events search events fetched successfully"));
    } catch (error) {
        // Handle any errors that occur during database operations
        return res.status(500).json(new ApiError(500, "Internal Server Error", ["An error occurred while processing your request"]));
    }
});



const getOtherEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

// Date object initialized from the above datetime string
let date_nz = new Date(nz_date_string);

// year as (YYYY) format
let year1 = date_nz.getFullYear();

// month as (MM) format
let month1 = ("0" + (date_nz.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_nz.getDate()).slice(-2);

// hours as (HH) format
let hours = ("0" + date_nz.getHours()).slice(-2);

// minutes as (mm) format
let minutes = ("0" + date_nz.getMinutes()).slice(-2);

// seconds as (ss) format
let seconds = ("0" + date_nz.getSeconds()).slice(-2);

// date as YYYY-MM-DD format
let date_yyyy_mm_dd = year1 + "-" + month1 + "-" + date;
console.log("Date in YYYY-MM-DD format: " + date_yyyy_mm_dd);

// time as hh:mm:ss format
let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;
console.log("Time in hh:mm:ss format: " + time_hh_mm_ss);

// date and time as YYYY-MM-DD hh:mm:ss format
let date_time = year1 + "-" + month1 + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log("Date and Time in YYYY-MM-DD hh:mm:ss format: " + date_time);
    const dates= new Date();
    let day=dates.getDate();
    if(day<10){
        day="0"+String(day);
    }
    let month=dates.getMonth()+1;
    if(month<10){
        month="0"+String(month);
    }
    const year=String(dates.getFullYear())
    const dt =year+"-"+month+"-"+day
    console.log(dt)
    const listofevents = await BeachCleanup.find({date: {
        $lt: date_yyyy_mm_dd
     }}).sort({'updatedAt':-1 });
    const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events today fetched successfully"));
});


const getupcomingEvents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

// Date object initialized from the above datetime string
let date_nz = new Date(nz_date_string);

// year as (YYYY) format
let year1 = date_nz.getFullYear();

// month as (MM) format
let month1 = ("0" + (date_nz.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_nz.getDate()).slice(-2);

// hours as (HH) format
let hours = ("0" + date_nz.getHours()).slice(-2);

// minutes as (mm) format
let minutes = ("0" + date_nz.getMinutes()).slice(-2);

// seconds as (ss) format
let seconds = ("0" + date_nz.getSeconds()).slice(-2);

// date as YYYY-MM-DD format
let date_yyyy_mm_dd = year1 + "-" + month1 + "-" + date;
console.log("Date in YYYY-MM-DD format: " + date_yyyy_mm_dd);

// time as hh:mm:ss format
let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;
console.log("Time in hh:mm:ss format: " + time_hh_mm_ss);

// date and time as YYYY-MM-DD hh:mm:ss format
let date_time = year1 + "-" + month1 + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log("Date and Time in YYYY-MM-DD hh:mm:ss format: " + date_time);
    const dates= new Date();
    let day=dates.getDate();
    if(day<10){
        day="0"+String(day);
    }
    let month=dates.getMonth()+1;
    if(month<10){
        month="0"+String(month);
    }
    const year=String(dates.getFullYear())
    const dt =year+"-"+month+"-"+day
    console.log(dt)
    const listofevents = await BeachCleanup.find({date: {
        $gt: date_yyyy_mm_dd
     }}).sort({'updatedAt':-1 });
    const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  
   
    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of events today fetched successfully"));
});

const getEventById = asyncHandler(async (req, res) => {
    const { eventId } = req.params
    //TODO: get video by id

    const event = await BeachCleanup.findById(eventId)

    if (!event){
        return res.status(404).json(new ApiError(401,"Event donot exists ",["Event donot exists "]))

    }
    const events=[]
 
        const student = await User.findById(event.owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:event,fullname:name,avatar:avatar})




    

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {listofevents:events},
        "Event fetched successfull"
    ))
})

const getmyevents = asyncHandler(async (req, res) => {
    // Retrieve all courses from the database
    const listofevents = await Event.find({owner:req.user._id}).sort({'updatedAt':-1 });
   const events=[]
    for(var i=0; i< listofevents.length; i++) {  
        //display the array elements  
        const student = await User.findById(listofevents[i].owner);
        const name=student.fullname;
        const avatar=student.avatar;
       events.push({events:listofevents[i],fullname:name,avatar:avatar})

 }  

    console.log(listofevents);
    return res.status(200).json(new ApiResponse(200, {listofevents:events}, "List of my events all fetched successfully"));
});



const joinevent = asyncHandler(async (req, res) => {
    const { eventId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const event = await BeachCleanup.findById(eventId)
    // Check if the user already exists in the students array
    if (event.participants.includes(req.user._id)) {
        return res.status(401).json(new ApiError(401,"participant already enrolled to course ",["participant already enrolled to course"]))
    }

    if (!event){
        return res.status(401).json(new ApiError(401,"event donot exists ",["event donot exists"]))

    }

    const {participant}=req.user

    // adding student to course
    await BeachCleanup.updateOne({ _id: eventId }, { $push: { participants: req.user._id } })

    const newevent = await BeachCleanup.findById(eventId)
    // return response
    return res.status(201).json(
       new ApiResponse(200,{event:newevent},"patricipant added to event successfully")
    )



})

const joined = asyncHandler(async (req, res) => {
    const { eventId } = req.params

    // in this user toggle on button
    // if button is already false and it is toggled set it to true ,if true set it to false
    // true=publish,false=unpublish

   
    const event = await BeachCleanup.findById(eventId)
    // Check if the user already exists in the students array
    if (event.participants.includes(req.user._id)) {
        return res.status(201).json(
            new ApiResponse(200,{event:event},"patricipant joined")
         ) }

    return res.status(401).json(new ApiError(401,"not joined ",["not joined"]))

   


})











export {
 createEvent,
 updateEventDetails,
 updateEventThumbnail,
 deleteEvent,
 getAllEvents,
 getTodayEvents,
 getOtherEvents,
 getEventById,
 getmyevents,
 searchbytitle,
 getupcomingEvents,
 joinevent,
 joined
};