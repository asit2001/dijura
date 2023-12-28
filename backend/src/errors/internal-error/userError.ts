// import { ServerError } from '../../types';

import {IServerError} from "@/error/serverError";

const USER_ERRORS = {
	NOT_FOUND: {
		STATUS: 404,
		TITLE: 'NOT_FOUND',
		MESSAGE: 'The requested resource was not found.',
	},
    INVALID_CREDENTIALS: {
        STATUS:403,
        TITLE:'INVALID_CREDENTIALS',
        MESSAGE:'Invalid email and password'
    }
} satisfies {
	[error: string]: IServerError;
};

export default USER_ERRORS;
