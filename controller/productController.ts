import express,{Request,Response} from "express"
import cloudinary from "../utils/cloudinary"
import mongoose from "mongoose"
import categoryModel from "../model/categoryModel"
import userModel from "../model/userModel"
import productModel from "../model/productModel"

export const createProduct =async(req:any,res:Response)=>{
    try{
const {name,desc,qty,price,category} = req.body
console.log("this is the payload data",req.user._id)
// if(!name || !desc || !qty || !price || !category){
//     return res.status(404).json({message:"fill all fields"})
// }
const {catId} = req.params
// console.log(catId)

const getCate:any = await categoryModel.findOne({_id:catId})
// console.log(getCate)

const {userId} = req.params
// console.log(userId)

const getUser = await userModel.findOne({_id:req.user.id})
// console.log(getUser)

const imageUrl = await cloudinary.uploader.upload(req.file.path)
// console.log(imageUrl)
if(req.user.role === "admin"){
    const dataProduct:any = await productModel.create({
        name,
        desc,
        qty,
        price,
        category,
        image:imageUrl.secure_url
    })
    console.log(dataProduct)
    getCate.products.push(new mongoose.Types.ObjectId(dataProduct._id))
    getCate.save()
    
    dataProduct.createdBy = getUser
    dataProduct.save() 
    
    return res.status(201).json({
        success:1,
        message:"product successfully created",
        data:dataProduct
    })
}else{
    return res.status(201).json({
        message:"only admin can post"
    })
}


    }catch(error:any){
        return res.status(404).json({
            message:"failed to create product",
        error:error.message
    })
    }
}


export const ViewAllProduct = async (req: Request, res: Response) => {
try {
    const fetchProduct = await productModel.find();
    return res.status(200).json({
        message: "successfull",
        data: fetchProduct,
    });
} catch (err) {
    return res.status(404).json({
        message: "an error occured",
    });
}
};



export const ViewSingleProduct = async (req: Request, res: Response) => {
try {
    const fetchProduct = await productModel.findById(req.params.id);
    return res.status(200).json({
        message: "successfull",
        data: fetchProduct,
    });
} catch (err) {
    return res.status(404).json({
        message: "an error occured",
    });
}
};

// export const productImage = async(req:any,res:Response):Promise<Response>=>{
//     try{
//         const {userId} = req.params
// console.log(userId)

// const getUser = await userModel.findOne({_id:userId})
// console.log(getUser)

// const {prodId} = req.params
// console.log(req.file)
// const imageUrl = await cloudinary.uploader.upload(req.file.path)
// console.log("first",imageUrl)
// const updateImage = await productModel.findByIdAndUpdate(
//     prodId,
//     {image :imageUrl.secure_url},
//     {new:true}
// )
// return res.status(201).json({
//     success:1,
//     message:"image successfully posted",
//     data:updateImage , getUser
// })
//     }catch(error){
//         return res.status(404).json({message:"failed to upload image",error})
//     }
// }