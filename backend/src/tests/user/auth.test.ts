import request from 'supertest'
import { Document }  from 'mongoose'
import {app} from "../.."
import { USER_TYPES } from '@/config/const'
import IUser from '@/types/user';
import { AuthModel, userModel } from '@/repo/user';
const App = request(app);


afterAll(async()=>{
    await AuthModel.collection.drop();
    await userModel.collection.drop();
})

export const userPayload:Omit<IUser, keyof Document> = {
    email:"asitbiswas870@gmail.com",
    password:"Asit123456",
    name:"Asit Biswas",
    phone:123456789,
    role:USER_TYPES.USER,
    username:"asit123"
}
const incorrectUserPayload:Omit<IUser, keyof Document> = {
    email:"asitbiswas870@gmail.com",
    password:"", // empty password
    name:"Asit Biswas",
    phone:123456789,
    role:USER_TYPES.USER, 
    username:"asit123"
}

interface LoginPayload{
    userName?:string,
    password?:string,
    email?:string,
    role?:string
}

export const LoginPayloadWithEmail:LoginPayload = {
    email:"asitbiswas870@gmail.com",
    password:"Asit123456",
    role:USER_TYPES.USER,
}
const LoginPayloadWithUserName:LoginPayload = {
    userName:"asit123",
    password:"Asit123456",
    role:USER_TYPES.USER,
}


describe("REGISTER A USER",()=>{
    it("should throw error for incorrect fields",async()=>{
        const res = await App.post("/api/v1/auth/signup").send(incorrectUserPayload);
        expect(res.status).toEqual(400);
        expect(res.body.title).toEqual('INVALID_FIELDS');
    });
    it("create a user should return success",async()=>{
        const res = await App.post("/api/v1/auth/signup").send(userPayload);
        expect(res.status).toEqual(201);
    });
    it("create a duplicate user should throw duplicate error",async()=>{
        const res = await App.post("/api/v1/auth/signup").send(userPayload);
        expect(res.body.title).toEqual("USERNAME_ALREADY_EXISTS");
        expect(res.status).toEqual(400);
        
    });

})
describe("POST /api/v1/auth/login ",()=>{
    it("should login using username",async()=>{
        const res = await App.post("/api/v1/auth/login").send(LoginPayloadWithUserName);
        expect(res.status).toEqual(200);
        const cookies = res.headers["set-cookie"] as unknown as string[]
        cookies.map(cookie=>expect(cookie).toMatch(/(auth_token|refresh_token)/))
    });
    it("should login using email",async()=>{
        const res = await App.post("/api/v1/auth/login").send(LoginPayloadWithEmail);        
        expect(res.status).toEqual(200);
        const cookies = res.headers["set-cookie"] as unknown as string[]
        cookies.map(cookie=>expect(cookie).toMatch(/(auth_token|refresh_token)/))
    });

    it("should throw invalid fields error ",async()=>{
        const res = await App.post("/api/v1/auth/login").send({});
        expect(res.status).toEqual(400);
        expect(res.body.title).toEqual('INVALID_FIELDS');
    });

})