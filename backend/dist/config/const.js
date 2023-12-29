"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEVELOPMENT = exports.IS_PRODUCTION = exports.IS_TEST = exports.TRANSACTION_TYPES = exports.USER_TYPES = exports.STORAGE_BUCKET = exports.FIREBASE_SERVICE_ACCOUNT_BASE64 = exports.SALT_ROUND = exports.REFRESH_EXPIRE = exports.REFRESH_SECRET = exports.JWT_EXPIRE = exports.JWT_SECRET = exports.MONGODB_TEST_URI = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_TEST_URI = process.env.MONGODB_TEST_URI;
exports.JWT_SECRET = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '';
exports.JWT_EXPIRE = process.env.JWT_EXPIRE !== undefined ? process.env.JWT_EXPIRE : '';
exports.REFRESH_SECRET = process.env.REFRESH_SECRET !== undefined ? process.env.REFRESH_SECRET : '';
exports.REFRESH_EXPIRE = process.env.REFRESH_EXPIRE !== undefined ? process.env.REFRESH_EXPIRE : '';
exports.SALT_ROUND = Number.parseInt(process.env.SALT_ROUND) || 10;
exports.FIREBASE_SERVICE_ACCOUNT_BASE64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
exports.STORAGE_BUCKET = process.env.STORAGE_BUCKET;
var USER_TYPES;
(function (USER_TYPES) {
    USER_TYPES["USER"] = "USER";
    USER_TYPES["ADMIN"] = "ADMIN";
})(USER_TYPES || (exports.USER_TYPES = USER_TYPES = {}));
var TRANSACTION_TYPES;
(function (TRANSACTION_TYPES) {
    TRANSACTION_TYPES["BORROWED"] = "BORROWED";
    TRANSACTION_TYPES["RETURNED"] = "RETURNED";
})(TRANSACTION_TYPES || (exports.TRANSACTION_TYPES = TRANSACTION_TYPES = {}));
exports.IS_TEST = process.env.NODE_ENV === 'test';
exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';
exports.IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
