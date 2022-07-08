import { registerUserWithEmaiPassword, signInWithGoogle } from '../../firebase';
import { checkingCredencial, login, logout } from './authSlice';

export function checkingAuthentication({ email, pasword }) {
	return async function (dispatch, getState) {
		dispatch(checkingCredencial());
		console.log({ email, pasword });
	};
}

export function checkingGoogleAuthentication() {
	return async function (dispatch, getState) {
		dispatch(checkingCredencial());

		const result = await signInWithGoogle();

		if (!result.ok) {
			return dispatch(logout(result));
		}

		dispatch(login(result));
	};
}

export function creatatingUserWithEmailPassword(userInfo) {
	return async function (dispatch, getState) {
		dispatch(checkingCredencial());

		const result = await registerUserWithEmaiPassword(userInfo);

		if (!result.ok) {
			return dispatch(logout(result));
		}

		dispatch(login(result));
	};
}
