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
exports.checkOut = void 0;
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
const orderModel_1 = __importDefault(require("../model/orderModel"));
const uuid_1 = require("uuid");
const flw = new flutterwave_node_v3_1.default("FLWPUBK_TEST-8fc6de5c51e29fe86261a9d9cb98fe4d-X", "FLWSECK_TEST-155bcb83f529a9586e7017b862d759dc-X");
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const findUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.bill);
        const { card_number, cvv, expiry_month, expiry_year, fullname } = req.body;
        const payload = {
            card_number: card_number,
            cvv: cvv,
            expiry_month: expiry_month,
            expiry_year: expiry_year,
            currency: "NGN",
            amount: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.bill,
            redirect_url: "https://www.google.com",
            fullname: fullname,
            email: "developers@flutterwavego.com",
            phone_number: "09000000000",
            enckey: "FLWSECK_TEST2be12540a7f9",
            tx_ref: (0, uuid_1.v4)(),
        };
        const response = yield flw.Charge.card(payload);
        console.log(response);
        if (response.meta.authorization.mode === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                mode: "pin",
                // "fields": [
                //     "pin"
                // ],
                pin: 3310,
            };
            const reCallCharge = yield flw.Charge.card(payload2);
            // Add the OTP to authorize the transaction
            const callValidate = yield flw.Charge.validate({
                otp: "12345",
                flw_ref: reCallCharge.data.flw_ref,
            });
            console.log(callValidate);
            if (callValidate.status === "success") {
                const createOrder = yield orderModel_1.default.create({
                    user: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.user,
                    orderItem: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.cartItem,
                    bill: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.bill,
                });
                yield cartModel_1.default.findByIdAndDelete({ _id: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart._id });
            }
            return res.status(201).json({
                success: 1,
                message: "payment successful",
                data: "check your order",
            });
        }
        else {
            return res.status(404).json({
                message: "unable to make payment",
            });
        }
        if (response.meta.authorization.mode === 'redirect') {
            var url = response.meta.authorization.redirect;
            open(url);
        }
        console.log(response);
    }
    catch (error) {
        return res.status(404).json({
            success: 0,
            message: "failed to make payment",
            error: error.message,
        });
    }
});
exports.checkOut = checkOut;
