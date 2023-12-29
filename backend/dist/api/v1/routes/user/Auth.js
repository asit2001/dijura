"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../controller/user");
const VerifyUser_1 = require("../../../../middleware/VerifyUser");
const express_1 = __importDefault(require("express"));
class AuthRoutes {
    constructor() {
        if (AuthRoutes.instance) {
            return AuthRoutes.instance;
        }
        this.authControllerInstance = new user_1.AuthController();
        AuthRoutes.instance = this;
    }
    getRouter() {
        const router = express_1.default.Router();
        router.route('/login').post(this.authControllerInstance.login);
        router.route('/refresh-token').post(this.authControllerInstance.RefreshLogin);
        router.route('/logout').all(VerifyUser_1.AuthenticateUser).post(this.authControllerInstance.Logout);
        router.route('/signup').post(new user_1.UserController().createUser);
        return router;
    }
}
exports.default = AuthRoutes;
