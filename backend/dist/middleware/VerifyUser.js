"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = exports.IsUser = exports.AuthenticateUser = void 0;
const const_1 = require("../config/const");
const user_1 = __importDefault(require("../database/service/user"));
const userError_1 = __importDefault(require("../errors/api-error/userError"));
const ApiError_1 = __importDefault(require("../errors/api-error/ApiError"));
const serverError_1 = __importDefault(require("../errors/serverError"));
const AuthenticateUser = async (req, res, next) => {
    const token = req.cookies.auth_token;
    try {
        const { user, role, auth_token } = await user_1.default.verifyToken(token);
        req.locals = {
            user_id: user._id,
            user: user,
            role: role,
        };
        res.locals = {
            auth_token: auth_token,
        };
        next();
    }
    catch (e) {
        if (e instanceof serverError_1.default) {
            return next(e);
        }
        return next(new ApiError_1.default(userError_1.default.AUTHORIZATION_ERROR));
    }
};
exports.AuthenticateUser = AuthenticateUser;
const IsUser = async (req, res, next) => {
    const { role } = req.locals;
    if (role !== const_1.USER_TYPES.USER) {
        return next(new ApiError_1.default(userError_1.default.AUTHORIZATION_ERROR));
    }
    next();
};
exports.IsUser = IsUser;
const IsAdmin = async (req, res, next) => {
    const { role } = req.locals;
    if (role !== const_1.USER_TYPES.ADMIN) {
        return next(new ApiError_1.default(userError_1.default.AUTHORIZATION_ERROR));
    }
    next();
};
exports.IsAdmin = IsAdmin;
