import {
	loginUserWithEmaiPassword,
	registerUserWithEmaiPassword,
	signInWithGoogle,
} from '../../firebase';
import { checkingCredencial, login, logout } from './authSlice';

export function checkingGoogleAuthentication() {
	return async function (dispatch) {
		dispatch(checkingCredencial());

		const result = await signInWithGoogle();

		if (!result.ok) {
			return dispatch(logout(result));
		}

		dispatch(login(result));
	};
}

export function creatatingUserWithEmailPassword(userInfo) {
	return async function (dispatch) {
		dispatch(checkingCredencial());

		const result = await registerUserWithEmaiPassword(userInfo);

		if (!result.ok) {
			return dispatch(logout(result));
		}

		dispatch(login(result));
	};
}

export function checkingAuthentication(userInfo) {
	return async function (dispatch) {
		dispatch(checkingCredencial());

		const result = await loginUserWithEmaiPassword(userInfo);

		if (!result.ok) {
			return dispatch(logout(result));
		}

		dispatch(login(result));
	};
}
