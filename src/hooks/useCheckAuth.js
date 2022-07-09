import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase';
import { login, logout } from '../store/auth';
import { LoadingNotes } from '../store/journal';

export function useCheckAuth() {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (!user) return dispatch(logout());

			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(LoadingNotes(uid));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { status };
}
