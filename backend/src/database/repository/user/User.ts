import mongoose, { Schema } from 'mongoose';
import IUser from '@/types/user';
import { USER_TYPES } from '@/config/const';

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: USER_TYPES,
		default: USER_TYPES.USER,
	},
	phone: {
		type: Number,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const userModel = mongoose.model<IUser>('User', userSchema);
export default userModel;
