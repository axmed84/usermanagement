import mongoose from 'mongoose';
import User from '../models/userModel.js'
import RouterPermission from '../models/routerPermissionModel.js';

const getUserPermissions = async(user_id) => {
    try {

        const user = await User.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(user_id)
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
        
        return user[0]
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export const getRouterPermission = async(router, role) => {
    try {

        const routerPermission = await RouterPermission.findOne({
            router_endpoint: router,
            role
        }).populate('permission_id')

        return routerPermission
        
    } catch (error) {
        console.log(error.message);
        return null
        
    }
}

export default getUserPermissions