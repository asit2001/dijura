"use strict";
// import { ServerError } from '../../types';
Object.defineProperty(exports, "__esModule", { value: true });
const USER_ERRORS = {
    NOT_FOUND: {
        STATUS: 404,
        TITLE: 'NOT_FOUND',
        MESSAGE: 'The requested resource was not found.',
    },
    INVALID_CREDENTIALS: {
        STATUS: 403,
        TITLE: 'INVALID_CREDENTIALS',
        MESSAGE: 'Invalid email and password'
    }
};
exports.default = USER_ERRORS;
