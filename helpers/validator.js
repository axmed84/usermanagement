import { check } from "express-validator"

export const registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is Required').not().isEmpty()
]


export const loginValidator = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is Required').not().isEmpty()
]

export const createUserrValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
]

export const updateUserValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
]

export const deleteUserValidator = [
    check('id', 'id is required').not().isEmpty(),
]

export const postLikeUnlikeValidator = [
    check('user_id', 'user_id is required').not().isEmpty(),
    check('post_id', 'post_id is required').not().isEmpty(),
]

export const postLikeCountValidator = [
    check('post_id', 'post_id is required').not().isEmpty(),
]