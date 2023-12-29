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
class AuthController {
    constructor() {
        if (AuthController.instance) {
            return AuthController.instance;
        }
        AuthController.instance = this;
    }
    async login(req, res, next) {
        try {
            const { userName, email, password, role } = req.body;
            const validator = zod_1.default.object({
                userName: zod_1.default.string().min(1).max(50).optional(),
                email: zod_1.default.string().email().optional(),
                password: zod_1.default.string().min(8).max(100),
                role: zod_1.default.enum([const_1.USER_TYPES.ADMIN, const_1.USER_TYPES.USER]),
            });
            const validatorResult = validator.safeParse(req.body);
            if (validatorResult.success !== true || (!userName && !email)) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            const { refresh_token, token, user } = await user_1.default.verifyUser({
                userName,
                password,
                email,
                role,
            });
            res.locals.auth_token = token;
            res.locals.refresh_token = refresh_token;
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: user,
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            console.log(err);
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async RefreshLogin(req, res, next) {
        const refresh_token = req.cookies.refresh_token;
        try {
            const token = await user_1.default.refreshToken(refresh_token);
            res.locals.auth_token = token;
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {},
            });
        }
        catch (err) {
            return next(new ApiError_1.default(userError_1.default.NOT_FOUND));
        }
    }
    async Logout(req, res) {
        const refreshToken = req.cookies.refresh_token;
        user_1.default.logout(refreshToken);
        res.clearCookie('auth_token', {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });
        res.clearCookie('refresh_token', {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });
        return (0, expressUtils_1.Respond)({
            res,
            status: 200,
            data: {
                message: 'Logged Out.',
            },
        });
    }
}
exports.default = AuthController;
