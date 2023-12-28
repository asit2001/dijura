"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverError_1 = __importDefault(require("../serverError"));
class APIError extends serverError_1.default {
    constructor(option, err = null) {
        super(option.MESSAGE);
        Object.setPrototypeOf(this, APIError.prototype);
        this.title = option.TITLE;
        this.message = option.MESSAGE;
        this.status = option.STATUS;
        this.error = err;
    }
    serializeError() {
        return {
            title: this.title,
            message: this.message,
            status: this.status,
        };
    }
    toString() {
        return 'APIError: ' + this.status + ' - ' + this.title + ' - ' + this.message + '\n';
    }
}
exports.default = APIError;
