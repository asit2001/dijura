"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const const_1 = require("../../../../config/const");
const ApiError_1 = __importDefault(require("../../../../errors/api-error/ApiError"));
const commonError_1 = __importDefault(require("../../../../errors/internal-error/commonError"));
const serverError_1 = __importDefault(require("../../../../errors/serverError"));
const transaction_1 = __importDefault(require("../../../../database/service/transaction"));
const expressUtils_1 = require("../../../../utils/expressUtils");
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
const dateUtils_1 = require("../../../../utils/dateUtils");
class TransactionController {
    constructor() {
        if (TransactionController.instance) {
            return TransactionController.instance;
        }
        TransactionController.instance = this;
    }
    async getTransitionsByUserId(req, res, next) {
        try {
            const id = req.locals.user_id;
            if (!id) {
                throw new ApiError_1.default(commonError_1.default.NOT_FOUND);
            }
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new ApiError_1.default(commonError_1.default.INVALID_ID);
            }
            const transactions = await transaction_1.default.getTransactionByUserId(new mongoose_1.Types.ObjectId(id));
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: {
                    transactions: transactions.map(({ user, book, id, dueDate, transactionType }) => ({
                        user,
                        book,
                        id,
                        dueDate,
                        transactionType,
                    })),
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
    async creteTransition(req, res, next) {
        try {
            const validator = zod_1.default.object({
                book: zod_1.default.string(),
                user: zod_1.default.string(),
                dueDate: zod_1.default.string().optional(),
                transactionType: zod_1.default.enum([const_1.TRANSACTION_TYPES.BORROWED, const_1.TRANSACTION_TYPES.RETURNED]),
            });
            const validatorResult = validator.safeParse(req.body);
            if (validatorResult.success === false ||
                !mongoose_1.Types.ObjectId.isValid(req.body.user) ||
                !mongoose_1.Types.ObjectId.isValid(req.body.book)) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            if (req.body.dueDate && !(0, dateUtils_1.isDateAfterAndEqualToday)(req.body.dueDate)) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            const { user, book, id, dueDate, transactionType } = await transaction_1.default.createTransaction(req.body);
            return (0, expressUtils_1.Respond)({
                res,
                status: 201,
                data: { user, book, id, dueDate, transactionType },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async getTransitionByID(req, res, next) {
        try {
            const Id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(Id) === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_ID);
            }
            const { user, book, id, dueDate, transactionType } = await transaction_1.default.getTransactionById(new mongoose_1.Types.ObjectId(Id));
            return (0, expressUtils_1.Respond)({
                res,
                status: 201,
                data: { user, book, id, dueDate, transactionType },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async getAllTransitions(req, res, next) {
        try {
            const transactions = await transaction_1.default.getAllTransactions();
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: { transactions: transactions.map(({ user, book, id, dueDate, transactionType }) => ({
                        user,
                        book,
                        id,
                        dueDate,
                        transactionType,
                    })), },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async getAllBorrowedTransitions(req, res, next) {
        try {
            const transactions = await transaction_1.default.getAllBorrowedTransaction();
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: { transactions: transactions.map(({ user, book, id, dueDate, transactionType }) => ({
                        user,
                        book,
                        id,
                        dueDate,
                        transactionType,
                    })), },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async getAllReturnedTransitions(req, res, next) {
        try {
            const transactions = await transaction_1.default.getAllReturnedTransaction();
            return (0, expressUtils_1.Respond)({
                res,
                status: 200,
                data: { transactions: transactions.map(({ user, book, id, dueDate, transactionType }) => ({
                        user,
                        book,
                        id,
                        dueDate,
                        transactionType,
                    })), },
            });
        }
        catch (err) {
            if (err instanceof serverError_1.default) {
                return next(err);
            }
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
    async updateTransitionType(req, res, next) {
        try {
            const id = req.params.id;
            const validator = zod_1.default.object({
                transactionType: zod_1.default.enum([const_1.TRANSACTION_TYPES.BORROWED, const_1.TRANSACTION_TYPES.RETURNED]),
            });
            const validatorResult = validator.safeParse(req.body);
            if (mongoose_1.Types.ObjectId.isValid(id) === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_ID);
            }
            if (validatorResult.success === false) {
                throw new ApiError_1.default(commonError_1.default.INVALID_FIELDS);
            }
            await transaction_1.default.updateTransactionType(new mongoose_1.Types.ObjectId(id), req.body.transactionType);
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
            return next(new ApiError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR, err));
        }
    }
}
exports.TransactionController = TransactionController;
