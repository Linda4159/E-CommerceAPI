import mongoose from "mongoose";

interface users{
    userName :string,
    email:string
    password : string,
    profile : object,
    verify:boolean
    role:string
}

interface Iusers extends users,mongoose.Document{}

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        

    },
    password:{
        type:String,
    },
    role:{
type:String,
enum:["user","admin","superadmin"],
default:"user"
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"profiles"
    },
    verify:{
        type:Boolean,
        default:false
    }
},{
   timestamps:true 
})

export default mongoose.model<Iusers>("users",userSchema)