import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({

permission_name:{
  type:String,
  required:true
},
is_default:{
  type:Number,
  default:0
}
  
})

export default mongoose.model("Permission",permissionSchema)