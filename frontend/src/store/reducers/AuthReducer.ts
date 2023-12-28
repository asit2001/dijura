import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import { AuthState } from '../types/AuthState';
import { USER_TYPES } from 'src/config/const';

const initialState: AuthState = {
    phone: '',
    role: USER_TYPES.USER,
    password: '',
    username: '',
    name: '',
    email: '',
    isLoading: false,
    errorSubmittingForm: ''
};

const AuthSlice = createSlice({
	name: StoreNames.AUTH,
	initialState,
	reducers: {
		reset(state) {
			state.email = initialState.email;
			state.errorSubmittingForm = initialState.errorSubmittingForm;
			state.isLoading = initialState.isLoading;
			state.name = initialState.name;
			state.password = initialState.password;
			state.phone = initialState.phone;
			state.role = initialState.role;
			state.username = initialState.username;
		},

		setPhoneNumber(state, actions: PayloadAction<string>) {
			state.phone = actions.payload;
		},
		setRole(state, actions: PayloadAction<USER_TYPES>) {
			state.role = actions.payload;
		},
		setPassword(state, actions: PayloadAction<string>) {
			state.password = actions.payload;
		},
		setUserName(state, actions: PayloadAction<string>) {
			state.username = actions.payload;
		},
		setName(state, actions: PayloadAction<string>) {
			state.name = actions.payload;
		},
		setEmail(state, actions: PayloadAction<string>) {
			state.email = actions.payload;
		},
		setIsLoading(state, actions: PayloadAction<boolean>) {
			state.isLoading = actions.payload;
		},
		setErrorSubmittingForm(state, actions: PayloadAction<string>) {
			state.errorSubmittingForm = actions.payload;
		},
	},
});

export const {
    reset,
    setEmail,
    setName,
    setPassword,
    setPhoneNumber,
    setRole,
    setUserName
} = AuthSlice.actions;

export default AuthSlice.reducer;
