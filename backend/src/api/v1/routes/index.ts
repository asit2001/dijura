import express from 'express';
import AuthRoutes from './user/Auth';
import UserRoutes from './user/User';
import BookRoutes from './book/Book';
import TransactionRoutes from './transaction/Transaction';

const router = express.Router();

router.use('/auth', new AuthRoutes().getRouter());
router.use('/user', new UserRoutes().getRouter());
router.use('/book', new BookRoutes().getRouter());
router.use('/transaction', new TransactionRoutes().getRouter());

export default router;
