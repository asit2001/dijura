"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = void 0;
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return __importDefault(Auth_1).default; } });
var User_1 = require("./User");
Object.defineProperty(exports, "UserController", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
