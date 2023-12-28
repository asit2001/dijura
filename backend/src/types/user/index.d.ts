import { Document } from 'mongoose';
import { USER_TYPES } from '@/config/const';

export default interface IUser extends Document {
	phone: number;
	role: USER_TYPES;
    password:string;
    username:string;
    name:string;
    email:string;
}

export interface IAuthDetail extends Document {
	user: IUser;
	login_hash: string | undefined;
	refresh_token: string;
	refresh_token_expires: Date;

	isRevoked: boolean;
	revoked_at: Date;

	getAuthToken(): string;
	getRefreshToken(): string;
}
