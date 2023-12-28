import axios from 'axios';
import APIInstance from '../config/APIInstance';
import { LoginProps, SignUpProps } from '@/store/types/AuthState';
import { USER_TYPES } from 'src/config/const';
import { User } from '@/store/types/userState';

export default class AuthService {
	private static instance: AuthService;

	private constructor() {}

	static getInstance(): AuthService {
		if (AuthService.instance) return AuthService.instance;

		return new AuthService();
	}
	async login(details: LoginProps) {
		try {
			const { data } = await APIInstance.post('/auth/login', {
				email: details.email,
				password: details.password,
				role: USER_TYPES.USER,
			});
			if (data.success) {
				return Promise.resolve(data as User);
			} else {
				throw new Error('Unable to login. Please try again later');
			}
		} catch (e) {
			let error = 'Unable to login. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to login. Please try again later';
					} else {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async adminLogin(details: LoginProps) {
		try {
			const { data } = await APIInstance.post('/auth/login', {
				email: details.email,
				password: details.password,
				role: USER_TYPES.ADMIN,
			});
			if (data.success) {
				return Promise.resolve(data as User);
			} else {
				throw new Error('Unable to login. Please try again later');
			}
		} catch (e) {
			let error = 'Unable to login. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to login. Please try again later';
					} else {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}

	async refreshToken(): Promise<boolean> {
		try {
			const res = await APIInstance.post('/auth/refresh-token');

			return res.data.success;
		} catch (e) {
			return false;
		}
	}

	async logout() {
		try {
			await APIInstance.post('/auth/logout');
		} catch (e) {
			let error = 'unable to logout.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection.';
				}
				if (e.response) {
					error = 'Unable to logout. Please try again later.';
				}
			}
			return Promise.reject(error);
		}
	}
	async adminRegister(details: Omit<SignUpProps, 'role'>) {
		const payload = {
			email: details.email,
			name: details.name,
			password: details.password,
			phone: Number.parseInt(details.phone),
			role: USER_TYPES.ADMIN,
			username: details.username,
		};
		try {
			const { data } = await APIInstance.post('/auth/signup', payload);
			if (data.success) {
				return Promise.resolve();
			} else {
				throw new Error('');
			}
		} catch (e) {
			let error = 'Unable to sign up. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to sign up. Please try again later';
					} else {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
	async register(details: Omit<SignUpProps, 'role'>) {
		const payload = {
			email: details.email,
			name: details.name,
			password: details.password,
			phone: Number.parseInt(details.phone),
			role: USER_TYPES.USER,
			username: details.username,
		};

		try {
			const { data } = await APIInstance.post('/auth/signup', payload);
			if (data.success) {
				return Promise.resolve();
			} else {
				throw new Error('');
			}
		} catch (e) {
			let error = 'Unable to sign up. Please try again later';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title, message } = e.response.data;
					if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to sign up. Please try again later';
					} else {
						error = message;
					}
				}
			}
			return Promise.reject(error);
		}
	}
}
