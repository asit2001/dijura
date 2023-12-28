import { UserController } from "@/controller/user";
import {AuthenticateUser,IsAdmin,IsUser} from "@/middleware/VerifyUser"
import express from "express";

export default class UserRoutes{
    private static instance:UserRoutes
    private userControllerInstance:UserController;
    constructor(){
        if (UserRoutes.instance) {
            return UserRoutes.instance;
        }
        this.userControllerInstance = new UserController();
        UserRoutes.instance = this;
    }
    getRouter(){
        const router = express.Router();
        router.route('/all').all(AuthenticateUser,IsAdmin).get(this.userControllerInstance.getAllUsers);
        router.route('/').all(AuthenticateUser).get(this.userControllerInstance.getUser);

        return router;
    }
}