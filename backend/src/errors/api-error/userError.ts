import { IServerError } from '@/error/serverError';

const USER_ERRORS = {
	AUTHORIZATION_ERROR: {
		STATUS: 401,
		TITLE: 'AUTHORIZATION_ERROR',
		MESSAGE: 'The user is not authorized to perform this action.',
	},
	INVALID_EMAIL_ERROR: {
		STATUS: 400,
		TITLE: 'INVALID_EMAIL_ERROR',
		MESSAGE: 'The email is invalid. Please try again later.',
	},
	INVALID_EMAIL_AND_ROLE_ERROR: {
		STATUS: 400,
		TITLE: 'INVALID_EMAIL_AND_ROLE_ERROR',
		MESSAGE: 'Please provide a valid email address along with user role to authenticate.',
	},
	USER_ALREADY_EXISTS: {
		STATUS: 400,
		TITLE: 'USER_ALREADY_EXISTS',
		MESSAGE: 'The user already exists. Please try again later.',
	},
	USER_NOT_FOUND_ERROR: {
		STATUS: 404,
		TITLE: 'USER_NOT_FOUND_ERROR',
		MESSAGE: 'The user was not found. Please try again later.',
	},
	USERNAME_ALREADY_EXISTS: {
		STATUS: 400,
		TITLE: 'USERNAME_ALREADY_EXISTS',
		MESSAGE: 'The username already exists. Please try again later.',
	},
	
} satisfies {
	[error: string]: IServerError;
};

export default USER_ERRORS;
