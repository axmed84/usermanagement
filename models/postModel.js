import mongoose from "mongoose";
import categories from "./categoryModel.js";

const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:false,
    }]
  
})

export default mongoose.model("Post",postSchema)