"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const const_1 = require("./const");
async function connect() {
    try {
        await mongoose_1.default.connect(const_1.IS_TEST ? const_1.MONGODB_TEST_URI : const_1.MONGODB_URI);
    }
    catch (e) {
        console.log(e);
    }
}
exports.default = connect;
