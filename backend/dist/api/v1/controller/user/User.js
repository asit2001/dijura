"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../../../config/const");
const ApiError_1 = __importDefault(require("../../../../errors/api-error/ApiError"));
const commonError_1 = __importDefault(require("../../../../errors/internal-error/commonError"));
const userError_1 = __importDefault(require("../../../../errors/internal-error/userError"));
const serverError_1 = __importDefault(require("../../../../errors/serverError"));
const user_1 = __importDefault(require("../../../../database/service/user"));
const expressUtils_1 = require("../../../../utils/expressUtils");
const zod_1 = __importDefault(require("zod"));
class UserController {
    constructor() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = this;
    }
    getUser(req, res, next) {
        try {
            if (!req.locals.user) {
                throw new ApiError_1.default(userError_1.default.NOT_FOUND);
            }
            const { name, username, phone, email, id, role } = req.locals.user;
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: { name, username, email, phone, id, role },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async createUser(req, res, next) {
        try {
            const validator = zod_1.default.object({
                name: zod_1.default.string().min(3).max(100),
                phone: zod_1.default.number().int(),
                role: zod_1.default.enum([const_1.USER_TYPES.ADMIN, const_1.USER_TYPES.USER]),
                password: zod_1.default.string().min(8).max(100),
                username: zod_1.default.string().min(1).max(50),
                email: zod_1.default.string().email(),
            });
            const validatorResult = validator.safeParse(req.body);
            if (validatorResult.success === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            await user_1.default.createUser(req.body);
            return (0, expressUtils_1.Respond)({
                res,
                status: 201,
                data: {},
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await user_1.default.getAllUsers();
            return (0, expressUtils_1.Respond)({
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
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
}
exports.default = UserController;
