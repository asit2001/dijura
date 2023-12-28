"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../../controller/book");
const VerifyUser_1 = require("../../../../middleware/VerifyUser");
const FileUtils_1 = require("../../../../utils/FileUtils");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
class BookRoutes {
    constructor() {
        if (BookRoutes.instance) {
            return BookRoutes.instance;
        }
        this.bookControllerInstance = new book_1.BookController();
        this.fileUploader = (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            fileFilter: FileUtils_1.ONLY_IMAGES_ALLOWED,
        });
        BookRoutes.instance = this;
    }
    getRouter() {
        const router = express_1.default.Router();
        router.route('/all').all(VerifyUser_1.AuthenticateUser).get(this.bookControllerInstance.getAllBooks);
        router.route('/:id').all(VerifyUser_1.AuthenticateUser).get(this.bookControllerInstance.getBook);
        router
            .route('/:id')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .delete(this.bookControllerInstance.removeBook)
            .patch(this.bookControllerInstance.updateBook);
        router
            .route('/:id/upload')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin, this.fileUploader.single('file'))
            .patch(this.bookControllerInstance.updateBookImage);
        router
            .route('/')
            .all(VerifyUser_1.AuthenticateUser, VerifyUser_1.IsAdmin)
            .post(this.bookControllerInstance.createBook);
        return router;
    }
}
exports.default = BookRoutes;
