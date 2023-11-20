import mongoose from "mongoose";
import express,{Request,Response} from "express"
import userModel from "../model/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import profileModel from "../model/profileModel";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    
  host: "smtp.gmail.com",
  service:"gmail", 
  port: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'poshlindajay@gmail.com',
    pass: 'wvcm hxny bnhv drry'
  }
})

export const createUser = async(req:Request,res:Response):Promise<Response>=>{
try{
    const {userName,email,password,role} = req.body
    if(!userName || !email || !password){
        return res.status(404).json({message:"please fill all fields"})
    }
    const checkEmail = await userModel.findOne({email:email})
    if(checkEmail){
        return res.status(404).json({message:"email already in use"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const registerUser = await  userModel.create({
        userName,
        email,
        password:hashPassword,
        role,
        
})

const createProfile:any= await profileModel.create({
    _id:registerUser._id,
    firstName:"",
    lastName:"",
    DOB:"",
    avatar:""
})

registerUser.profile = createProfile._id
registerUser.save()

createProfile.user = registerUser._id
createProfile.save()


let mailOption = {
    
        from: '"Glamz Store 💕 👻" <noreply@posh.com>', // sender address
        to: email, // list of receivers
        subject: "Glamz Store", // Subject line
        html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:2222/api/v1/verify-account/${registerUser._id}"/>link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
}
await transporter.sendMail(mailOption,(error:any,info:any)=>{
    if(error){
        console.log("eeror sending mail",error)
    }else{
        console.log("email send",info.response)
    }
})

return res.status(201).json({
    success:1,
    message:"registration successful check email to verify account",
    data:registerUser,
    profile:createProfile
})
}catch(error){
    return res.status(404).json({message:"registration failed"})
}
}

export const loginUser = async(req:Request,res:Response):Promise<Response>=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).json({message:"please fill all fields"})
        }
        const checkEmail:any = await userModel.findOne({email:email})
        if(checkEmail){
        const checkPassword = await bcrypt.compare(password,checkEmail?.password)
        if(checkPassword){
            if(checkEmail.verify){
 const token = jwt.sign({_id:checkEmail?._id,userName:checkEmail?.userName, role:checkEmail.role},"mynameisjoanbadmus",{expiresIn:"40m"})
            console.log("fave",token)
            const {password,...info} = checkEmail._doc
            res.cookie("sessionId",token)
            console.log(req.headers["cookie"])
            return res.status(201).json({
                success:1,
                message:"login successful",
                data:{info,token}
            })
            }else{
                let mailOption = {
    
                    from: '"Glamz Store 💕 👻" <noreply@posh.com>', // sender address
                    to: email, // list of receivers
                    subject: "Glamz Store", // Subject line
                    html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:2222/api/v1/verify-account/${checkEmail._id}"/>link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
            }
            await transporter.sendMail(mailOption,(error:any,info:any)=>{
                if(error){
                    console.log("eeror sending mail",error)
                }else{
                    console.log("email send",info.response)
                }
            })
            return res.status(404).json({message:"please check your email to verify account"})
            }
           
        }else{
return res.status(404).json({message:"incorrect password"})
        }
        }else{
            return res.status(404).json({message:"user not found"})
        }
     }catch(error){
        return res.status(404).json({message:"login failed"})
    }
}

export const getSingleUser = async(req:Request,res:Response):Promise<Response>=>{
    try{
const getSingle = await userModel.findById(req.params.id).populate(
    {
        path:"profile",
        select:"firstName lastName DOB"
    }
)
return res.status(200).json({
    success:1,
    message:"single data",
    data: getSingle
})
    }catch(error){
        return res.status(404).json({message:"failed to retrieve this user"})
    }
}

export const getAllUsers = async(req:Request,res:Response):Promise<Response>=>{
    try{
        const allUsers = await userModel.find().populate(
            {
                path:"profile",
                select: "firstName lastName DOB"
            }
        )
        return res.status(200).json({
            success:1,
            message:"all users data",
            data:allUsers
        })

    }catch(error){
        return res.status(404).json({message:"failed to get all users"})
    }
}

export const logOut = async(req:Request,res:Response):Promise<Response>=>{
    try{
res.clearCookie("sessionId")
return res.status(200).json({
    success:1,
    message:"logout successful"
})
    }catch(error){
        return res.status(404).json({message:"failed to logout user"})
    }
}

export const verifyUser = async(req:Request,res:Response)=>{
    try {
        const user = await userModel.findById(req.params.id)
        console.log(user)

        const verifyData = await userModel.findByIdAndUpdate(
            req.params.id,
            {verify:true},
            {new:true}
        )
        return res.status(201).json({message:"account has been verify, processd to login"})
    } catch (error:any) {
        return res.status(404).json({
            error:error.message
        })
    }
}
// export const createProfile = async(req:Request,res:Response):Promise<Response>=>{
//     try{
// const {firstName,lastName,phoneNumber,DOB} = req.body
// const userProfile = await profileModel.create({
//     firstName,
//     lastName,
//     phoneNumber,
//     DOB,
// })
// const addProfile = await userModel.findByIdAndUpdate(req.params.id,{$set:{profile:userProfile._id}},{new:true})
// await addProfile?.save()
// return res.status(201).json({
//     success:1,
//     message:"profile successfully created",
//     data:userProfile
// })
//     }catch(error){
//         return res.status(404).json({message:"unable to create profile"})
//     }
// }