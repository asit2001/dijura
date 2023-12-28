import { AuthController, UserController } from '@/controller/user';
import { AuthenticateUser } from '@/middleware/VerifyUser';
import express from 'express';

export default class AuthRoutes {
	private static instance: AuthRoutes;
	private authControllerInstance: AuthController;
	constructor() {
		if (AuthRoutes.instance) {
			return AuthRoutes.instance;
		}
		this.authControllerInstance = new AuthController();
		AuthRoutes.instance = this;
	}
	getRouter() {
		const router = express.Router();
		router.route('/login').post(this.authControllerInstance.login);
		router.route('/refresh-token').post(this.authControllerInstance.RefreshLogin);
		router.route('/logout').all(AuthenticateUser).post(this.authControllerInstance.Logout);
		router.route('/signup').post(new UserController().createUser);
		return router;
	}
}
