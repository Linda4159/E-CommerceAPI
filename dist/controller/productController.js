"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSingleProduct = exports.ViewAllProduct = exports.createProduct = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, qty, price, category } = req.body;
        console.log("this is the payload data", req.user._id);
        // if(!name || !desc || !qty || !price || !category){
        //     return res.status(404).json({message:"fill all fields"})
        // }
        const { catId } = req.params;
        // console.log(catId)
        const getCate = yield categoryModel_1.default.findOne({ _id: catId });
        // console.log(getCate)
        const { userId } = req.params;
        // console.log(userId)
        const getUser = yield userModel_1.default.findOne({ _id: req.user.id });
        // console.log(getUser)
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        // console.log(imageUrl)
        if (req.user.role === "admin") {
            const dataProduct = yield productModel_1.default.create({
                name,
                desc,
                qty,
                price,
                category,
                image: imageUrl.secure_url
            });
            console.log(dataProduct);
            getCate.products.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
            getCate.save();
            dataProduct.createdBy = getUser;
            dataProduct.save();
            return res.status(201).json({
                success: 1,
                message: "product successfully created",
                data: dataProduct
            });
        }
        else {
            return res.status(201).json({
                message: "only admin can post"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "failed to create product",
            error: error.message
        });
    }
});
exports.createProduct = createProduct;
const ViewAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchProduct = yield productModel_1.default.find();
        return res.status(200).json({
            message: "successfull",
            data: fetchProduct,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "an error occured",
        });
    }
});
exports.ViewAllProduct = ViewAllProduct;
const ViewSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchProduct = yield productModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "successfull",
            data: fetchProduct,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "an error occured",
        });
    }
});
exports.ViewSingleProduct = ViewSingleProduct;
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
