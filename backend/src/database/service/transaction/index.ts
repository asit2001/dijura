import { TRANSACTION_TYPES } from '@/config/const';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import InternalError from '@/error/internal-error/internalError';
import { transactionModal } from '@/repo/transaction';
import ITransaction from '@/types/transaction';
import { Types } from 'mongoose';

export default class TransactionService {
	static async getTransactionByUserId(UserId: Types.ObjectId) {
		const transactions = await transactionModal
			.find({ user: UserId })
			.populate({
				path: 'user',
				select: 'username email phone id name role',
			})
			.populate({
				path: 'book',
				select: 'id name author available imageUrl',
			});
		if (transactions === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return transactions;
	}
	static async getTransactionById(Id: Types.ObjectId) {
		const transaction = await transactionModal
			.findById(Id)
			.populate({
				path: 'user',
				select: 'username email phone id name role',
			})
			.populate({
				path: 'book',
				select: 'id name author available imageUrl',
			});
		if (transaction === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return transaction;
	}
	static async createTransaction(Transaction: ITransaction) {
		const transaction = await transactionModal.create(Transaction);
		if (transaction === null) {
			throw new InternalError(COMMON_ERRORS.INTERNAL_SERVER_ERROR);
		}
		return transaction;
	}
	static async getAllTransactions() {
		const transactions = await transactionModal
			.find({})
			.populate({
				path: 'user',
				select: 'username email phone id name role',
			})
			.populate({
				path: 'book',
				select: 'id name author available imageUrl',
			});
		if (transactions === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return transactions;
	}
	static async getAllBorrowedTransaction() {
		const transactions = await transactionModal
			.find({ transactionType: TRANSACTION_TYPES.BORROWED })
			.populate({
				path: 'user',
				select: 'username email phone id name role',
			})
			.populate({
				path: 'book',
				select: 'id name author available imageUrl',
			});
		if (transactions === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return transactions;
	}
	static async getAllReturnedTransaction() {
		const transactions = await transactionModal
			.find({ transactionType: TRANSACTION_TYPES.RETURNED })
			.populate({
				path: 'user',
				select: 'username email phone id name role',
			})
			.populate({
				path: 'book',
				select: 'id name author available imageUrl',
			});
		if (transactions === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return transactions;
	}
	static async updateTransactionType(id: Types.ObjectId, transactionType: TRANSACTION_TYPES) {
		const transaction = await transactionModal.findByIdAndUpdate(id, {
			transactionType: transactionType,
		});
		if (transaction === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
	}
}
