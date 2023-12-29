import { TRANSACTION_TYPES } from '@/config/const';
import APIError from '@/error/api-error/ApiError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import ServerError from '@/error/serverError';
import TransactionService from '@/service/transaction';
import { LocalRequest } from '@/types/local';
import { Respond } from '@/utils/expressUtils';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import z from 'zod';
import { isDateAfterAndEqualToday } from '@/utils/dateUtils';

export class TransactionController {
	private static instance: TransactionController;

	constructor() {
		if (TransactionController.instance) {
			return TransactionController.instance;
		}
		TransactionController.instance = this;
	}
	async getTransitionsByUserId(req: LocalRequest, res: Response, next: NextFunction) {
		try {
			const id = req.locals.user_id;
			if (!id) {
				throw new APIError(COMMON_ERRORS.NOT_FOUND);
			}
			if (!Types.ObjectId.isValid(id)) {
				throw new APIError(COMMON_ERRORS.INVALID_ID);
			}
			const transactions = await TransactionService.getTransactionByUserId(
				new Types.ObjectId(id)
			);

			return Respond({
				res,
				status: 200,
				data: {
					transactions: transactions.map(
						({ user, book, id, dueDate, transactionType,issueDate }) => ({
							user,
							book,
							id,
							dueDate,
							transactionType,
							issueDate,
						})
					),
				},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async creteTransition(req: Request, res: Response, next: NextFunction) {
		try {
			const validator = z.object({
				book: z.string(),
				user: z.string(),
				dueDate: z.string().optional(),
				transactionType: z.enum([TRANSACTION_TYPES.BORROWED, TRANSACTION_TYPES.RETURNED]),
			});
			const validatorResult = validator.safeParse(req.body);

			if (
				validatorResult.success === false ||
				!Types.ObjectId.isValid(req.body.user) ||
				!Types.ObjectId.isValid(req.body.book)
			) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}

			if (req.body.dueDate && !isDateAfterAndEqualToday(req.body.dueDate)) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}

			const { user, book, id, dueDate, transactionType,issueDate } =
				await TransactionService.createTransaction(req.body);
			return Respond({
				res,
				status: 201,
				data: { user, book, id, dueDate, transactionType,issueDate },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async getTransitionByID(req: Request, res: Response, next: NextFunction) {
		try {
			const Id = req.params.id;

			if (Types.ObjectId.isValid(Id) === false) {
				throw new APIError(COMMON_ERRORS.INVALID_ID);
			}
			const { user, book, id, dueDate, transactionType,issueDate } =
				await TransactionService.getTransactionById(new Types.ObjectId(Id));
			return Respond({
				res,
				status: 201,
				data: { user, book, id, dueDate, transactionType,issueDate },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async getAllTransitions(req: Request, res: Response, next: NextFunction) {
		try {
			const transactions = await TransactionService.getAllTransactions();

			return Respond({
				res,
				status: 200,
				data: { transactions: transactions.map(
					({ user, book, id, dueDate, transactionType,issueDate }) => ({
						user,
						book,
						id,
						dueDate,
						transactionType,
						issueDate
					})
				), },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async getAllBorrowedTransitions(req: Request, res: Response, next: NextFunction) {
		try {			
			const transactions = await TransactionService.getAllBorrowedTransaction();
			return Respond({
				res,
				status: 200,
				data: { transactions:transactions.map(
					({ user, book, id, dueDate, transactionType,issueDate }) => ({
						user,
						book,
						id,
						dueDate,
						transactionType,
						issueDate
					})
				), },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async getAllReturnedTransitions(req: Request, res: Response, next: NextFunction) {
		try {
			const transactions = await TransactionService.getAllReturnedTransaction();
			return Respond({
				res,
				status: 200,
				data: { transactions:transactions.map(
					({ user, book, id, dueDate, transactionType,issueDate }) => ({
						user,
						book,
						id,
						dueDate,
						transactionType,
						issueDate
					})
				), },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async updateTransitionType(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const validator = z.object({
				transactionType: z.enum([TRANSACTION_TYPES.BORROWED, TRANSACTION_TYPES.RETURNED]),
			});
			const validatorResult = validator.safeParse(req.body);

			if (Types.ObjectId.isValid(id) === false) {
				throw new APIError(COMMON_ERRORS.INVALID_ID);
			}
			if (validatorResult.success === false) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}
			await TransactionService.updateTransactionType(
				new Types.ObjectId(id),
				req.body.transactionType
			);

			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
}
