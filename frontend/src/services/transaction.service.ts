import axios from 'axios';
import APIInstance from '../config/APIInstance';
import { Transaction,TransactionProps } from '@/store/types/TransactionState';
import { TRANSACTION_TYPES } from '@/store/config';

export default class TransactionService {
	private static instance: TransactionService;

	private constructor() {}

	static getInstance(): TransactionService {
		if (TransactionService.instance) return TransactionService.instance;

		return new TransactionService();
	}
	async getAllTransaction() {
		try {
			const { data } = await APIInstance.get('/transaction/all');

			if (data.success) {
				return Promise.resolve(data.transactions as Transaction[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get all transactions. Please try again later';
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
	async getUserTransaction() {
		try {
			const { data } = await APIInstance.get('/transaction/');

			if (data.success) {
				return Promise.resolve(data.transactions as Transaction[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get transactions. Please try again later';
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
	async getBorrowedTransaction() {
		try {
			const { data } = await APIInstance.get('/transaction/borrowed');

			if (data.success) {
				return Promise.resolve(data.transactions as Transaction[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get borrowed books transactions. Please try again later';
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
	async getReturnedTransaction() {
		try {
			const { data } = await APIInstance.get('/transaction/returned');

			if (data.success) {
				return Promise.resolve(data.transactions as Transaction[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get borrowed books transactions. Please try again later';
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
	async getTransactionByID(id: string) {
		try {
			const { data } = await APIInstance.get('/transaction/:id'.replace(':id', id));

			if (data.success) {
				return Promise.resolve(data as Transaction);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get borrowed books transactions. Please try again later';
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
	async updateTransactionByID(id: string, transactionType: TRANSACTION_TYPES) {
		try {
			const { data } = await APIInstance.patch('/transaction/:id'.replace(':id', id), {
				transactionType: transactionType,
			});

			if (data.success) {
				return Promise.resolve();
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to update transactions. Please try again later';
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
    async createTransaction(details:Omit<TransactionProps,'id'>) {
		try {
			const { data } = await APIInstance.post('/transaction/',details);

			if (data.success) {
				return Promise.resolve(data as Transaction);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to create transactions. Please try again later';
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
