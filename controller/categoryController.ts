import express,{Request,Response} from "express"
import userModel from "../model/userModel"
import categoryModel from "../model/categoryModel"
import slugify from "slugify"

function genSlugCode(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const length = 6
    let randomId = ""
    for(let i =0; i<length; i++){
        randomId += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomId
}


export const createCategory = async(req:Request, res:Response)=>{
    try{
const {name,parent} = req.body
if(!name){
    return res.status(404).json({message:"enter category name"})
}
const {userId} = req.params
console.log(userId)
const getUser = await userModel.findOne({_id:userId})
console.log(getUser)

const categoryData:any = await categoryModel.create({
    name,
    parent,
slug:`${slugify(name)}-${genSlugCode()}`
})
categoryData.user = getUser
categoryData.save()


return res.status(201).json({
    success:1,
    message:"category created successfully",
    data:categoryData
})
    }catch(error){
        return res.status(404).json({message:"category not created",error})
    }
}

export const getAllCategory = async(req:Request,res:Response)=>{
    try{
const allCategories = await categoryModel.find().populate(
    {
        path:"user"
    }
)
return res.status(200).json({
    success:1,
    message:"all categories data",
    data:allCategories
})
    }catch(error){
        return res.status(404).json({message:"worng endpoint"})
    }
}

export const singleCategory = async(req:Request,res:Response)=>{
    try{
const singleCate:any = await categoryModel.findById(req.params.id).populate(
    {
        path:"user",
        select:"userName email"
    
    }
)
const {userId , ...info} = singleCate._doc

return res.status(200).json({
    success:1,
    message:"single item category",
    data:singleCate
})
    }catch(error){
        return res.status(404).json({message:"category not found"})
    }
}

export const deleteCate = async(req:Request,res:Response)=>{
    try{
const removeCate = await categoryModel.findByIdAndRemove(req.params.id)
return res.status(200).json({
    success:1,
    message:"category successfully deleted"

})
    }catch(error){
        return res.status(404).json({message:"failed to delete category",error})
    }
}
