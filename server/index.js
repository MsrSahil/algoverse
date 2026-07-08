import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import connectDB from './src/config/db.js';
import cors from 'cors'
import morgan from 'morgan'



const app = express();
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())

app.get("/",(req,res)=>{
    console.log("server connected successfully")
    res.json({message:"server connected and working properly"})
})

app.use((err,req,res,next) =>{
    const errorMessage = err.message || "Internal server error";
    const statusCode= err.statusCode || 500;
    res.status(statusCode).json({message: errorMessage})
})


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("server started at :",port)
    connectDB();
})
