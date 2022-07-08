import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase';
import { login, logout } from '../store/auth';

export function useCheckAuth() {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(login({ uid, email, displayName, photoURL }));
			} else {
				dispatch(logout());
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { status };
}
