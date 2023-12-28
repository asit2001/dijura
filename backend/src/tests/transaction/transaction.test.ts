import request from 'supertest';
import { app } from '../..';
import { adminPayload, bookPayload, newUserPayload, transactionBorrow } from '../payload';
import USER_ERRORS from '@/error/api-error/userError';
import { AuthModel, userModel } from '@/repo/user';
import { transactionModal } from '@/repo/transaction';
import { bookModel } from '@/repo/book';
import { TRANSACTION_TYPES } from '@/config/const';

const App = request(app);

let userCookies: string[];
let adminCookies: string[];
let bookID: string;
let userId: string;
let transactionID: string;

beforeAll(async () => {
	await App.post('/api/v1/auth/signup').send(newUserPayload);
	await App.post('/api/v1/auth/signup').send(adminPayload);
	let res = await App.post('/api/v1/auth/login').send(newUserPayload);
	const AdminRes = await App.post('/api/v1/auth/login').send(adminPayload);
	userCookies = res.headers['set-cookie'] as unknown as string[];
	adminCookies = AdminRes.headers['set-cookie'] as unknown as string[];
	// get user ID;
	res = await App.get('/api/v1/user').set('Cookie', userCookies);
	userId = res.body.id;
	// create a book
	res = await App.post('/api/v1/book').set('Cookie', adminCookies).send(bookPayload);
	bookID = res.body.id;
}, 30000);

afterAll(async () => {
	await userModel.collection.drop();
	await AuthModel.collection.drop();
	await bookModel.collection.drop();
	await transactionModal.collection.drop();
});

describe('TESTING TRANSACTION ENDPOINT', () => {
	// * CREATE
	it('USER: create a transaction. should throw error.', async () => {
		const res = await App.post('/api/v1/transaction')
			.set('Cookie', userCookies)
			.send(transactionBorrow(userId, bookID));
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: create a transaction. should be success.', async () => {
		const res = await App.post('/api/v1/transaction')
			.set('Cookie', adminCookies)
			.send(transactionBorrow(userId, bookID));
		expect(res.status).toEqual(201);
		expect(res.body.user).not.toBeUndefined();
		transactionID = res.body.id;
	});

	// * UPDATE

	it('USER: update transaction type. should throw error.', async () => {
		const res = await App.patch('/api/v1/transaction/:id'.replace(':id', transactionID))
			.set('Cookie', userCookies)
			.send({ transactionType: TRANSACTION_TYPES.RETURNED });
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: update transaction type. should be success.', async () => {
		const res = await App.patch('/api/v1/transaction/:id'.replace(':id', transactionID))
			.set('Cookie', adminCookies)
			.send({ transactionType: TRANSACTION_TYPES.RETURNED });
		expect(res.status).toEqual(200);
	});

	// * GET

	it('USER: get all transactions. should throw error.', async () => {
		const res = await App.get('/api/v1/transaction/all')
			.set('Cookie', userCookies)
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: get all transactions. should be success.', async () => {
		const res = await App.get('/api/v1/transaction/all')
			.set('Cookie', adminCookies);
		expect(res.status).toEqual(200);
		expect(res.body.transactions.length).not.toEqual(0);
	});
	it('USER: get users transactions. should be success.', async () => {
		const res = await App.get('/api/v1/transaction/')
			.set('Cookie', userCookies)
		expect(res.status).toEqual(200);
		expect(res.body.transactions).not.toBeUndefined();
	});

    it('ADMIN: get all borrowed transactions. should be success.', async () => {
		const res = await App.get('/api/v1/transaction/borrowed')
			.set('Cookie', adminCookies);	
		expect(res.status).toEqual(200);
		expect(res.body.transactions).not.toBeUndefined();
	});
    it('ADMIN: get all returned transactions. should be success.', async () => {
		const res = await App.get('/api/v1/transaction/returned')
			.set('Cookie', adminCookies);
		expect(res.status).toEqual(200);
		expect(res.body.transactions).not.toBeUndefined();
	});
});
