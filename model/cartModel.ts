import mongoose from "mongoose";


interface cart {
    user:string
    cartItem: object[]
    bill:number
}
interface Icart extends cart,mongoose.Document{}

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    cartItem:[{
        products:{type:mongoose.Schema.Types.ObjectId, ref:"products"},
        quantity:{type:Number,default:1,min:1},
        price:{type:Number}
    }],
    bill:{
        type:Number,
        default:0
    }
})

export default mongoose.model<Icart>("cart",cartSchema)