import { USER_TYPES } from '@/config/const';
import APIError from '@/error/api-error/ApiError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
import ServerError from '@/error/serverError';
import BookService from '@/service/book';
import { Respond } from '@/utils/expressUtils';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import z from 'zod';

export class BookController {
	private static instance: BookController;

	constructor() {
		if (BookController.instance) {
			return BookController.instance;
		}
		BookController.instance = this;
	}

	async getAllBooks(req: Request, res: Response, next: NextFunction) {
		try {
			const books = await BookService.getAllBooks();

			return Respond({
				res,
				status: 200,
				data: {
					books: books.map(({ name, author, available, id,imageUrl }) => ({
						name,
						author,
						available,
						id,
						imageUrl
					})),
				},
			});
		} catch (error) {
			if (error instanceof ServerError) {
				return next(error);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, error));
		}
	}
	async getBook(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!id) {
				throw new APIError(COMMON_ERRORS.NOT_FOUND);
			}
			if (Types.ObjectId.isValid(id) === false) {
				throw new APIError(COMMON_ERRORS.INVALID_ID);
			}

			const book = await BookService.getBookById(new Types.ObjectId(id));
			return Respond({
				res,
				status: 200,
				data: {
					name: book.name,
					id: book.id,
					author: book.author,
					available: book.available,
					imageUrl:book.imageUrl
				},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			return next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async createBook(req: Request, res: Response, next: NextFunction) {
		try {
			const validator = z.object({
				name: z.string().min(3).max(100),
				author: z.string().min(3).max(100),
				available: z.boolean(),
			});
			const validatorResult = validator.safeParse(req.body);
			if (validatorResult.success === false) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}
			const { id, author, available, name,imageUrl } = await BookService.createBook(req.body);

			return Respond({
				res,
				status: 201,
				data: { id, author, available, name,imageUrl },
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async removeBook(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!Types.ObjectId.isValid(id)) {
				throw new APIError(COMMON_ERRORS.INVALID_ID);
			}
			await BookService.removeBook(new Types.ObjectId(id));
			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async updateBook(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!id) {
				throw new APIError(COMMON_ERRORS.NOT_FOUND);
			}
			if (!Types.ObjectId.isValid(id)) {
				throw new APIError(COMMON_ERRORS.NOT_FOUND);
			}
			const validator = z.object({
				name: z.string().min(3).max(100).optional(),
				author: z.string().min(3).max(100).optional(),
				available: z.boolean().optional(),
			});
			const validatorResult = validator.safeParse(req.body);
			if (validatorResult.success === false) {
				throw new APIError(COMMON_ERRORS.INVALID_FIELDS);
			}
			await BookService.updateBook(req.body, new Types.ObjectId(id));
			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
	async updateBookImage(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (id === undefined || !Types.ObjectId.isValid(id) || req.file === undefined) {
				throw new APIError(COMMON_ERRORS.NOT_FOUND);
			}
			
			await BookService.updateBookImage(new Types.ObjectId(id), req.file);
			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			if (err instanceof ServerError) {
				return next(err);
			}
			next(new APIError(COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}
}
