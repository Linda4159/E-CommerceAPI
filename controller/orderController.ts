import express, { Request, Response } from "express";
import flutterwave from "flutterwave-node-v3";
import cartModel from "../model/cartModel";
import orderModel from "../model/orderModel";
import {v4 as uuidv4} from "uuid"

const flw = new flutterwave(
  "FLWPUBK_TEST-8fc6de5c51e29fe86261a9d9cb98fe4d-X",
  "FLWSECK_TEST-155bcb83f529a9586e7017b862d759dc-X"
);

export const checkOut = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const findUserCart = await cartModel.findOne({ user: userId });
    console.log(findUserCart?.bill);

    const { card_number, cvv, expiry_month, expiry_year, fullname } = req.body;
    const payload = {
      card_number: card_number,
      cvv: cvv,
      expiry_month: expiry_month,
      expiry_year: expiry_year,
      currency: "NGN",
      amount: findUserCart?.bill,
      redirect_url: "https://www.google.com",
      fullname: fullname,
      email: "developers@flutterwavego.com",
      phone_number: "09000000000",
      enckey: "FLWSECK_TEST2be12540a7f9",
      tx_ref: uuidv4(),
    };
    const response = await flw.Charge.card(payload);
    console.log(response);
    if (response.meta.authorization.mode === "pin") {
      let payload2: any = payload;
      payload2.authorization = {
        mode: "pin",
        // "fields": [
        //     "pin"
        // ],
        pin: 3310,
      };
      const reCallCharge = await flw.Charge.card(payload2);

      // Add the OTP to authorize the transaction
      const callValidate = await flw.Charge.validate({
        otp: "12345",
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);

      if (callValidate.status === "success") {

        const createOrder = await orderModel.create({
          user: findUserCart?.user,
          orderItem: findUserCart?.cartItem,
          bill: findUserCart?.bill,
        });
        
        await cartModel.findByIdAndDelete({ _id: findUserCart?._id });
      }

      return res.status(201).json({
        success: 1,
        message: "payment successful",
        data: "check your order",
      });
    } else {
      return res.status(404).json({
        message: "unable to make payment",
      });
    }
    if (response.meta.authorization.mode === 'redirect') {

        var url = response.meta.authorization.redirect
        open(url)
    }

    console.log(response)

  } catch (error: any) {
    return res.status(404).json({
      success: 0,
      message: "failed to make payment",
      error: error.message,
    });
  }
};
