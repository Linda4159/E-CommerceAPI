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
exports.removeCartItem = exports.addToCart = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
// export const addToCart = async(req:Request,res:Response):Promise<Response>=>{
//     try{
//         const{quantityValue} = req.body
// const userId= req.params.userId
// console.log(userId)
// const prodId = req.params.prodId
// console.log(prodId)
// const checkProduct:any = await productModel.findOne({_id:prodId})
// console.log(checkProduct)
// const checkUser = await userModel.findOne({_id:userId})
// console.log(checkUser)
// if(!checkProduct){
//     return res.status(404).json({message:"product not found"})
// }
// const quantity:any = quantityValue || 1
// const price = checkProduct?. price * quantity
//  const cartData = await cartModel.create({
// user:userId,
// cartItem:[{products:prodId,quantity,price}],
// bill:price * quantity
//  })
// return res.status(201).json({
//     success:1,
//     result: cartData
// })
//     }catch(error){
//         return res.status(404).json({message:"unable to add items",error})
//     }
// }
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prodId } = req.params;
        const { userId } = req.params;
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        // console.log(getUser);
        const getProduct = yield productModel_1.default.findOne({ _id: prodId });
        // console.log(getProduct);
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log("love", checkUserCart);
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartItem.findIndex((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.products) === null || _a === void 0 ? void 0 : _a.equals(prodId); });
            console.log("first", findIndexProduct);
            if (findIndexProduct > -1) {
                const selectProduct = checkUserCart.cartItem[findIndexProduct];
                console.log("second", selectProduct);
                selectProduct.quantity += 1;
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc, curr) => {
                    console.log(curr);
                    return acc + curr.quantity * curr.price;
                }, 0);
                checkUserCart.cartItem[findIndexProduct] = selectProduct;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "you already placed an order",
                    data: checkUserCart,
                });
            }
            else {
                checkUserCart.cartItem.push({
                    products: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id,
                    quantity: 1,
                    price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price,
                });
                yield checkUserCart.save();
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc, curr) => {
                    console.log(curr);
                    return acc + curr.quantity * curr.price;
                }, 0);
                return res.status(201).json({
                    success: 1,
                    message: "new product successfully added",
                    data: checkUserCart,
                });
            }
        }
        else {
            const cartData = yield cartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartItem: [
                    { products: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price },
                ],
                bill: 1 * (getProduct === null || getProduct === void 0 ? void 0 : getProduct.price),
            });
            return res.status(201).json({
                success: 1,
                message: "successfully added to your cart",
                data: cartData,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            success: 0,
            message: "unable to add to cart",
            error: error.message,
        });
    }
});
exports.addToCart = addToCart;
// export const removeFromCart = async(req:Request,res:Response):Promise<Response>=>{
//     try {
//       const {userId} = req.params
//       const productId = req.params.productId
//       const a = "world"
//       console.log(`dash ${a}`)
//       let cart:any = await cartModel.findOne({user:userId})
//       console.log(cart)
//       const position = cart?.cartItem.findIndex((item:any)=>item.product == productId)
//       console.log(position)
//       if(position >- 1){
//         let item = cart?.cartItem[position]
//         if(item.quantity > 1){
//             item.quantity -= 1
//             cart.bill -= item.price
//         }else{
//             cart.bill -= item.quantity * item.price
//             if(cart.bill < 0){
//                 cart.bill = 0
//             }
//             cart?.cartItem.splice(position,1)
//         }
//         cart.bill = cart.cartItem.reduce((acc:any,curr:any)=>{
//             console.log(curr)
//             return acc + curr.quantity * curr.price
//         },0)
//         cart = await cart.save()
//         return res.status(201).json({
//             message:"successfully removed from cart"
//         })
//       }else{
//         return res.status(404).json({message:"items not"})
//       }
//     } catch (error:any) {
//         return res.status(404).json({
//             success:0,
//             message:"faile to remove item",
//             error:error.message
//         })
//     }
// }
const removeCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        let productId = req.query.productId;
        console.log(productId);
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        const position = yield ((_a = checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItem) === null || _a === void 0 ? void 0 : _a.findIndex((item) => (item === null || item === void 0 ? void 0 : item.products) == productId));
        console.log("second", position);
        if (checkUserCart) {
            const checkItem = checkUserCart.cartItem[position];
            console.log(checkItem);
            if (checkItem > 1) {
                checkItem.quantity -= 1;
                checkUserCart.bill -= checkItem.price;
            }
            else {
                checkUserCart.bill -= checkItem.quantity * checkItem.price;
                if (checkUserCart < 0) {
                    checkUserCart.bill = 0;
                }
                checkUserCart.cartItem.splice(position, 1);
            }
            checkUserCart.bill = checkUserCart.cartItem.reduce((acc, curr) => {
                console.log(curr);
                return acc + curr.quantity * curr.price;
            });
            yield checkUserCart.save();
            return res.status(201).json({
                message: "item has been removed from cart",
            });
        }
        else {
            return res
                .status(404)
                .json({ mesage: "you don't have this item on your cart" });
        }
    }
    catch (error) {
        return res.status(404).json({
            success: 0,
            message: "failed to remove item from cart",
            error: error.message,
        });
    }
});
exports.removeCartItem = removeCartItem;
