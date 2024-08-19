import Like from "../models/likeModel.js";
import { validationResult } from "express-validator";

export const postLike = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { user_id, post_id } = req.body

        const isLiked = await Like.findOne({
            user_id,
            post_id
        })

        if(isLiked){
            return res.status(400).json({
                success: false,
                msg: "You already Liked"
            })
        }

        const like = new Like({
            user_id,
            post_id
        })

        const likeData = await like.save()

        return res.status(200).json({
            success: true,
            msg: "Post liked",
            data: likeData
        })

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}

export const postUnLike = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { user_id, post_id } = req.body

        const isLiked = await Like.findOne({
            user_id,
            post_id
        })

        if(!isLiked){
            return res.status(400).json({
                success: false,
                msg: "You have not Liked"
            })
        }

        await Like.deleteOne({
            user_id,
            post_id
        })

        return res.status(200).json({
            success: true,
            msg: 'Post unLiked'
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
    
}

export const postLikeCount = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { post_id } = req.body

        const likeCount = await Like.find({
            post_id
        }).countDocuments()

        return res.status(200).json({
            success: true,
            msg: 'Post Like Count!',
            data: likeCount
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
    
}