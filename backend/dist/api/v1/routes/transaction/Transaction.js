"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../controller/transaction");
const VerifyUser_1 = require("../../../../middleware/VerifyUser");
const express_1 = __importDefault(require("express"));
class TransactionRoutes {
    constructor() {
        if (TransactionRoutes.instance) {
            return TransactionRoutes.instance;
        }
        this.transactionControllerInstance = new transaction_1.TransactionController();
        TransactionRoutes.instance = this;
    }
    getRouter() {
        const router = express_1.default.Router();
        router
            .route('/')
            .all(VerifyUser_1.AuthenticateUser)
            .get(this.transactionControllerInstance.getTransitionsByUserId);
        router
            .route('/')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .post(this.transactionControllerInstance.creteTransition);
        router
            .route('/all')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .get(this.transactionControllerInstance.getAllTransitions);
        router
            .route('/borrowed')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .get(this.transactionControllerInstance.getAllBorrowedTransitions);
        router
            .route('/returned')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .get(this.transactionControllerInstance.getAllReturnedTransitions);
        router
            .route('/:id')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .get(this.transactionControllerInstance.getTransitionByID)
            .patch(this.transactionControllerInstance.updateTransitionType);
        return router;
    }
}
exports.default = TransactionRoutes;
