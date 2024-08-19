import getUserPermissions, { getRouterPermission } from "../helpers/helper.js"
const checkPermission = async(req,res, next) => {
    try {
        // console.log(req.user);

        if(req.user.role != 1){
            
            const routerPermission = await getRouterPermission(req.path, req.user.role)
            const userPermissions = await getUserPermissions(req.user._id)

            if(userPermissions.permissions.permissions == undefined || !routerPermission){
                return res.status(400).json({
                    success: false,
                    msg: "You haven't permission to access this route"
                })
            }

            const permission_name = routerPermission.permission_id.permission_name
            const permission_values = routerPermission.permission; //[1]

            const hasPermission = userPermissions.permissions.permissions.some(permission =>
                permission.permission_name == permission_name &&
                permission.permission_value.some(value => permission_values.includes(value))
             )

             if(!hasPermission){
                return res.status(400).json({
                    success: false,
                    msg: "You haven't permission to access this route"
                })
             }
            }

        return next()
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Something went Wrong'
        })
    }
}

export default checkPermission