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
exports.verifyUser = exports.logOut = exports.getAllUsers = exports.getSingleUser = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profileModel_1 = __importDefault(require("../model/profileModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'poshlindajay@gmail.com',
        pass: 'wvcm hxny bnhv drry'
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) {
            return res.status(404).json({ message: "please fill all fields" });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        if (checkEmail) {
            return res.status(404).json({ message: "email already in use" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const registerUser = yield userModel_1.default.create({
            userName,
            email,
            password: hashPassword,
            role,
        });
        const createProfile = yield profileModel_1.default.create({
            _id: registerUser._id,
            firstName: "",
            lastName: "",
            DOB: "",
            avatar: ""
        });
        registerUser.profile = createProfile._id;
        registerUser.save();
        createProfile.user = registerUser._id;
        createProfile.save();
        let mailOption = {
            from: '"Glamz Store 💕 👻" <noreply@posh.com>',
            to: email,
            subject: "Glamz Store",
            html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:2222/api/v1/verify-account/${registerUser._id}"/>link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
        };
        yield transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("eeror sending mail", error);
            }
            else {
                console.log("email send", info.response);
            }
        });
        return res.status(201).json({
            success: 1,
            message: "registration successful check email to verify account",
            data: registerUser,
            profile: createProfile
        });
    }
    catch (error) {
        return res.status(404).json({ message: "registration failed" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "please fill all fields" });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        if (checkEmail) {
            const checkPassword = yield bcrypt_1.default.compare(password, checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.password);
            if (checkPassword) {
                if (checkEmail.verify) {
                    const token = jsonwebtoken_1.default.sign({ _id: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail._id, userName: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.userName, role: checkEmail.role }, "mynameisjoanbadmus", { expiresIn: "40m" });
                    console.log("fave", token);
                    const _a = checkEmail._doc, { password } = _a, info = __rest(_a, ["password"]);
                    res.cookie("sessionId", token);
                    console.log(req.headers["cookie"]);
                    return res.status(201).json({
                        success: 1,
                        message: "login successful",
                        data: { info, token }
                    });
                }
                else {
                    let mailOption = {
                        from: '"Glamz Store 💕 👻" <noreply@posh.com>',
                        to: email,
                        subject: "Glamz Store",
                        html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:2222/api/v1/verify-account/${checkEmail._id}"/>link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
                    };
                    yield transporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            console.log("eeror sending mail", error);
                        }
                        else {
                            console.log("email send", info.response);
                        }
                    });
                    return res.status(404).json({ message: "please check your email to verify account" });
                }
            }
            else {
                return res.status(404).json({ message: "incorrect password" });
            }
        }
        else {
            return res.status(404).json({ message: "user not found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "login failed" });
    }
});
exports.loginUser = loginUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSingle = yield userModel_1.default.findById(req.params.id).populate({
            path: "profile",
            select: "firstName lastName DOB"
        });
        return res.status(200).json({
            success: 1,
            message: "single data",
            data: getSingle
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to retrieve this user" });
    }
});
exports.getSingleUser = getSingleUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userModel_1.default.find().populate({
            path: "profile",
            select: "firstName lastName DOB"
        });
        return res.status(200).json({
            success: 1,
            message: "all users data",
            data: allUsers
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to get all users" });
    }
});
exports.getAllUsers = getAllUsers;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("sessionId");
        return res.status(200).json({
            success: 1,
            message: "logout successful"
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to logout user" });
    }
});
exports.logOut = logOut;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        console.log(user);
        const verifyData = yield userModel_1.default.findByIdAndUpdate(req.params.id, { verify: true }, { new: true });
        return res.status(201).json({ message: "account has been verify, processd to login" });
    }
    catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
});
exports.verifyUser = verifyUser;
// export const createProfile = async(req:Request,res:Response):Promise<Response>=>{
//     try{
// const {firstName,lastName,phoneNumber,DOB} = req.body
// const userProfile = await profileModel.create({
//     firstName,
//     lastName,
//     phoneNumber,
//     DOB,
// })
// const addProfile = await userModel.findByIdAndUpdate(req.params.id,{$set:{profile:userProfile._id}},{new:true})
// await addProfile?.save()
// return res.status(201).json({
//     success:1,
//     message:"profile successfully created",
//     data:userProfile
// })
//     }catch(error){
//         return res.status(404).json({message:"unable to create profile"})
//     }
// }
