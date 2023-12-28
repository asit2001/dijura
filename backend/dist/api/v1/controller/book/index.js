"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const ApiError_1 = __importDefault(require("../../../../errors/api-error/ApiError"));
const commonError_1 = __importDefault(require("../../../../errors/internal-error/commonError"));
const serverError_1 = __importDefault(require("../../../../errors/serverError"));
const book_1 = __importDefault(require("../../../../database/service/book"));
const expressUtils_1 = require("../../../../utils/expressUtils");
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
class BookController {
    constructor() {
        if (BookController.instance) {
            return BookController.instance;
        }
        BookController.instance = this;
    }
    async getAllBooks(req, res, next) {
        try {
            const books = await book_1.default.getAllBooks();
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {
                    books: books.map(({ name, author, available, id, imageUrl }) => ({
                        name,
                        author,
                        available,
                        id,
                        imageUrl
                    })),
                },
            });
        }
        catch (error) {
            if (error instanceof serverError_1.default) {
                return next(error);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, error));
        }
    }
    async getBook(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new ApiError_1.default(commonError_1.default.NOT_FOUND);
            }
            if (mongoose_1.Types.ObjectId.isValid(id) === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_ID);
            }
            const book = await book_1.default.getBookById(new mongoose_1.Types.ObjectId(id));
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {
                    name: book.name,
                    id: book.id,
                    author: book.author,
                    available: book.available,
                    imageUrl: book.imageUrl
                },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async createBook(req, res, next) {
        try {
            const validator = zod_1.default.object({
                name: zod_1.default.string().min(3).max(100),
                author: zod_1.default.string().min(3).max(100),
                available: zod_1.default.boolean(),
            });
            const validatorResult = validator.safeParse(req.body);
            if (validatorResult.success === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            const { id, author, available, name, imageUrl } = await book_1.default.createBook(req.body);
            return (0, expressUtils_1.Respond)({
                res,
                status: 201,
                data: { id, author, available, name, imageUrl },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async removeBook(req, res, next) {
        try {
            const id = req.params.id;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new ApiError_1.default(commonError_1.default.INVALID_ID);
            }
            await book_1.default.removeBook(new mongoose_1.Types.ObjectId(id));
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {},
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async updateBook(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new ApiError_1.default(commonError_1.default.NOT_FOUND);
            }
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new ApiError_1.default(commonError_1.default.NOT_FOUND);
            }
            const validator = zod_1.default.object({
                name: zod_1.default.string().min(3).max(100).optional(),
                author: zod_1.default.string().min(3).max(100).optional(),
                available: zod_1.default.boolean().optional(),
            });
            const validatorResult = validator.safeParse(req.body);
            if (validatorResult.success === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            await book_1.default.updateBook(req.body, new mongoose_1.Types.ObjectId(id));
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {},
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async updateBookImage(req, res, next) {
        try {
            const id = req.params.id;
            if (id === undefined || !mongoose_1.Types.ObjectId.isValid(id) || req.file === undefined) {
                throw new ApiError_1.default(commonError_1.default.NOT_FOUND);
            }
            await book_1.default.updateBookImage(new mongoose_1.Types.ObjectId(id), req.file);
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {},
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
}
exports.BookController = BookController;
