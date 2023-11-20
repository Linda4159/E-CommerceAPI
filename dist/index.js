"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./database/database");
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const port = 2222;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log("this port is listening on", port);
});
process.on("uncaughtException", (error) => {
    console.log("stop: an error occured here", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("hold: there is an error here");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
