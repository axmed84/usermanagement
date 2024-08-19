import mongoose from "mongoose";

const routerPermissionSchema = new mongoose.Schema({

router_endpoint:{
  type:String,
  required:true
},
role:{
  type:Number,
  default:0
},
permission_id:{
  type: mongoose.Schema.Types.ObjectId,
  required:true,
  ref: 'Permission'
},
permission:{
    type:Array,
     required:true
}
  
})

export default mongoose.model("RouterPermission",routerPermissionSchema)