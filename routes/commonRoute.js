import express from 'express'
import { categoryAddValidator, categoryDeleteValidator, categoryUpdateValidator, postCreateValidator, postDeleteValidator, postUpdateValidator } from '../helpers/adminValidator.js'
import verifyToken from '../middlewares/authMiddleware.js'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js'
import { createPost, deletePost, getPosts, updatePost } from '../controllers/postController.js'
import { createUserrValidator, deleteUserValidator, postLikeCountValidator, postLikeUnlikeValidator, updateUserValidator } from '../helpers/validator.js'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js'
import { postLike, postLikeCount, postUnLike } from '../controllers/likeController.js'
import checkPermission from '../middlewares/checkPermission.js'

const router = express.Router()

router.post('/add-category', verifyToken, checkPermission, categoryAddValidator, addCategory)
router.get('/get-categories', verifyToken, checkPermission, getCategories)
router.post('/delete-category', verifyToken, checkPermission, categoryDeleteValidator, deleteCategory)
router.post('/update-category', verifyToken, checkPermission, categoryUpdateValidator, updateCategory)

// Post Routes
router.post('/create-post', verifyToken, checkPermission, postCreateValidator, createPost)
router.get('/get-posts', verifyToken, checkPermission, getPosts)
router.post('/update-post', verifyToken, checkPermission, postUpdateValidator, updatePost)
router.post('/delete-post', verifyToken, checkPermission, postDeleteValidator, deletePost)

router.post('/create-user', verifyToken, checkPermission, createUserrValidator, createUser)
router.get('/get-users', verifyToken, checkPermission, getUsers)
router.post('/update-user', verifyToken, checkPermission, updateUserValidator, updateUser)
router.post('/delete-user', verifyToken, checkPermission, deleteUserValidator, deleteUser)

// Like & Unloke Routes
router.post('/post-like', verifyToken, checkPermission, postLikeUnlikeValidator, postLike)
router.post('/post-unlike', verifyToken, checkPermission, postLikeUnlikeValidator, postUnLike)
router.post('/post-like-count', verifyToken, checkPermission, postLikeCountValidator, postLikeCount)

export default router