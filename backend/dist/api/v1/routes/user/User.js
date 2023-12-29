"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../controller/user");
const VerifyUser_1 = require("../../../../middleware/VerifyUser");
const express_1 = __importDefault(require("express"));
class UserRoutes {
    constructor() {
        if (UserRoutes.instance) {
            return UserRoutes.instance;
        }
        this.userControllerInstance = new user_1.UserController();
        UserRoutes.instance = this;
    }
    getRouter() {
        const router = express_1.default.Router();
        router.route('/all').all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin).get(this.userControllerInstance.getAllUsers);
        router.route('/').all(VerifyUser_1.AuthenticateUser).get(this.userControllerInstance.getUser);
        return router;
    }
}
exports.default = UserRoutes;
