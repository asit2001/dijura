import React, { useEffect } from 'react';
import AuthService from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/reducers/UserReducer';
import UserService from '@/services/user.service';
import { USER_TYPES } from '@/config/const';

export function useAuth() {
	const [isLoggedIn, setLoggedIn] = React.useState(false);
	const [isLoading, setLoading] = React.useState(true);
	const [isAdmin, setIsAdmin] = React.useState(false);
	const dispatch = useDispatch();

	const checkLoginStatus = async () => {
		setLoading(true);
		try {
			const logged = await AuthService.getInstance().refreshToken();

			setLoggedIn(logged);
			if (logged) {
				const user = await UserService.getInstance().getProfile();
				setIsAdmin(user.role === USER_TYPES.ADMIN);
				dispatch(setUser(user));
			}
		} catch (err: unknown) {
			
			setLoggedIn(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkLoginStatus();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isLoggedIn, isLoading, isAdmin };
}
