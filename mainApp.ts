import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import profileRouter from "./router/profile.Router"
import userRouter from "./router/userRouter"
import categoryRouter from "./router/categoryRouter"
import productRouter from "./router/productRouter"
import cartRouter from "./router/cartRouter"
import orderRouter from "./router/orderRouter"




export const mainApp = (app:Application)=>{
    app.use(cors()).use(express.json())
    .use("/api/v1",userRouter)
    .use("/api/v1",profileRouter)
    .use("/api/v1",categoryRouter) 
    .use("/api/v1",cartRouter)
.use("/api/v1",productRouter)
.use("/api/v1",orderRouter)
    .use(morgan("dev"))
    .get("/page/data/:id",(req:any,res:any)=>{
        const id = req.params.id
        const userName = "Linda"
        return res.render("verifyAccount",{userName,id})
    })
    // .get("/api",(req:any,res:any)=>{
    //     res.status(200).json({
    //         message:"api is ready"
    //     })
    // })
}