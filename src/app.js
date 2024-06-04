import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { registerUser } from './controllers/user.controller.js'

const app = express()

// configuring cors 
// allowing all website origins to acess our website
// app.use(
//     cors({
//         origin:process.env.CORS_ORIGIN,
//         credentials:true

//     })
// )


<<<<<<< HEAD
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
 allowedHeaders: ['Content-Type', 'Authorization']}
))
=======

app.use(cors())
>>>>>>> 41bc9fddff8f376ce8b3c44821e9372cc3ccca5b
// app.use(cors({
//   origin: 'https://mycollege-deploy-git-main-nishants-projects-abe79550.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
<<<<<<< HEAD
=======

>>>>>>> 41bc9fddff8f376ce8b3c44821e9372cc3ccca5b
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });



// this is to configure how much json data will be accepted by server
app.use(express.json({limit: "16kb"}))

// as we open google .com and search something that appears on the url like google.com+Nishant this + is encoding
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// this is to store files we want to store for us
app.use(express.static("public"))
// this is to configure users cookies
app.use(cookieParser())





// routing 
import userRouter from './routes/user.routes.js'

import courseRouter from './routes/course.routes.js'

import notificationRouter from './routes/notification.routes.js'

import eventRouter from './routes/event.routes.js'
// route declaration


// so when url is http://localhost:8000/api/v1/users we go to userrouter ie inside user.routes.js
app.use('/api/v1/users',userRouter)

app.use('/api/v1/courses',courseRouter)

app.use('/api/v1/notifications',notificationRouter)

app.use('/api/v1/events',eventRouter)




export {app}
