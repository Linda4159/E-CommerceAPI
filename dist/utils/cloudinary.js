"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "duavu94l2",
    api_key: "364348213316947",
    api_secret: "pBZTOCp5v_TW3bcdsrwR2TcQcTQ"
});
exports.default = cloudinary;
