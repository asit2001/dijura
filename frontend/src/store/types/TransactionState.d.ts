import { TRANSACTION_TYPES } from '../config';
import { BookResponse } from './bookState';
import { User } from './userState';

export interface TransactionState {
    transactions:Transaction[],
    transaction:TransactionProps,
    borrowedTransactions:Transaction[],
    returnedTransactions:Transaction[],
    userTransactions:Transaction[],
    filteredUserTransactions:Transaction[]
}
export interface Transaction {
    id:string
	user: User;
	book: BookResponse;
	dueDate: Date;
	transactionType: TRANSACTION_TYPES;
}
export interface TransactionProps{
    id:string
    user: string;
	book: string;
	dueDate?: Date;
	transactionType: TRANSACTION_TYPES;
}