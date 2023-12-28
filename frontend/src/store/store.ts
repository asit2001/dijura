import { configureStore } from '@reduxjs/toolkit';

import { StoreNames } from './config';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import BookReducer from './reducers/BookReducer';
import OtherReducer from './reducers/OtherReducer';
import TransactionReducer from './reducers/TransactionReducer';


const store = configureStore({
	reducer: {
		[StoreNames.AUTH] : AuthReducer,
		[StoreNames.USER] : UserReducer,
		[StoreNames.BOOK]: BookReducer,
		[StoreNames.OTHER]:OtherReducer,
		[StoreNames.TRANSACTION]:TransactionReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
