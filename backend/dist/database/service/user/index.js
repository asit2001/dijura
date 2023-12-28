"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../repository/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const const_1 = require("../../../config/const");
const user_2 = require("../../repository/user");
const JWTUtils_1 = __importDefault(require("../../../utils/JWTUtils"));
const internalError_1 = __importDefault(require("../../../errors/internal-error/internalError"));
const userError_1 = __importDefault(require("../../../errors/api-error/userError"));
const commonError_1 = __importDefault(require("../../../errors/internal-error/commonError"));
class UserService {
    static async getServiceByUserId(id) {
        const user = await user_1.userModel.findById(id);
        if (user === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        return user;
    }
    static async getAllUsers() {
        const users = await user_1.userModel.find({});
        if (users === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        return users;
    }
    static async getServiceByEmail(Email) {
        const user = await user_1.userModel.findOne({ email: Email });
        if (user === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        return user;
    }
    static async getServiceByUserName(UserName) {
        const user = await user_1.userModel.findOne({ username: UserName });
        if (user === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        return user;
    }
    static async createUser(User) {
        const isUserNameAlreadyExists = await user_1.userModel.exists({ username: User.username });
        const isEmailAlreadyExists = await user_1.userModel.exists({ email: User.email });
        if (isUserNameAlreadyExists || isEmailAlreadyExists) {
            throw new internalError_1.default(userError_1.default.USERNAME_ALREADY_EXISTS);
        }
        const hashedPassword = await bcrypt_1.default.hash(User.password, const_1.SALT_ROUND);
        const user = await user_1.userModel.create({ ...User, password: hashedPassword });
        if (user === null) {
            throw new internalError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR);
        }
        await user_2.AuthModel.create({
            user: user.id,
        });
    }
    static async verifyUser(User) {
        let user;
        if (User.userName) {
            user = await UserService.getServiceByUserName(User.userName);
        }
        else if (User.email && !User.userName) {
            user = await UserService.getServiceByEmail(User.email);
        }
        if (!bcrypt_1.default.compareSync(User.password, user.password)) {
            throw new internalError_1.default(userError_1.default.AUTHORIZATION_ERROR);
        }
        if (user.role !== User.role) {
            throw new internalError_1.default(userError_1.default.INVALID_EMAIL_AND_ROLE_ERROR);
        }
        const authDetails = await user_2.AuthModel.findOne({ user: user.id }).populate({
            path: 'user',
            model: user_1.userModel,
        });
        if (authDetails === null) {
            new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        const token = authDetails.getAuthToken();
        const refresh_token = authDetails.getRefreshToken();
        return {
            token,
            refresh_token,
            user: { name: user.name, id: user.id, email: user.email, username: user.username, phone: user.phone, role: user.role },
        };
    }
    static async verifyToken(token) {
        const decoded = JWTUtils_1.default.decode(token, const_1.JWT_SECRET);
        if (decoded === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        const { id } = decoded;
        const authDetail = await user_2.AuthModel.findById(id).populate('user');
        if (authDetail === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        const auth_token = authDetail.getAuthToken();
        return { user: authDetail.user, role: authDetail.user.role, auth_token };
    }
    static async logout(refreshToken) {
        const authDetails = await user_2.AuthModel.findOne({ token: refreshToken });
        if (authDetails === null) {
            return;
        }
        authDetails.isRevoked = true;
        authDetails.revoked_at = new Date();
        authDetails.save();
    }
    static async refreshToken(refreshToken) {
        const decoded = JWTUtils_1.default.decode(refreshToken, const_1.REFRESH_SECRET);
        if (decoded === null) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        const { id } = decoded;
        const authDetails = await user_2.AuthModel.findById(id);
        if (authDetails === null ||
            authDetails.isRevoked === true ||
            new Date(authDetails.refresh_token_expires) < new Date()) {
            throw new internalError_1.default(userError_1.default.USER_NOT_FOUND_ERROR);
        }
        const token = authDetails.getAuthToken();
        return token;
    }
}
exports.default = UserService;
