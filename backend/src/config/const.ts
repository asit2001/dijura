import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI;
export const JWT_SECRET = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '';
export const JWT_EXPIRE = process.env.JWT_EXPIRE !== undefined ? process.env.JWT_EXPIRE : '';
export const REFRESH_SECRET =
	process.env.REFRESH_SECRET !== undefined ? process.env.REFRESH_SECRET : '';
export const REFRESH_EXPIRE =
	process.env.REFRESH_EXPIRE !== undefined ? process.env.REFRESH_EXPIRE : '';
export const SALT_ROUND = Number.parseInt(process.env.SALT_ROUND) || 10;
export const FIREBASE_SERVICE_ACCOUNT_BASE64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
export enum USER_TYPES {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
export enum TRANSACTION_TYPES {
	BORROWED = 'BORROWED',
	RETURNED = 'RETURNED',
}
export const  IS_TEST = process.env.NODE_ENV === 'test';
export const  IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const  IS_DEVELOPMENT = process.env.NODE_ENV === 'development';