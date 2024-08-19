import mongoose from "mongoose";

const userPermissionSchema = new mongoose.Schema({

  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  permissions:[{
    permission_name: String,
    permission_value:[Number]
    // 0-> Create, 1->read, 2->edit, 3->delete
  }]
  
})

export default mongoose.model("UserPermission",userPermissionSchema)