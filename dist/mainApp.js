"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const profile_Router_1 = __importDefault(require("./router/profile.Router"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const mainApp = (app) => {
    app.use((0, cors_1.default)()).use(express_1.default.json())
        .use("/api/v1", userRouter_1.default)
        .use("/api/v1", profile_Router_1.default)
        .use("/api/v1", categoryRouter_1.default)
        .use("/api/v1", cartRouter_1.default)
        .use("/api/v1", productRouter_1.default)
        .use("/api/v1", orderRouter_1.default)
        .use((0, morgan_1.default)("dev"))
        .get("/page/data/:id", (req, res) => {
        const id = req.params.id;
        const userName = "Linda";
        return res.render("verifyAccount", { userName, id });
    });
    // .get("/api",(req:any,res:any)=>{
    //     res.status(200).json({
    //         message:"api is ready"
    //     })
    // })
};
exports.mainApp = mainApp;
