import { Document } from 'mongoose';
import IUser from '../user';
import IBook from '../book';
import { TRANSACTION_TYPES } from '@/config/const';

export default interface ITransaction extends Document {
	user: IUser;
	book: IBook;
	dueDate: Date;
	transactionType: TRANSACTION_TYPES;
}
