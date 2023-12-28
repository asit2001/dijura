import { USER_TYPES } from '@/config/const';
import APIError from '@/error/api-error/ApiError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import USER_ERRORS from '@/error/internal-error/userError';
import ServerError from '@/error/serverError';
import UserService from '@/service/user';
import { LocalRequest } from '@/types/local';
import { Respond } from '@/utils/expressUtils';
import { NextFunction, Response, Request } from 'express';
import z from 'zod';

export default class UserController {
	private static instance: UserController;

	constructor() {
		if (UserController.instance) {
			return UserController.instance;
		}
		UserController.instance = this;
	}

	getUser(req: LocalRequest, res: Response, next: NextFunction) {
		try {
			if (!req.locals.user) {
				throw new APIError(USER_ERRORS.NOT_FOUND);
			}
			const { name, username, phone, email,id,role } = req.locals.user;
			return Respond({
				res,
				status: 200,
				data: { name, username, email, phone, id,role},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const validator = z.object({
				name: z.string().min(3).max(100),
				phone: z.number().int(),
				role: z.enum([USER_TYPES.ADMIN, USER_TYPES.USER]),
				password: z.string().min(8).max(100),
				username: z.string().min(1).max(50),
				email: z.string().email(),
			});
			const validatorResult = validator.safeParse(req.body);

			if (validatorResult.success === false) {
				
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}
			await UserService.createUser(req.body);
			return Respond({
				res,
				status: 201,
				data: {},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async getAllUsers(req: LocalRequest, res: Response, next: NextFunction) {
		try {
			const users = await UserService.getAllUsers();
			return Respond({
				res,
				status: 200,
				data: {
					users: users.map(({ name, email, username, id, phone }) => ({
						name,
						email,
						username,
						id,
						phone,
					})),
				},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
}
