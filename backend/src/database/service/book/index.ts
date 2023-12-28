import COMMON_ERRORS from '@/error/internal-error/commonError';
import InternalError from '@/error/internal-error/internalError';
import { bookModel } from '@/repo/book';
import IBook from '@/types/book';
import { uploadFile } from '@/utils/FileUtils';
import { Types } from 'mongoose';


export default class BookService {
	static async getBookById(id: Types.ObjectId) {
		const book = await bookModel.findById(id);
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return book;
	}
	static async createBook(BookDetails: IBook) {
		const book = await bookModel.create(BookDetails);
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.INTERNAL_SERVER_ERROR);
		}
		return book;
	}
	static async getBookByName(Name: string) {
		const book = await bookModel.find({ name: Name });
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return book;
	}
	static async getBookByAuthor(Author: string) {
		const book = await bookModel.find({ author: Author });
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return book;
	}
	static async updateBook(BookDetails: Partial<IBook>, Id: Types.ObjectId) {
		const book = await bookModel.findById(Id);
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
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
	static async removeBook(Id: Types.ObjectId) {
		const book = await bookModel.findByIdAndDelete(Id);
		if (book === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
	}
	static async getAllBooks() {
		const books = await bookModel.find({});
		if (books === null) {
			throw new InternalError(COMMON_ERRORS.NOT_FOUND);
		}
		return books;
	}
	static async updateBookImage(Id: Types.ObjectId, file: Express.Multer.File) {
		const fileUrl = await uploadFile(file);
        const book = await bookModel.findByIdAndUpdate(Id,{imageUrl:fileUrl});
		
        if (book === null) {
            throw new InternalError(COMMON_ERRORS.NOT_FOUND);
        }
        
	}
}
