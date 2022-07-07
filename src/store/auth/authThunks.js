import { checkingCredencial } from './authSlice';

export function checkingAuthentication({ email, pasword }) {
	return async function (dispatch, getState) {
		dispatch(checkingCredencial());
		console.log({ email, pasword });
	};
}

export function checkingGoogleAuthentication() {
	return async function (dispatch, getState) {
		dispatch(checkingCredencial());
	};
}
