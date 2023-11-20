"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const Verify_1 = require("../Middleware/Verify");
const router = express_1.default.Router();
router.route("/create-category/:userId").post(Verify_1.verifyToken, categoryController_1.createCategory);
router.route("/all-categories").get(categoryController_1.getAllCategory);
router.route("/singel-cate/:id").get(categoryController_1.singleCategory);
router.route("/delete-category/:id").delete(categoryController_1.deleteCate);
exports.default = router;
