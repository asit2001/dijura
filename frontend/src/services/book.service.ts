import axios from 'axios';
import APIInstance from '../config/APIInstance';

import { Book, BookResponse } from '@/store/types/bookState';

export default class BookService {
	private static instance: BookService;

	private constructor() {}

	static getInstance(): BookService {
		if (BookService.instance) return BookService.instance;

		return new BookService();
	}
	async getAllBooks() {
		try {
			const { data } = await APIInstance.get('/book/all');

			if (data.success) {
				return Promise.resolve(data.books as BookResponse[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable all books. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title !== 'INTERNAL_SERVER_ERROR') {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async getBookById(id: string) {
		try {
			const { data } = await APIInstance.get('/book/:id'.replace(':id', id));

			if (data.success) {
				return Promise.resolve(data as BookResponse);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get book. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title !== 'INTERNAL_SERVER_ERROR') {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async updateBookById(id: string, details: Partial<Book>) {
		try {
			const { data } = await APIInstance.patch('/book/:id'.replace(':id', id), details);

			if (data.success) {
				return Promise.resolve();
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to update book. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async removeBookById(id: string) {
		try {
			const { data } = await APIInstance.delete('/book/:id'.replace(':id', id));

			if (data.success) {
				return Promise.resolve();
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to remove book. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title !== 'INTERNAL_SERVER_ERROR') {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async createBook(details: Omit<Book, 'imageUrl'>) {
		try {
			const { data } = await APIInstance.post('/book/', details);

			if (data.success) {
				return Promise.resolve(data as BookResponse);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to add book. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title !== 'INTERNAL_SERVER_ERROR') {
						error = message;
					} 
				}
			}
			return Promise.reject(error);
		}
	}
	async uploadBookImage(id: string, file: File) {
		try {
			const fromData = new FormData();
			fromData.append('file', file);
			const { data } = await APIInstance.patch(
				'book/:id/upload'.replace(':id', id),
				fromData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			if (data.success) {
				return Promise.resolve();
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get book. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title !== 'INTERNAL_SERVER_ERROR') {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
}
