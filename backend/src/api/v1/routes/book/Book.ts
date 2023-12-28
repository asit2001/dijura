import { BookController } from '@/controller/book';
import { AuthenticateUser, IsAdmin } from '@/middleware/VerifyUser';
import { ONLY_IMAGES_ALLOWED } from '@/utils/FileUtils';
import express from 'express';
import multer, { Multer } from 'multer';

export default class BookRoutes {
	private static instance: BookRoutes;
	private bookControllerInstance: BookController;
	private fileUploader: Multer;
	constructor() {
		if (BookRoutes.instance) {
			return BookRoutes.instance;
		}
		this.bookControllerInstance = new BookController();
		this.fileUploader = multer({
			storage: multer.memoryStorage(),
			fileFilter: ONLY_IMAGES_ALLOWED,
		});
		BookRoutes.instance = this;
	}
	getRouter() {
		const router = express.Router();
		router.route('/all').all(AuthenticateUser).get(this.bookControllerInstance.getAllBooks);

		router.route('/:id').all(AuthenticateUser).get(this.bookControllerInstance.getBook);

		router
			.route('/:id')
			.all(AuthenticateUser, IsAdmin)
			.delete(this.bookControllerInstance.removeBook)
			.patch(this.bookControllerInstance.updateBook);

		router
			.route('/:id/upload')
			.all(AuthenticateUser, IsAdmin,this.fileUploader.single('file'))
			.patch(this.bookControllerInstance.updateBookImage);

		router
			.route('/')
			.all(AuthenticateUser, IsAdmin)
			.post(this.bookControllerInstance.createBook);

		return router;
	}
}
