import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
      fullname:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:true
       },
       gender:{
        type:String,
       },
       dob:{
        type:Date,
        required:true
       },
       country:{
        type:String,
        required:true
       }
    },{timestamps:true}
)

export const User = mongoose.model("User",userSchema);