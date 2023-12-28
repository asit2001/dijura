import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import { User, userState } from '../types/userState';
import { USER_TYPES } from 'src/config/const';

const initialState: userState = {
	user: {
		phone: 0,
		username: '',
		name: '',
		email: '',
		id: '',
		role: USER_TYPES.USER,
	},
	errorFetchingUserDetails: '',
	isLoading: false,
	users: [],
	profile: {
		phone: 0,
		username: '',
		name: '',
		email: '',
		id: '',
		role: USER_TYPES.USER,
	}
};

const UserSlice = createSlice({
	name: StoreNames.USER,
	initialState,
	reducers: {
		reset: (state) => {
			state.user = initialState.user;
			state.errorFetchingUserDetails = initialState.errorFetchingUserDetails;
			state.isLoading = initialState.isLoading;
			state.users = initialState.users;
			state.profile = initialState.profile;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},

		setErrorFetchingUserDetails: (state, action: PayloadAction<string>) => {
			state.errorFetchingUserDetails = action.payload;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
		},
		setProfile(state,action:PayloadAction<User>){
			state.profile = action.payload;
		}
	},
});

export const { reset, setErrorFetchingUserDetails, setUser, setIsLoading, setUsers,setProfile } =
	UserSlice.actions;

export default UserSlice.reducer;
