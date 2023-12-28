import { TRANSACTION_TYPES, USER_TYPES } from "@/config/const";
import IBook from "@/types/book";
import IUser from "@/types/user";
import { Document } from "mongoose";
import {addDays} from "date-fns"
export const adminPayload: Omit<IUser, keyof Document> = {
	phone: 1234567890,
	role: USER_TYPES.ADMIN,
	password: 'admin1234',
	username: 'admin123',
	name: 'admin',
	email: 'admin@gmail.com',
};

export const newUserPayload: Omit<IUser, keyof Document> = {
	phone: 11111111111,
	role: USER_TYPES.USER,
	password: 'aaaaaaaaaaaaa',
	username: 'a123456',
	name: 'aaaaa',
	email: 'aaaaa@gmail.com',
};
export const bookPayload: Omit<IBook, keyof Document> = {
	name: 'react',
	author: 'asit biswas',
	available: true,
};
export const updateBookPayload: Omit<IBook, keyof Document> = {
	name: 'nodejs',
	author: 'asit biswas',
	available: true,
};

export function transactionBorrow(userID:string,bookID:String){
	const transactionPayload = {
		user: userID,
		book: bookID,
		dueDate: addDays(new Date(),5),
		transactionType: TRANSACTION_TYPES.BORROWED
	}
	return transactionPayload;
}
export function transactionReturn(userID:string,bookID:String){
	const transactionPayload = {
		user: userID,
		book: bookID,
		dueDate: new Date(),
		transactionType: TRANSACTION_TYPES.RETURNED
	}
	return transactionPayload;
}