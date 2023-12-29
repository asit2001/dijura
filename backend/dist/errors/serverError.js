"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ERROR_TITLE = 'Unhandled Error.';
class ServerError extends Error {
    constructor(msg = ERROR_TITLE) {
        super(msg);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.default = ServerError;
