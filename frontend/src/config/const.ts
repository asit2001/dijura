export const IS_PRODUCTION = import.meta.env.PROD
export const BASE_URL = import.meta.env.BASE_URL
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