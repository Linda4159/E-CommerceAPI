import mongoose from "mongoose";

interface category{
    name:string,
    slug:string,
    parent:string,
    user:{},
    products:{}[]
}
interface Icategory extends category, mongoose.Document{}

const categorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    slug:{
type:String
    },
    parent:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    }
    ]
},{
    timestamps:true
})

export default mongoose.model<Icategory>("category",categorySchema)