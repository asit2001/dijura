"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isJWTError = (e) => {
    return (e instanceof jsonwebtoken_1.default.JsonWebTokenError ||
        e instanceof jsonwebtoken_1.default.TokenExpiredError ||
        e instanceof jsonwebtoken_1.default.NotBeforeError);
};
const isValid = (token, secret) => {
    return decode(token, secret) !== null;
};
const decode = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (e) {
        return null;
    }
};
exports.default = { isJWTError, isValid, decode };
