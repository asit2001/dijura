import { USER_TYPES } from "@/config/const";
import { Document, Types } from "mongoose";
import IUser from "../user";
import { Request } from "express";

export interface Locals {
	role: USER_TYPES;
	user_id: Types.ObjectId;
	user: Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId };
	auth_token: string;
	refresh_token: string;
}
export interface LocalRequest extends Request{
    locals:Locals
}