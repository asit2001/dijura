import UserService from '@/service/user.service';
import { setProfile, setUsers } from '@/store/reducers/UserReducer';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store';

export function useUsers() {
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const getAllUser = async () => {
		setLoading(true);
		try {
			const users = await UserService.getInstance().getAllUser();
			dispatch(setUsers(users));
		} catch (err: unknown) {
            if (typeof err === 'string') {
                setError(err);
            }
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllUser();
	}, []);
	return { isLoading, error };
}
export function useProfile() {
	const [isLoading, setLoading] = useState(true);
	const {profile} = useSelector((state:StoreState)=>state.user)
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const getProfile = async () => {
		setLoading(true);
		
		try {
			const user = await UserService.getInstance().getProfile();
			dispatch(setProfile(user));
		} catch (err: unknown) {
            if (typeof err === 'string') {
                setError(err);
            }
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (profile.name === '') {
			getProfile();
		}
	}, []);
	return { isLoading, error };
}
