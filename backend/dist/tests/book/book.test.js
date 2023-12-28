"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const __1 = require("../..");
const payload_1 = require("../payload");
const userError_1 = __importDefault(require("../../errors/api-error/userError"));
const commonError_1 = __importDefault(require("../../errors/internal-error/commonError"));
const user_1 = require("../../database/repository/user");
const book_1 = require("../../database/repository/book");
const App = (0, supertest_1.default)(__1.app);
let userCookies;
let adminCookies;
let bookID;
beforeAll(async () => {
    await App.post('/api/v1/auth/signup').send(payload_1.newUserPayload);
    await App.post('/api/v1/auth/signup').send(payload_1.adminPayload);
    const res = await App.post('/api/v1/auth/login').send(payload_1.newUserPayload);
    const AdminRes = await App.post('/api/v1/auth/login').send(payload_1.adminPayload);
    userCookies = res.headers['set-cookie'];
    adminCookies = AdminRes.headers['set-cookie'];
}, 30000);
afterAll(async () => {
    await user_1.userModel.collection.drop();
    await user_1.AuthModel.collection.drop();
    await book_1.bookModel.collection.drop();
});
describe('Testing book api', () => {
    it('USER: crete new book. should throw error.', async () => {
        const res = await App.post('/api/v1/book').set('Cookie', userCookies).send(payload_1.bookPayload);
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: crete new book with invalid fields. should throw error.', async () => {
        const res = await App.post('/api/v1/book').set('Cookie', adminCookies).send({});
        expect(res.status).toEqual(commonError_1.default.INVALID_FIELDS.STATUS);
        expect(res.body.title).toEqual(commonError_1.default.INVALID_FIELDS.TITLE);
    });
    it('ADMIN: crete new book with valid fields. should be success.', async () => {
        const res = await App.post('/api/v1/book').set('Cookie', adminCookies).send(payload_1.bookPayload);
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual(payload_1.bookPayload.name);
        bookID = res.body.id;
    });
    // * UPDATE BOOK
    it('USER: UPDATE book by id. Should throw error.', async () => {
        const res = await App.patch('/api/v1/book/:id'.replace(':id', bookID))
            .set('Cookie', userCookies)
            .send(payload_1.updateBookPayload);
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: UPDATE book by id. Should be success.', async () => {
        const res = await App.patch('/api/v1/book/:id'.replace(':id', bookID))
            .set('Cookie', adminCookies)
            .send(payload_1.updateBookPayload);
        expect(res.status).toEqual(200);
    });
    //  * UPDATE BOOK IMAGE
    it('ADMIN: UPDATE Book image by ID. Should be success.', async () => {
        const filePath = path_1.default.resolve(__dirname, "image", "images.jpg");
        const res = await App.patch('/api/v1/book/:id/upload'.replace(':id', bookID))
            .set('Cookie', adminCookies)
            .attach('file', filePath);
        expect(res.status).toEqual(200);
    }, 30000);
    // * GET BOOK(s);
    it('USER: GET all books. Should be success.', async () => {
        const res = await App.get('/api/v1/book/all').set('Cookie', adminCookies);
        expect(res.status).toEqual(200);
        expect(res.body.books.length).not.toEqual(0);
    });
    it('USER: GET book by id. Should be success.', async () => {
        const res = await App.get('/api/v1/book/:id'.replace(':id', bookID)).set('Cookie', userCookies);
        expect(res.status).toEqual(200);
        expect(res.body.name).not.toBeUndefined();
    });
    it('USER: GET book by invalid id. Should throw error.', async () => {
        const res = await App.get('/api/v1/book/12345698aaa').set('Cookie', userCookies);
        expect(res.status).toEqual(commonError_1.default.INVALID_ID.STATUS);
        expect(res.body.title).toEqual(commonError_1.default.INVALID_ID.TITLE);
    });
    // * DELETE BOOK
    it('USER: DELETE book by id. Should throw error.', async () => {
        const res = await App.delete('/api/v1/book/:id'.replace(':id', bookID))
            .set('Cookie', userCookies)
            .send(payload_1.updateBookPayload);
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: DELETE book by id. Should be success.', async () => {
        const res = await App.delete('/api/v1/book/:id'.replace(':id', bookID))
            .set('Cookie', adminCookies)
            .send(payload_1.updateBookPayload);
        expect(res.status).toEqual(200);
    });
});
