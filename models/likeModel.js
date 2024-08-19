import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'User'
  },
  post_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Post'
  },
  
})

export default mongoose.model("Like",likeSchema)