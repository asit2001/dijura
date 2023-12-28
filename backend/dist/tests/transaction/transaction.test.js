"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../..");
const payload_1 = require("../payload");
const userError_1 = __importDefault(require("../../errors/api-error/userError"));
const user_1 = require("../../database/repository/user");
const transaction_1 = require("../../database/repository/transaction");
const book_1 = require("../../database/repository/book");
const const_1 = require("../../config/const");
const App = (0, supertest_1.default)(__1.app);
let userCookies;
let adminCookies;
let bookID;
let userId;
let transactionID;
beforeAll(async () => {
    await App.post('/api/v1/auth/signup').send(payload_1.newUserPayload);
    await App.post('/api/v1/auth/signup').send(payload_1.adminPayload);
    let res = await App.post('/api/v1/auth/login').send(payload_1.newUserPayload);
    const AdminRes = await App.post('/api/v1/auth/login').send(payload_1.adminPayload);
    userCookies = res.headers['set-cookie'];
    adminCookies = AdminRes.headers['set-cookie'];
    // get user ID;
    res = await App.get('/api/v1/user').set('Cookie', userCookies);
    userId = res.body.id;
    // create a book
    res = await App.post('/api/v1/book').set('Cookie', adminCookies).send(payload_1.bookPayload);
    bookID = res.body.id;
}, 30000);
afterAll(async () => {
    await user_1.userModel.collection.drop();
    await user_1.AuthModel.collection.drop();
    await book_1.bookModel.collection.drop();
    await transaction_1.transactionModal.collection.drop();
});
describe('TESTING TRANSACTION ENDPOINT', () => {
    // * CREATE
    it('USER: create a transaction. should throw error.', async () => {
        const res = await App.post('/api/v1/transaction')
            .set('Cookie', userCookies)
            .send((0, payload_1.transactionBorrow)(userId, bookID));
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: create a transaction. should be success.', async () => {
        const res = await App.post('/api/v1/transaction')
            .set('Cookie', adminCookies)
            .send((0, payload_1.transactionBorrow)(userId, bookID));
        expect(res.status).toEqual(201);
        expect(res.body.user).not.toBeUndefined();
        transactionID = res.body.id;
    });
    // * UPDATE
    it('USER: update transaction type. should throw error.', async () => {
        const res = await App.patch('/api/v1/transaction/:id'.replace(':id', transactionID))
            .set('Cookie', userCookies)
            .send({ transactionType: const_1.TRANSACTION_TYPES.RETURNED });
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: update transaction type. should be success.', async () => {
        const res = await App.patch('/api/v1/transaction/:id'.replace(':id', transactionID))
            .set('Cookie', adminCookies)
            .send({ transactionType: const_1.TRANSACTION_TYPES.RETURNED });
        expect(res.status).toEqual(200);
    });
    // * GET
    it('USER: get all transactions. should throw error.', async () => {
        const res = await App.get('/api/v1/transaction/all')
            .set('Cookie', userCookies);
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: get all transactions. should be success.', async () => {
        const res = await App.get('/api/v1/transaction/all')
            .set('Cookie', adminCookies);
        expect(res.status).toEqual(200);
        expect(res.body.transactions.length).not.toEqual(0);
    });
    it('USER: get users transactions. should be success.', async () => {
        const res = await App.get('/api/v1/transaction/')
            .set('Cookie', userCookies);
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
