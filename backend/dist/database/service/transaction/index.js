"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../../config/const");
const commonError_1 = __importDefault(require("../../../errors/internal-error/commonError"));
const internalError_1 = __importDefault(require("../../../errors/internal-error/internalError"));
const transaction_1 = require("../../repository/transaction");
class TransactionService {
    static async getTransactionByUserId(UserId) {
        const transactions = await transaction_1.transactionModal
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
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return transactions;
    }
    static async getTransactionById(Id) {
        const transaction = await transaction_1.transactionModal
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
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return transaction;
    }
    static async createTransaction(Transaction) {
        const transaction = await transaction_1.transactionModal.create(Transaction);
        if (transaction === null) {
            throw new internalError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR);
        }
        return transaction;
    }
    static async getAllTransactions() {
        const transactions = await transaction_1.transactionModal
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
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return transactions;
    }
    static async getAllBorrowedTransaction() {
        const transactions = await transaction_1.transactionModal
            .find({ transactionType: const_1.TRANSACTION_TYPES.BORROWED })
            .populate({
            path: 'user',
            select: 'username email phone id name role',
        })
            .populate({
            path: 'book',
            select: 'id name author available imageUrl',
        });
        if (transactions === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return transactions;
    }
    static async getAllReturnedTransaction() {
        const transactions = await transaction_1.transactionModal
            .find({ transactionType: const_1.TRANSACTION_TYPES.RETURNED })
            .populate({
            path: 'user',
            select: 'username email phone id name role',
        })
            .populate({
            path: 'book',
            select: 'id name author available imageUrl',
        });
        if (transactions === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return transactions;
    }
    static async updateTransactionType(id, transactionType) {
        const transaction = await transaction_1.transactionModal.findByIdAndUpdate(id, {
            transactionType: transactionType,
        });
        if (transaction === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
    }
}
exports.default = TransactionService;
