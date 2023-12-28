"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverError_1 = __importDefault(require("../serverError"));
const ERROR_TITLE = 'Unhandled Error.';
class InternalError extends serverError_1.default {
    constructor({ STATUS, MESSAGE, TITLE }) {
        super(ERROR_TITLE);
        this.title = ERROR_TITLE;
        this.message = ERROR_TITLE;
        this.status = 500;
        this.error = null;
        Object.setPrototypeOf(this, InternalError.prototype);
        this.title = TITLE;
        this.message = MESSAGE;
        this.status = STATUS;
    }
    isSameInstanceof(details) {
        return (this.status === details.STATUS &&
            this.title === details.TITLE &&
            this.message === details.MESSAGE);
    }
    serializeError() {
        return {
            title: this.title,
            message: this.message,
            status: this.status,
        };
    }
}
exports.default = InternalError;
