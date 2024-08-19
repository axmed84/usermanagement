import { validationResult } from "express-validator"
import Permission from "../../models/permissionModel.js";

export const addPermission = async(req, res) => {
    try { 

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { permission_name } = req.body

        const isExists = await Permission.findOne({ 
            permission_name:{
                $regex: permission_name,
                $options:'i'
            }
        })

        if(isExists){
            return res.status(400).json({
                success: false,
                msg:"Permission Name already exists",
            })
        }

        var obj = {
            permission_name
        }
        if(req.body.default){
            obj.is_default = parseInt(req.body.default)
        }

        const permission = new Permission( obj )
        const newPermission = await permission.save()

        return res.status(200).json({
            success: true,
            msg:"Permission Added Succesfully!",
            data: newPermission
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const getPermissions = async (req, res) => {
    try {
        
       const permissions = await Permission.find({})

       return res.status(200).json({
        success: true,
        msg:"Permission Fetched succesfully!",
        data: permissions
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}

export const getPermission = async (req, res) => {
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

       const permissions = await Permission.findById({_id: id})

       return res.status(200).json({
        success: true,
        msg:"Permission Fetched succesfully!",
        data: permissions
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Permission Id not found'
        })
    }
}


export const deletePermissions = async (req, res) => {
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

       const permissions = await Permission.findByIdAndDelete({_id: id})

       return res.status(200).json({
        success: true,
        msg:"Permission Deleted succesfully!",
        data: permissions
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const updatePermissions = async (req, res) => {
    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }
        
        const { id, permission_name} = req.body

       const isExists = await Permission.findOne({_id: id})

       if(!isExists){
        return res.status(400).json({
            success: false,
            msg: "Permission Id not found!"
        })
       }

    //    Checking hadii qof horay loo siiyay permission-kaan
       const isNameAssigned = await Permission.findOne({
        //  $ne = not equal
        _id: {$ne : id},
        permission_name:{
            $regex: permission_name,
            $options:'i'
        }
       })

       if(isNameAssigned){
        return res.status(400).json({
            success: false,
            msg: "Permission name already assigned to another permission!"
        })
       }

       var updatePermission = {
        permission_name
       }

       if(req.body.default){
        updatePermission.is_default = parseInt(req.body.default)
       }

       const updatedPermission = await Permission.findByIdAndUpdate({_id:id},{
        $set: updatePermission
       }, { new:true })

       return res.status(200).json({
        success: true,
        msg:"Permission Updated succesfully!",
        data: updatedPermission
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}