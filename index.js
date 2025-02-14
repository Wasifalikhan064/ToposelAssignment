import "dotenv/config"
import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";



const app=express()
app.use(express.json());
app.use(cookieParser()); 
app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes)
app.listen(3000,()=>{
    connectDB()
    console.log(`server running  at port ${process.env.PORT}`);
    
})

