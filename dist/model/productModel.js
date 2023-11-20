"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productcSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    desc: {
        type: String
    },
    qty: {
        type: Number
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    },
    createdAt: {
        type: String || Number,
        default: new Date()
    }
});
exports.default = mongoose_1.default.model("products", productcSchema);
