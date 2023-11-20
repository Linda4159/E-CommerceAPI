import mongoose from "mongoose";

interface products{
    name:string
    image:string
    desc:string
    qty:number
    price:string
    category:string
    createdBy:{}
}
interface Iproduct extends products,mongoose.Document{}

const productcSchema = new mongoose.Schema({
name:{
    type:String
},
image:{
    type:String
},
desc:{
    type:String
},
qty:{
    type:Number
},
price:{
    type:Number
},
category:{
    type:String
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
createdAt:{
    type:String || Number,
    default:new Date()
}
})

export default mongoose.model<Iproduct>("products",productcSchema)