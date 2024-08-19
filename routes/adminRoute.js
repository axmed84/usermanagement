import express from 'express'
import { addRouterPermissionValidator, getRouterPermissionValidator, permissionAddValidator, 
    permissionDeleteValidator, 
    permissionGetValidator, 
    permissionUpdateValidator,
    storeRoleValidator, 
    } 
    from '../helpers/adminValidator.js'
import { addPermission, 
    deletePermissions, 
    getPermission, 
    getPermissions, 
    updatePermissions } 
    from '../controllers/admin/permissionController.js'
import verifyToken from '../middlewares/authMiddleware.js'
import onlyAdminAccess from '../middlewares/adminMiddleware.js'
import { getRoles, storeRole } from '../controllers/admin/roleController.js'
import { addRouterPermission, getRouterPermission } from '../controllers/admin/routerController.js'

const router = express()



router.post('/add-permission', verifyToken, onlyAdminAccess, permissionAddValidator, addPermission)
router.get('/get-permissions', verifyToken, onlyAdminAccess, getPermissions)
router.get('/get-permission', permissionGetValidator, onlyAdminAccess, verifyToken, getPermission)
router.post('/delete-permission', verifyToken, onlyAdminAccess, permissionDeleteValidator, deletePermissions)
router.post('/update-permission', verifyToken, onlyAdminAccess, permissionUpdateValidator, updatePermissions)

// role Routes
router.post('/store-role', verifyToken, onlyAdminAccess, storeRoleValidator, storeRole)
router.get('/get-roles', verifyToken, onlyAdminAccess, getRoles)

// router permission routes
router.post('/add-router-permission', verifyToken, onlyAdminAccess, addRouterPermissionValidator, addRouterPermission)
router.get('/get-router-permission', verifyToken, onlyAdminAccess, getRouterPermissionValidator, getRouterPermission)



export default router