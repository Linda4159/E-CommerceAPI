import "./database/database"
import mongoose from "mongoose";
import express,{Application} from "express"
import { mainApp } from "./mainApp";


const port:number = 2222

const app:Application = express()
mainApp(app)

app.set("view engine","ejs")

const server = app.listen(port,()=>{
    console.log("this port is listening on",port)
})

process.on("uncaughtException",(error)=>{
    console.log("stop: an error occured here",error)
    process.exit(1)
})
process.on("unhandledRejection",(reason)=>{
    console.log("hold: there is an error here")
    console.log(reason)

    server.close(()=>{
        process.exit(1)
    })
    
})
