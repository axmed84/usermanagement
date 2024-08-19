import { check } from "express-validator"

export const permissionAddValidator = [
    check('permission_name', 'permission_name is Required').not().isEmpty()
]
export const permissionGetValidator = [
    check('id', 'ID is Required').not().isEmpty()
]
export const permissionDeleteValidator = [
    check('id', 'id is Required').not().isEmpty()
]
export const permissionUpdateValidator = [
    check('id', 'ID is Required').not().isEmpty(),
    check('permission_name', 'permission_name is Required').not().isEmpty()
]
export const categoryAddValidator = [
    check('category_name', 'category name is Required').not().isEmpty(),
]
export const categoryDeleteValidator = [
    check('id', 'id is Required').not().isEmpty(),
]
export const categoryUpdateValidator = [
    check('id', 'id is Required').not().isEmpty(),
    check('category_name', 'category_name is Required').not().isEmpty(),
]

export const postCreateValidator = [
    check('title', 'title is Required').not().isEmpty(),
    check('description', 'description is Required').not().isEmpty()
]
export const postUpdateValidator = [
    check('id', 'id is Required').not().isEmpty(),
    check('title', 'title is Required').not().isEmpty(),
    check('description', 'description is Required').not().isEmpty()
]
export const postDeleteValidator = [
    check('id', 'id is Required').not().isEmpty(),
]
export const storeRoleValidator = [
    check('role_name', 'role_name is Required').not().isEmpty(),
    check('value', 'value is Required').not().isEmpty(),
]
export const addRouterPermissionValidator = [
    check('router_endpoint', 'router_endpoint is Required').not().isEmpty(),
    check('role', 'role is Required').not().isEmpty(),
    check('permission_id', 'permission_id is Required').not().isEmpty(),
    check('permission', 'permission is must be an array').isArray(),
]
export const getRouterPermissionValidator = [
    check('router_endpoint', 'router_endpoint is Required').not().isEmpty(),
]