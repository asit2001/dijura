import { TransactionController } from '@/controller/transaction';
import { AuthenticateUser, IsAdmin, IsUser } from '@/middleware/VerifyUser';
import express from 'express';

export default class TransactionRoutes {
	private static instance: TransactionRoutes;
	private transactionControllerInstance: TransactionController;
	constructor() {
		if (TransactionRoutes.instance) {
			return TransactionRoutes.instance;
		}
		this.transactionControllerInstance = new TransactionController();
		TransactionRoutes.instance = this;
	}
	getRouter() {
		const router = express.Router();
		router
			.route('/')
			.all(AuthenticateUser)
			.get(this.transactionControllerInstance.getTransitionsByUserId);
		router
			.route('/')
			.all(AuthenticateUser, IsAdmin)
			.post(this.transactionControllerInstance.creteTransition);
		router
			.route('/all')
			.all(AuthenticateUser, IsAdmin)
			.get(this.transactionControllerInstance.getAllTransitions);

		router
			.route('/borrowed')
			.all(AuthenticateUser, IsAdmin)
			.get(this.transactionControllerInstance.getAllBorrowedTransitions);
		router
			.route('/returned')
			.all(AuthenticateUser, IsAdmin)
			.get(this.transactionControllerInstance.getAllReturnedTransitions);
		router
			.route('/:id')
			.all(AuthenticateUser, IsAdmin)
			.get(this.transactionControllerInstance.getTransitionByID)
			.patch(this.transactionControllerInstance.updateTransitionType);
		return router;
	}
}
