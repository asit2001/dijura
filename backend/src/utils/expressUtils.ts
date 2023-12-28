import { Request, Response } from 'express';
type ResponseData = {
	res: Response;
	status: 200 | 201  | 400 | 401 | 403 | 404 | 415 | 500;
	data?: object;
};

export const Respond = ({ res, status, data = {} }: ResponseData) => {
	if (status === 200 || status === 201) {
		const auth_token = res.locals.auth_token;
		const refresh_token = res.locals.refresh_token;
		if (auth_token !== undefined) {
			res.cookie('auth_token', auth_token, {
				maxAge: 1000 * 60 * 3,
				sameSite: 'strict',
				httpOnly: true,
				secure: true,
			});
		}

		if (refresh_token !== undefined) {
			res.cookie('refresh_token', refresh_token, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				sameSite: 'strict',
				httpOnly: true,
				secure: true,
			});
		}

		return res.status(status).json({ ...data, success: true });
	}
	return res.status(status).json({ ...data, success: false });
};
