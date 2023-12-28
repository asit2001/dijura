"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const COMMON_ERRORS = {
    NOT_FOUND: {
        STATUS: 404,
        TITLE: 'NOT_FOUND',
        MESSAGE: 'The requested resource was not found.',
    },
    INTERNAL_SERVER_ERROR: {
        STATUS: 500,
        TITLE: 'INTERNAL_SERVER_ERROR',
        MESSAGE: 'There was an error while processing your request. Please try again later.',
    },
    INVALID_ID: {
        STATUS: 400,
        TITLE: 'INVALID_ID',
        MESSAGE: 'The request id is not valid.'
    },
    INVALID_FIELDS: {
        STATUS: 400,
        TITLE: 'INVALID_FIELDS',
        MESSAGE: 'The request contains invalid fields. Please try again later.',
    },
    UNSUPPORTED_MEDIA: {
        STATUS: 415,
        TITLE: 'UNSUPPORTED_MEDIA',
        MESSAGE: 'Only JPG / PNG images are allowed',
    },
};
exports.default = COMMON_ERRORS;
