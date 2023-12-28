import request from 'supertest';
import path from "path"
import { app } from '../..';
import { adminPayload, bookPayload, newUserPayload, updateBookPayload } from '../payload';
import USER_ERRORS from '@/error/api-error/userError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import { AuthModel, userModel } from '@/repo/user';
import { bookModel } from '@/repo/book';

const App = request(app);

let userCookies: string[];
let adminCookies: string[];
let bookID: string;

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
	await bookModel.collection.drop();
});

describe('Testing book api', () => {
	it('USER: crete new book. should throw error.', async () => {
		const res = await App.post('/api/v1/book').set('Cookie', userCookies).send(bookPayload);
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: crete new book with invalid fields. should throw error.', async () => {
		const res = await App.post('/api/v1/book').set('Cookie', adminCookies).send({});
		expect(res.status).toEqual(COMMON_ERRORS.INVALID_FIELDS.STATUS);
		expect(res.body.title).toEqual(COMMON_ERRORS.INVALID_FIELDS.TITLE);
	});
	it('ADMIN: crete new book with valid fields. should be success.', async () => {
		const res = await App.post('/api/v1/book').set('Cookie', adminCookies).send(bookPayload);
		expect(res.status).toEqual(201);
		expect(res.body.name).toEqual(bookPayload.name);
		bookID = res.body.id;
	});

	// * UPDATE BOOK

	it('USER: UPDATE book by id. Should throw error.', async () => {
		const res = await App.patch('/api/v1/book/:id'.replace(':id', bookID))
			.set('Cookie', userCookies)
			.send(updateBookPayload);
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: UPDATE book by id. Should be success.', async () => {
		const res = await App.patch('/api/v1/book/:id'.replace(':id', bookID))
			.set('Cookie', adminCookies)
			.send(updateBookPayload);
		expect(res.status).toEqual(200);
	});

	//  * UPDATE BOOK IMAGE

	it('ADMIN: UPDATE Book image by ID. Should be success.', async () => {
		const filePath = path.resolve(__dirname,"image","images.jpg");
		const res = await App.patch('/api/v1/book/:id/upload'.replace(':id', bookID))
			.set('Cookie', adminCookies)
			.attach('file',filePath);
		expect(res.status).toEqual(200);
	},30000);

	// * GET BOOK(s);

	it('USER: GET all books. Should be success.', async () => {
		const res = await App.get('/api/v1/book/all').set('Cookie', adminCookies);
		expect(res.status).toEqual(200);
		expect(res.body.books.length).not.toEqual(0);
	});

	it('USER: GET book by id. Should be success.', async () => {
		const res = await App.get('/api/v1/book/:id'.replace(':id', bookID)).set(
			'Cookie',
			userCookies
		);
		expect(res.status).toEqual(200);
		expect(res.body.name).not.toBeUndefined();
		
	});
	it('USER: GET book by invalid id. Should throw error.', async () => {
		const res = await App.get('/api/v1/book/12345698aaa').set('Cookie', userCookies);
		expect(res.status).toEqual(COMMON_ERRORS.INVALID_ID.STATUS);
		expect(res.body.title).toEqual(COMMON_ERRORS.INVALID_ID.TITLE);
	});

	

	// * DELETE BOOK

	it('USER: DELETE book by id. Should throw error.', async () => {
		const res = await App.delete('/api/v1/book/:id'.replace(':id', bookID))
			.set('Cookie', userCookies)
			.send(updateBookPayload);
		expect(res.status).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.STATUS);
		expect(res.body.title).toEqual(USER_ERRORS.AUTHORIZATION_ERROR.TITLE);
	});
	it('ADMIN: DELETE book by id. Should be success.', async () => {
		const res = await App.delete('/api/v1/book/:id'.replace(':id', bookID))
			.set('Cookie', adminCookies)
			.send(updateBookPayload);
		expect(res.status).toEqual(200);
	});
});
