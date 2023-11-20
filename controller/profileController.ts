import express,{Request,Response} from "express"
import profileModel from "../model/profileModel"
import cloudinary from "../utils/cloudinary"



export const updateProfile = async(req:Request,res:Response):Promise<Response>=>{
    try{
const{firstName,lastName,phoneNumber,DOB} = req.body
const {proId} = req.params
const profileU= await profileModel.findByIdAndUpdate(
    req.params.proId,
    {
        firstName,lastName,phoneNumber,DOB
    },
    {
        new:true
    }
)

    console.log(profileU)
    return res.status(200).json({
        success:1,
        messagge:"profile updated successfully",
        data: profileU
    })
    }catch(error){
        return res.status(404).json({message:"profile unable to update"})
    }
}

export const editImage = async(req:any,res:Response):Promise<Response>=>{
    try{
const {proId} = req.params
console.log(req.file)
const imageUrl = await cloudinary.uploader.upload(req.file.path)
console.log("first",imageUrl)
const updateImage = await profileModel.findByIdAndUpdate(
    proId,
    {avatar :imageUrl.secure_url},
    {new:true}
)
return res.status(201).json({
    success:1,
    message:"image successfully posted",
    data:updateImage
})
    }catch(error){
        return res.status(404).json({message:"failed to upload image",error})
    }
}