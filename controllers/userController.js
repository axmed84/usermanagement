import { validationResult } from "express-validator";
import User from "../models/userModel.js"
import Permission from "../models/permissionModel.js";
import UserPermission from "../models/userPermissionModel.js";
import bcrypt from "bcrypt"
import randomstring from "randomstring"
// import { sendMail } from "../helpers/mailer.js";
import mongoose from "mongoose";

export const createUser = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { name, email } = req.body

        const isExist = await User.findOne({
            email
        })

        if(isExist){
            return res.status(400).json({
                success: false,
                msg: 'Email is already exists!'
            })
        }

       const password = randomstring.generate(6)
       const hashedPasword = await bcrypt.hash(password, 10)

       var obj = {
        name,
        email,
        password: hashedPasword
       }

       if(req.body.role && req.body.role == 1){
        return res.status(400).json({
            success: false,
            msg: "You can't create Admin!"
        })
       }
       else if(req.body.role){
        obj.role = req.body.role
       }

       const user = await User( obj )

       const userData = await user.save()

    //    add permission to user if coming in request
    if(req.body.permissions != undefined && req.body.permissions.length > 0){

        const addPermission = req.body.permissions;

        const permissionArray = []

        await Promise.all(addPermission.map( async(permission)=>{

            const permissionData = await Permission.findOne({ _id: permission.id})

            permissionArray.push({
                permission_name: permissionData.permission_name,
                permission_value: permission.value,
            })
        }))

        const userpermission = new UserPermission({
            user_id:userData._id,
            permissions:permissionArray
        })

        await userpermission.save()
        
    }

       console.log(password);

       const content = `
            <p>Hii <b>+${userData.name},</b> Your account is created, below is your details,</p>
            <table style="border-style:none;">
            <tr>
            <th>Name:-</th>
            <td>+${userData.name}+</td>
            </tr>
            <tr>
            <th>Email:-</th>
            <td>+${userData.email}+</td>
            </tr>
            <tr>
            <th>Password:-</th>
            <td>+${userData.password}+</td>
            </tr>
            </table>
            <p>Now you can login your account in Our Application, THanks...</p>
       `

    //    sendMail(userData.email, 'Account Created', content)
       
       return res.status(200).json({
        success: true,
        msg: "User Created Successfull!",
        data: userData
    })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const getUsers = async(req,res) => {
    try {

        console.log(req.user._id);

    //    const users = await User.find({
    //         _id: {
    //             $ne: req.user._id
    //         }
    //     })
    const users = await User.aggregate([
        {
            $match:{
                _id: {
                    $ne: new mongoose.Types.ObjectId(req.user._id)
                }
            }
        },
        {
            $lookup:{
                from:"userpermissions",
                localField: "_id",
                foreignField: "user_id",
                as: "permissions"
            }
        },
        {
            $project:{
                _id: 0,
                name: 1,
                email: 1,
                role: 1,
                permissions: {
                    $cond:{
                        if: { $isArray: "$permissions" },
                        then: { $arrayElemAt: ["$permissions", 0]},
                        else: null
                    }
                }
            }
        },
        {
            $addFields:{
                "permissions":{
                    "permissions": "$permissions.permissions"
                }
            }
        }
    ])
        

        return res.status(200).json({
            success: true,
            msg: "User Fetched Successfull!",
            data: users
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const updateUser = async(req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { id, name, email } = req.body

       const isExist = await User.findOne({
        _id: id
       })

       if(!isExist){
        return res.status(400).json({
            success: false,
            msg:"User not Exist!"
        })
       }

        var updateObj = {
            name,
            email
        }

        if(req.body.role != undefined){
            updateObj.role = req.body.role
        }

        const updateData = await User.findByIdAndUpdate({_id: id},{
            $set: updateObj
        }, {new:true})

        //    add permission to user if coming in request
    if(req.body.permissions != undefined && req.body.permissions.length > 0){

        const addPermission = req.body.permissions;

        const permissionArray = []

        await Promise.all(addPermission.map( async(permission)=>{

            const permissionData = await Permission.findOne({ _id: permission.id})

            permissionArray.push({
                permission_name: permissionData.permission_name,
                permission_value: permission.value,
            })
        }))

        await UserPermission.findOneAndUpdate(
            {user_id: updateData._id},
            {permissions: permissionArray},
            {upsert:true, new:true, setDefaultsOnInsert: true}
        )
        
    }

        return res.status(200).json({
            success: true,
            msg: "User Updated Successfull!",
            data: updateData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const deleteUser = async(req,res) => {
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

        const isExist = await User.findOne({
         _id: id
        })
 
        if(!isExist){
         return res.status(400).json({
             success: false,
             msg:"User not Found!"
         })
        }

        await User.findByIdAndDelete({_id:id})

        return res.status(200).json({
            success: true,
            msg: "User Deleted Successfull!"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}