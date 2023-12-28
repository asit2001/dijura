import { USER_TYPES } from '@/config/const';
import { AuthModel, userModel } from '@/repo/user';
import USER_ERRORS from '@/error/api-error/userError';
import IUser from '@/types/user';
import request from 'supertest';
import { Document } from 'mongoose';
import { app } from '../..';

const App = request(app);

let userCookies: string[];
let adminCookies: string[];

const adminPayload: Omit<IUser, keyof Document> = {
	phone: 1234567890,
	role: USER_TYPES.ADMIN,
	password: 'admin1234',
	username: 'admin123',
	name: 'admin',
	email: 'admin@gmail.com',
};

const newUserPayload: Omit<IUser, keyof Document> = {
	phone: 11111111111,
	role: USER_TYPES.USER,
	password: 'aaaaaaaaaaaaa',
	username: 'a123456',
	name: 'aaaaa',
	email: 'aaaaa@gmail.com',
};

beforeAll(async () => {
	await App.post('/api/v1/auth/signup').send(newUserPayload);
	await App.post('/api/v1/auth/signup').send(adminPayload);
	const res = await App.post('/api/v1/auth/login').send(newUserPayload);
	const AdminRes = await App.post('/api/v1/auth/login').send(adminPayload);
	userCookies = res.headers['set-cookie'] as unknown as string[];
	adminCookies = AdminRes.headers['set-cookie'] as unknown as string[];
}, 30000);

afterAll(async () => {
	await userModel.collection.drop();
	await AuthModel.collection.drop();
});

describe('GET user and all user', () => {
	it('USER: get user details', async () => {
		const res = await App.get('/api/v1/user').set('Cookie', userCookies);
		expect(res.status).toEqual(200);
		expect(res.body.name).toEqual(newUserPayload.name);
		expect(res.body.email).toEqual(newUserPayload.email);
		expect(res.body.phone).toEqual(newUserPayload.phone);
		expect(res.body.username).toEqual(newUserPayload.username);
		expect(res.body.password).toBeUndefined();
	});
	it('USER: GET all users. should throw error', async () => {
		const res = await App.get('/api/v1/user/all').set('Cookie', userCookies);
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: GET all users. should be success', async () => {
		const res = await App.get('/api/v1/user/all').set('Cookie', adminCookies);
		expect(res.status).toEqual(200);
		expect(res.body.users.length).not.toEqual(0);
		res.body.users.map((user: IUser) => expect(user.password).toBeUndefined());
		res.body.users.map((user: IUser) => expect(user.email).not.toBeUndefined());
	});
});
