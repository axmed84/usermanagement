import Category from "../models/categoryModel.js";
import { validationResult } from "express-validator";

export const addCategory = async(req,res) => {
    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { category_name } = req.body

       const isExisits = await Category.findOne({
            title:{
                $regex: category_name,
                $options:'i'
            }
        })

        if(isExisits){
            return res.status(400).json({
                success: false,
                msg: 'Category_name Already exist'
            })
        }

       const category = new Category({
            title: category_name
        })

        const categoryData = await category.save()

        return res.status(200).json({
            success: true,
            msg: "Category Created Succesfully!",
            data: categoryData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const getCategories = async(req,res) => {
    try {
       const categories = await Category.find({})

        return res.status(200).json({
            success: true,
            msg: "Category Fetched Succesfully!",
            data: categories
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const deleteCategory = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { id } = req.body

       const categoryData = await Category.findOne({_id:id})

       if(!categoryData){
        return res.status(400).json({
            success: false,
            msg: "'Category ID doesn't exist'"
        })
       }

         await Category.findByIdAndDelete({_id:id})

        return res.status(200).json({
            success: true,
            msg: "Category Deleted Succesfully!"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const updateCategory = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { id, category_name } = req.body

        const categoryData = await Category.findOne({_id:id})
 
        if(!categoryData){
         return res.status(400).json({
             success: false,
             msg: "'Category ID doesn't exist'"
         })
        }

        const isExisits = await Category.findOne({
            _id: { $ne: id},
            title:{
                $regex: category_name,
                $options:'i'
            }
        })

        if(isExisits){
            return res.status(400).json({
                success: false,
                msg: 'Category_name Already assigned to another category!'
            })
        }

        const updatedData = await Category.findByIdAndUpdate({_id:id},{
            $set:{
                title: category_name
            }
        }, {new:true})

        return res.status(200).json({
            success:true,
            msg: "Category ID Updated Successfully!",
            data: updatedData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}