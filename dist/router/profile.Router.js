"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controller/profileController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.route("/edit/pro/:proId").put(profileController_1.updateProfile);
router.route("/edit/pro-Img/:proId").put(multer_1.upload, profileController_1.editImage);
exports.default = router;
