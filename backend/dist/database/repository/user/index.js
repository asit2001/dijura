"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.userModel = void 0;
var User_1 = require("./User");
Object.defineProperty(exports, "userModel", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var AuthDetails_1 = require("./AuthDetails");
Object.defineProperty(exports, "AuthModel", { enumerable: true, get: function () { return __importDefault(AuthDetails_1).default; } });
