import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({

    role_name:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }
  
})

export default mongoose.model("Role",roleSchema)