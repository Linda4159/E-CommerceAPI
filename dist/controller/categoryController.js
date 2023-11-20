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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCate = exports.singleCategory = exports.getAllCategory = exports.createCategory = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const slugify_1 = __importDefault(require("slugify"));
function genSlugCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent } = req.body;
        if (!name) {
            return res.status(404).json({ message: "enter category name" });
        }
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const categoryData = yield categoryModel_1.default.create({
            name,
            parent,
            slug: `${(0, slugify_1.default)(name)}-${genSlugCode()}`
        });
        categoryData.user = getUser;
        categoryData.save();
        return res.status(201).json({
            success: 1,
            message: "category created successfully",
            data: categoryData
        });
    }
    catch (error) {
        return res.status(404).json({ message: "category not created", error });
    }
});
exports.createCategory = createCategory;
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield categoryModel_1.default.find().populate({
            path: "user"
        });
        return res.status(200).json({
            success: 1,
            message: "all categories data",
            data: allCategories
        });
    }
    catch (error) {
        return res.status(404).json({ message: "worng endpoint" });
    }
});
exports.getAllCategory = getAllCategory;
const singleCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleCate = yield categoryModel_1.default.findById(req.params.id).populate({
            path: "user",
            select: "userName email"
        });
        const _a = singleCate._doc, { userId } = _a, info = __rest(_a, ["userId"]);
        return res.status(200).json({
            success: 1,
            message: "single item category",
            data: singleCate
        });
    }
    catch (error) {
        return res.status(404).json({ message: "category not found" });
    }
});
exports.singleCategory = singleCategory;
const deleteCate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removeCate = yield categoryModel_1.default.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            success: 1,
            message: "category successfully deleted"
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to delete category", error });
    }
});
exports.deleteCate = deleteCate;
