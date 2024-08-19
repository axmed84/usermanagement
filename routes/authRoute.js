import express from "express"
import { loginValidator, registerValidator } from "../helpers/validator.js"
import { getProfile, getUserPermissionscont, loginUser, registerUser } from "../controllers/authControlller.js"
import verifyToken from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/register', registerValidator, registerUser)
router.post('/login', loginValidator, loginUser)

router.get('/profile', verifyToken, getProfile)

router.get('/refresh-permissions', verifyToken, getUserPermissionscont)

export default router