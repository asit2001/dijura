import { NextFunction, Request, Response } from 'express';
import { USER_TYPES } from '../config/const';
import { LocalRequest, Locals } from '@/types/local';
import UserService from '@/service/user';
import USER_ERRORS from '@/error/api-error/userError';
import APIError from '@/error/api-error/ApiError';
import ServerError from '@/error/serverError';

const AuthenticateUser = async (req: LocalRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.auth_token;

	try {
		const { user, role, auth_token } = await UserService.verifyToken(token);

		req.locals = {
			user_id: user._id,
			user: user,
			role: role,
		} as Locals;

		res.locals = {
			auth_token: auth_token,
		} as Locals;

		next();
	} catch (e: unknown) {
		if (e instanceof ServerError) {
			return next(e);
		}
		
		return next(new APIError(USER_ERRORS.AUTHORIZATION_ERROR));
	}
};

const IsUser = async (req: LocalRequest, res: Response, next: NextFunction) => {
	const { role } = req.locals as Locals;
	if (role !== USER_TYPES.USER) {
		return next(new APIError(USER_ERRORS.AUTHORIZATION_ERROR));
	}
	next();
};



const IsAdmin = async (req: LocalRequest, res: Response, next: NextFunction) => {
	const { role } = req.locals;
	if (role !== USER_TYPES.ADMIN) {
		return next(new APIError(USER_ERRORS.AUTHORIZATION_ERROR));
	}
	next();
};


export { AuthenticateUser, IsUser, IsAdmin };
