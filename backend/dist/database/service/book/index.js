"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonError_1 = __importDefault(require("../../../errors/internal-error/commonError"));
const internalError_1 = __importDefault(require("../../../errors/internal-error/internalError"));
const book_1 = require("../../repository/book");
const FileUtils_1 = require("../../../utils/FileUtils");
class BookService {
    static async getBookById(id) {
        const book = await book_1.bookModel.findById(id);
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return book;
    }
    static async createBook(BookDetails) {
        const book = await book_1.bookModel.create(BookDetails);
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.INTERNAL_SERVER_ERROR);
        }
        return book;
    }
    static async getBookByName(Name) {
        const book = await book_1.bookModel.find({ name: Name });
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return book;
    }
    static async getBookByAuthor(Author) {
        const book = await book_1.bookModel.find({ author: Author });
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return book;
    }
    static async updateBook(BookDetails, Id) {
        const book = await book_1.bookModel.findById(Id);
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        if (BookDetails.name !== undefined) {
            book.name = BookDetails.name;
        }
        if (BookDetails.author !== undefined) {
            book.author = BookDetails.author;
        }
        if (BookDetails.available !== undefined) {
            book.available = BookDetails.available;
        }
        await book.save();
    }
    static async removeBook(Id) {
        const book = await book_1.bookModel.findByIdAndDelete(Id);
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
    }
    static async getAllBooks() {
        const books = await book_1.bookModel.find({});
        if (books === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
        return books;
    }
    static async updateBookImage(Id, file) {
        const fileUrl = await (0, FileUtils_1.uploadFile)(file);
        const book = await book_1.bookModel.findByIdAndUpdate(Id, { imageUrl: fileUrl });
        if (book === null) {
            throw new internalError_1.default(commonError_1.default.NOT_FOUND);
        }
    }
}
exports.default = BookService;
