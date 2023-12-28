export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const BASE_URL = window.location.href
export enum USER_TYPES {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	ADMIN:'/admin',
	REGISTER:'/register',
	ADMIN_LOGIN:'/admin/login',
	ADMIN_REGISTER:'/admin/register',
	TRANSACTION:'/transaction'
};
const url = new URL(IS_PRODUCTION?BASE_URL:'http://localhost:5000');
url.pathname = '/api/v1';

export const SERVER_URL= url.href
export const dropDownOptions = [
	{
		available: 'YES',
	},
	{
		available: 'NO',
	},
];