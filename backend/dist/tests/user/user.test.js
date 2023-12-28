"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../config/const");
const user_1 = require("../../database/repository/user");
const userError_1 = __importDefault(require("../../errors/api-error/userError"));
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../..");
const App = (0, supertest_1.default)(__1.app);
let userCookies;
let adminCookies;
const adminPayload = {
    phone: 1234567890,
    role: const_1.USER_TYPES.ADMIN,
    password: 'admin1234',
    username: 'admin123',
    name: 'admin',
    email: 'admin@gmail.com',
};
const newUserPayload = {
    phone: 11111111111,
    role: const_1.USER_TYPES.USER,
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
    userCookies = res.headers['set-cookie'];
    adminCookies = AdminRes.headers['set-cookie'];
}, 30000);
afterAll(async () => {
    await user_1.userModel.collection.drop();
    await user_1.AuthModel.collection.drop();
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
        expect(res.status).toEqual(userError_1.default.AUTHORIZATION_ERROR.STATUS);
        expect(res.body.title).toEqual(userError_1.default.AUTHORIZATION_ERROR.TITLE);
    });
    it('ADMIN: GET all users. should be success', async () => {
        const res = await App.get('/api/v1/user/all').set('Cookie', adminCookies);
        expect(res.status).toEqual(200);
        expect(res.body.users.length).not.toEqual(0);
        res.body.users.map((user) => expect(user.password).toBeUndefined());
        res.body.users.map((user) => expect(user.email).not.toBeUndefined());
    });
});
