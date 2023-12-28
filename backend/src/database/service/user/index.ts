import { userModel } from '@/repo/user';
import IUser from '@/types/user';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { JWT_SECRET, REFRESH_SECRET, SALT_ROUND } from '@/config/const';
import { AuthModel } from '@/repo/user';
import JWTUtils from '@/utils/JWTUtils';
import InternalError from '@/error/internal-error/internalError';
import USER_ERRORS from '@/error/api-error/userError';
import COMMON_ERRORS from '@/error/internal-error/commonError';

export default class UserService {
	static async getServiceByUserId(id: Types.ObjectId) {
		const user = await userModel.findById(id);
		if (user === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}
		return user;
	}

	static async getAllUsers() {
		const users = await userModel.find({});
		if (users === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}
		return users;
	}

	static async getServiceByEmail(Email: string) {
		const user = await userModel.findOne({ email: Email });
		if (user === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}
		return user;
	}
	static async getServiceByUserName(UserName: string) {
		const user = await userModel.findOne({ username: UserName });
		if (user === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}
		return user;
	}
	static async createUser(User: IUser) {
		const isUserNameAlreadyExists = await userModel.exists({ username: User.username });
		const isEmailAlreadyExists = await userModel.exists({ email: User.email });
		if (isUserNameAlreadyExists || isEmailAlreadyExists) {
			throw new InternalError(USER_ERRORS.USERNAME_ALREADY_EXISTS);
		}

		const hashedPassword = await bcrypt.hash(User.password, SALT_ROUND);
		const user = await userModel.create({ ...User, password: hashedPassword });
		if (user === null) {
			throw new InternalError(COMMON_ERRORS.INTERNAL_SERVER_ERROR);
		}
		await AuthModel.create({
			user: user.id,
		});
	}
	static async verifyUser(User: {
		userName?: string;
		email?: string;
		password: string;
		role: string;
	}) {
		let user: IUser;

		if (User.userName) {
			user = await UserService.getServiceByUserName(User.userName);
		} else if (User.email && !User.userName) {
			user = await UserService.getServiceByEmail(User.email);
		}

		if (!bcrypt.compareSync(User.password, user.password)) {
			throw new InternalError(USER_ERRORS.AUTHORIZATION_ERROR);
		}

		if (user.role !== User.role) {
			throw new InternalError(USER_ERRORS.INVALID_EMAIL_AND_ROLE_ERROR);
		}
		const authDetails = await AuthModel.findOne({ user: user.id }).populate({
			path: 'user',
			model: userModel,
		});

		if (authDetails === null) {
			new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}

		const token = authDetails.getAuthToken();
		const refresh_token = authDetails.getRefreshToken();
		return {
			token,
			refresh_token,
			user: { name: user.name, id: user.id, email: user.email, username: user.username,phone:user.phone,role:user.role },
		};
	}
	static async verifyToken(token: string) {
		const decoded = JWTUtils.decode(token, JWT_SECRET);

		if (decoded === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}
		const { id } = decoded as { id: string; role: string };

		const authDetail = await AuthModel.findById(id).populate('user');

		if (authDetail === null) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}

		const auth_token = authDetail.getAuthToken();
		return { user: authDetail.user, role: authDetail.user.role, auth_token };
	}
	static async logout(refreshToken: string) {
		const authDetails = await AuthModel.findOne({ token: refreshToken });
		if (authDetails === null) {
			return;
		}
		authDetails.isRevoked = true;
		authDetails.revoked_at = new Date();
		authDetails.save();
	}
	static async refreshToken(refreshToken: string) {
			const decoded = JWTUtils.decode(refreshToken, REFRESH_SECRET);
		
		if (decoded === null) {
			
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}

		const { id } = decoded as { id: string; role: string };

		const authDetails = await AuthModel.findById(id);
		
		if (
			authDetails === null ||
			authDetails.isRevoked === true ||
			new Date(authDetails.refresh_token_expires) < new Date()
		) {
			throw new InternalError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}

		const token = authDetails.getAuthToken();
		return token;
	}
}
