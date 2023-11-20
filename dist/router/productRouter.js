"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const multer_1 = require("../utils/multer");
const Verify_1 = require("../Middleware/Verify");
const router = express_1.default.Router();
router.route("/create-product/:userId/:catId").post(Verify_1.verifyToken, multer_1.uploads, productController_1.createProduct);
router.route("/singleProduct/:id").get(productController_1.ViewSingleProduct);
router.route("/all-Products").get(productController_1.ViewAllProduct);
exports.default = router;
