// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import app from "./app.js"

// import mongoose from "mongoose";
// import {DB_NAME} from "./contants";

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


app.on("error", (error) => {
    console.error("Express error", error)
  })
  
  connectDB()
  .then(() => {
    console.log("MongoDB connected")
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Express server started at http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error)
    process.exit(1)
  })
  

// import express from "express"
// const app = express()

// ;(async()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error" , (error)=>{
//         console.log("ERROR: " , error);
//         throw error
//       })

//       app.listen(process.env.PORT , ()=>{
//         console.log(`app is listening on port ${process.env.PORT}`);
//       })
//     }
//     catch(error){
//       console.log("ERROR: ", error)
//       throw err
//     }
// })()