import { createSlice } from '@reduxjs/toolkit';

export const authInit = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInit,
	reducers: {
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},
		logout: (state, { payload }) => {
			return {
				...authInit,
				status: 'no-authenticate',
				errorMessage: payload?.errorMessage,
			};
		},
		checkingCredencial: (state) => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredencial } = authSlice.actions;
