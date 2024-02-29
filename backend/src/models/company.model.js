import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  email:{
    type: String,
    required: true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  Address:{
    type:String,
    required:true
  },
  website:{
    type:String,
    required:true
  }
},{timestamps:true})

export const Company = mongoose.model("Company",companySchema)