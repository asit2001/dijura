"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPayloadWithEmail = exports.userPayload = void 0;
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../..");
const const_1 = require("../../config/const");
const user_1 = require("../../database/repository/user");
const App = (0, supertest_1.default)(__1.app);
afterAll(async () => {
    await user_1.AuthModel.collection.drop();
    await user_1.userModel.collection.drop();
});
exports.userPayload = {
    email: "asitbiswas870@gmail.com",
    password: "Asit123456",
    name: "Asit Biswas",
    phone: 123456789,
    role: const_1.USER_TYPES.USER,
    username: "asit123"
};
const incorrectUserPayload = {
    email: "asitbiswas870@gmail.com",
    password: "", // empty password
    name: "Asit Biswas",
    phone: 123456789,
    role: const_1.USER_TYPES.USER,
    username: "asit123"
};
exports.LoginPayloadWithEmail = {
    email: "asitbiswas870@gmail.com",
    password: "Asit123456",
    role: const_1.USER_TYPES.USER,
};
const LoginPayloadWithUserName = {
    userName: "asit123",
    password: "Asit123456",
    role: const_1.USER_TYPES.USER,
};
describe("REGISTER A USER", () => {
    it("should throw error for incorrect fields", async () => {
        const res = await App.post("/api/v1/auth/signup").send(incorrectUserPayload);
        expect(res.status).toEqual(400);
        expect(res.body.title).toEqual('INVALID_FIELDS');
    });
    it("create a user should return success", async () => {
        const res = await App.post("/api/v1/auth/signup").send(exports.userPayload);
        expect(res.status).toEqual(201);
    });
    it("create a duplicate user should throw duplicate error", async () => {
        const res = await App.post("/api/v1/auth/signup").send(exports.userPayload);
        expect(res.body.title).toEqual("USERNAME_ALREADY_EXISTS");
        expect(res.status).toEqual(400);
    });
});
describe("POST /api/v1/auth/login ", () => {
    it("should login using username", async () => {
        const res = await App.post("/api/v1/auth/login").send(LoginPayloadWithUserName);
        expect(res.status).toEqual(200);
        const cookies = res.headers["set-cookie"];
        cookies.map(cookie => expect(cookie).toMatch(/(auth_token|refresh_token)/));
    });
    it("should login using email", async () => {
        const res = await App.post("/api/v1/auth/login").send(exports.LoginPayloadWithEmail);
        expect(res.status).toEqual(200);
        const cookies = res.headers["set-cookie"];
        cookies.map(cookie => expect(cookie).toMatch(/(auth_token|refresh_token)/));
    });
    it("should throw invalid fields error ", async () => {
        const res = await App.post("/api/v1/auth/login").send({});
        expect(res.status).toEqual(400);
        expect(res.body.title).toEqual('INVALID_FIELDS');
    });
});
