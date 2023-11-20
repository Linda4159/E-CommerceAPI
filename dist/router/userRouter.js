"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.route("/create-user").post(UserController_1.createUser);
router.route("/login-user").post(UserController_1.loginUser);
router.route("/single-profile/:id").get(UserController_1.getSingleUser);
router.route("/all-users").get(UserController_1.getAllUsers);
router.route("/logout-user").get(UserController_1.logOut);
router.route("/verify-account/:id").get(UserController_1.verifyUser);
exports.default = router;
