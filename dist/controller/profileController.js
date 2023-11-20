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
exports.editImage = exports.updateProfile = void 0;
const profileModel_1 = __importDefault(require("../model/profileModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber, DOB } = req.body;
        const { proId } = req.params;
        const profileU = yield profileModel_1.default.findByIdAndUpdate(req.params.proId, {
            firstName, lastName, phoneNumber, DOB
        }, {
            new: true
        });
        console.log(profileU);
        return res.status(200).json({
            success: 1,
            messagge: "profile updated successfully",
            data: profileU
        });
    }
    catch (error) {
        return res.status(404).json({ message: "profile unable to update" });
    }
});
exports.updateProfile = updateProfile;
const editImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { proId } = req.params;
        console.log(req.file);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log("first", imageUrl);
        const updateImage = yield profileModel_1.default.findByIdAndUpdate(proId, { avatar: imageUrl.secure_url }, { new: true });
        return res.status(201).json({
            success: 1,
            message: "image successfully posted",
            data: updateImage
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to upload image", error });
    }
});
exports.editImage = editImage;
