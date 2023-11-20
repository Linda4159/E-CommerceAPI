import mongoose, { model } from "mongoose";

interface profile{
    firstName :string,
    lastName : string,
    phoneNumber : string
    DOB:string
    avatar:string
}

interface Iprofile extends profile,mongoose.Document{}

const profileSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    DOB:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    avatar:{
        type:String
    }

    
},{
    timestamps:true
})
export default mongoose.model<Iprofile>("profiles",profileSchema)