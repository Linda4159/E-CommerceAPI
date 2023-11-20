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
exports.verifyUser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
// const oAuth = new google.auth.OAuth2()
const GOOGLE_ID = "827223708490-r6uia8hqhnlna8fltdslilur0rvjjcp2.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN = "1//04VBX3I4Q7lGsCgYIARAAGAQSNwF-L9IronxB3NUkR7Y18cUUli-FA1Xnd_uxdx0Y3nIUXOrf2ya0LWgtOjWFigf4Fvi9GlUKK1w";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const verifyUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type: "oAuth2",
                user: 'poshlindajay@gmail.com',
                refeshToken: GOOGLE_REFRESHTOKEN,
                clientSecret: GOOGLE_SECRET,
                accessToken: accessToken
            }
        });
        const buildFile = path_1.default.join(__dirname, "../Views/verifyAccount.ejs");
    }
    catch (error) {
        console.log("first");
        console.log(error);
    }
});
exports.verifyUser = verifyUser;
