import express, { Request, Response } from "express";
import productModel from "../model/productModel";
import cartModel from "../model/cartModel";
import userModel from "../model/userModel";

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

export const addToCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { prodId } = req.params;
    const { userId } = req.params;

    const getUser = await userModel.findOne({ _id: userId });
    // console.log(getUser);

    const getProduct: any = await productModel.findOne({ _id: prodId });
    // console.log(getProduct);

    const checkUserCart: any = await cartModel.findOne({ user: userId });
    console.log("love", checkUserCart);
    if (checkUserCart) {
      const findIndexProduct = checkUserCart.cartItem.findIndex((item: any) =>
        item?.products?.equals(prodId)
      );
      console.log("first", findIndexProduct);

      if (findIndexProduct > -1) {
        const selectProduct = checkUserCart.cartItem[findIndexProduct];
        console.log("second", selectProduct);
        selectProduct.quantity += 1;

        checkUserCart.bill = checkUserCart.cartItem.reduce(
          (acc: any, curr: any) => {
            console.log(curr);
            return acc + curr.quantity * curr.price;
          },
          0
        );

        checkUserCart.cartItem[findIndexProduct] = selectProduct;
        await checkUserCart.save();

        return res.status(201).json({
          message: "you already placed an order",
          data: checkUserCart,
        });
      } else {
        checkUserCart.cartItem.push({
          products: getProduct?._id,
          quantity: 1,
          price: getProduct?.price,
        });
        await checkUserCart.save();
        checkUserCart.bill = checkUserCart.cartItem.reduce(
          (acc: any, curr: any) => {
            console.log(curr);
            return acc + curr.quantity * curr.price;
          },
          0
        );
        return res.status(201).json({
          success: 1,
          message: "new product successfully added",
          data: checkUserCart,
        });
      }
    } else {
      const cartData = await cartModel.create({
        user: getUser?._id,
        cartItem: [
          { products: getProduct?._id, quantity: 1, price: getProduct?.price },
        ],
        bill: 1 * getProduct?.price,
      });
      return res.status(201).json({
        success: 1,
        message: "successfully added to your cart",
        data: cartData,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      success: 0,
      message: "unable to add to cart",
      error: error.message,
    });
  }
};

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

export const removeCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    let productId = req.query.productId;
    console.log(productId);

    const checkUserCart: any = await cartModel.findOne({ user: userId });
    console.log(checkUserCart);

    const position = await checkUserCart?.cartItem?.findIndex(
      (item: any) => item?.products == productId
    );
    console.log("second", position);

    if (checkUserCart) {
      const checkItem = checkUserCart.cartItem[position];
      console.log(checkItem);

      if(checkItem > 1){
        checkItem.quantity -= 1
        checkUserCart.bill -= checkItem.price
      }else{ 
        checkUserCart.bill -= checkItem.quantity * checkItem.price;

        if (checkUserCart < 0) {
          checkUserCart.bill = 0;
        }
  
        checkUserCart.cartItem.splice(position, 1);
      }


      checkUserCart.bill = checkUserCart.cartItem.reduce(
        (acc: any, curr: any) => {
          console.log(curr);
          return acc + curr.quantity * curr.price;
        }
      );
      await checkUserCart.save();
      return res.status(201).json({
        message: "item has been removed from cart",
      });
    } else {
      return res
        .status(404)
        .json({ mesage: "you don't have this item on your cart" });
    }
  } catch (error: any) {
    return res.status(404).json({
      success: 0,
      message: "failed to remove item from cart",
      error: error.message,
    });
  }
};
