import { USER_TYPES } from '@/config/const';
import APIError from '@/error/api-error/ApiError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import USER_ERRORS from '@/error/internal-error/userError';
import ServerError from '@/error/serverError';
import UserService from '@/service/user';
import { Respond } from '@/utils/expressUtils';
import { NextFunction, Request, Response } from 'express';
import z from 'zod';
export default class AuthController {
	private static instance: AuthController;

	constructor() {
		if (AuthController.instance) {
			return AuthController.instance;
		}
		AuthController.instance = this;
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { userName, email, password, role } = req.body;
			const validator = z.object({
				userName: z.string().min(1).max(50).optional(),
				email: z.string().email().optional(),
				password: z.string().min(8).max(100),
				role: z.enum([USER_TYPES.ADMIN, USER_TYPES.USER]),
			});

			const validatorResult = validator.safeParse(req.body);
			if (validatorResult.success !== true || (!userName && !email)) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}
			const { refresh_token, token,user } = await UserService.verifyUser({
				userName,
				password,
				email,
				role,
			});
			res.locals.auth_token = token;
			res.locals.refresh_token = refresh_token;
			return Respond({
				res,
				status: 200,
				data: user,
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
            console.log(err);
            
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async RefreshLogin(req: Request, res: Response, next: NextFunction) {
		const refresh_token = req.cookies.refresh_token;

		try {
			const token = await UserService.refreshToken(refresh_token);

			res.locals.auth_token = token;
			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			return next(new APIError(USER_ERRORS.NOT_FOUND));
		}
	}
	async Logout(req: Request, res: Response) {
		const refreshToken = req.cookies.refresh_token;

		UserService.logout(refreshToken);

		res.clearCookie('auth_token', {
			sameSite: 'strict',
			httpOnly: true,
			secure: true,
		});
		res.clearCookie('refresh_token', {
			sameSite: 'strict',
			httpOnly: true,
			secure: true,
		});

		return Respond({
			res,
			status: 200,
			data: {
				message: 'Logged Out.',
			},
		});
	}
}
