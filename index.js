import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js";
import adminRouter from "./routes/adminRoute.js";
import commonRouter from "./routes/commonRoute.js";
import verifyToken from "./middlewares/authMiddleware.js";
import onlyAdminAccess from "./middlewares/adminMiddleware.js";
import { getAllRoutes } from "./controllers/admin/routerController.js";

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("Disconnected", ()=>{
    console.log("MongoDB is Disconnected");
})
mongoose.connection.on("Connected", ()=>{
    console.log("MongoDB is Connected");
})

app.use(express.json())



app.use('/api', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api', commonRouter)

app.get('/api/admin/all-routes', verifyToken, onlyAdminAccess, getAllRoutes)



app.listen(3000, ()=>{
    connect()
    console.log("Backend Connected on Port:- "+3000);
})

