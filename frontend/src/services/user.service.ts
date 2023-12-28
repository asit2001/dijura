import axios from 'axios';
import APIInstance from '../config/APIInstance';
import { User } from '@/store/types/userState';

export default class UserService {
	private static instance: UserService;

	private constructor() {}

	static getInstance(): UserService {
		if (UserService.instance) return UserService.instance;

		return new UserService();
	}
	async getProfile() {
		try {
			const { data } = await APIInstance.get('/user');

			if (data.success) {
				return Promise.resolve(data as User);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get profile. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to get profile. Please try again later';
					} else {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async getAllUser() {
		try {
			const { data } = await APIInstance.get('/user/all');

			if (data.success) {
				return Promise.resolve(data.users as User[]);
			}
			throw new Error('');
		} catch (e) {
			let error = 'Unable to get users. Please try again later';
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
