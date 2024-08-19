import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"
import Permission from "../models/permissionModel.js"
import UserPermission from '../models/userPermissionModel.js'
import getUserPermissions from '../helpers/helper.js'
import { validationResult } from "express-validator"

export const registerUser = async (req,res) => {
    try {
        
       const errors = validationResult(req);

       if(!errors.isEmpty()){
        return res.status(200).json({
            success: false,
            msg:"Errors",
            errors: errors.array()
        })
       }

       const { name, email, password } = req.body

       const isExistUser = await User.findOne({ email })
       if(isExistUser){
        return res.status(200).json({
            success: false,
            msg:"Email already exists!",
        })
       }

      const hashedPassword = await bcrypt.hash(password, 10)

     const user = new User({
        name,
        email,
        password:hashedPassword
      })

      const userData = await user.save()

    //   Assign default permissions
    const defaultPermissions = await Permission.find({
        is_default: 1
    })

    if(defaultPermissions.length > 0){

        const permissionArray = [];
        defaultPermissions.forEach(permission => {
            permissionArray.push({
                permission_name:permission.permission_name,
                permission_value:[0,1,2,3]
            })
        })

       const userPermission = new UserPermission({
            user_id:userData._id,
            permissions:permissionArray
       })

       await userPermission.save()
    }

      return res.status(200).json({
        success: true,
        msg: "Registered succesfully",
        data: userData
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}

const generateAccessToken = async(user) => {
   const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn:"2h"})
   return token;
}

export const loginUser = async (req,res) => {
    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
         return res.status(200).json({
             success: false,
             msg:"Errors",
             errors: errors.array()
         })
        }

        const { email, password } = req.body

       const userData = await User.findOne({ email })

       if(!userData){
        return res.status(400).json({
            success: false,
            msg: 'Email & Password is incorrect!'
        })
    }
       
    const isPasswordMatch = await bcrypt.compare(password, userData.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            success: false,
            msg: 'Email & Password is incorrect!'
        })
    }

    const accessToken = await generateAccessToken({ user: userData })

    //  get user data with all permissions

    const result = await User.aggregate([
        {
            $match:{email:userData.email}
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
        msg: 'Login Successfully!',
        accessToken: accessToken,
        tokenType: 'Bearer',
        data: result[0]
    })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}


export const getProfile = async (req,res) => {
    try {

        const user_id = req.user._id
        const userData = await User.findOne({_id:user_id})
        
        return res.status(200).json({
            success: true,
            msg: 'Profile Data',
            data: userData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}
export const getUserPermissionscont = async (req,res) => {
    try {

        const user_id = req.user._id

        const userPermissions = await getUserPermissions(user_id)
        
        return res.status(200).json({
            success: true,
            msg: 'User Permissions',
            data: userPermissions
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        })
    }
}