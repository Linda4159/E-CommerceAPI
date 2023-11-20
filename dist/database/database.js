"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://0.0.0.0:27017/Classword";
const onlineUrl = "mongodb+srv://poshlindajay:jFpGmIG56Jq4x2Qk@cluster0.7pizula.mongodb.net/Ecommerce";
mongoose_1.default.connect(onlineUrl).then(() => {
    console.log("connection has been made");
}).catch((error) => {
    console.log(error, "error in database connection");
});
exports.default = mongoose_1.default;
