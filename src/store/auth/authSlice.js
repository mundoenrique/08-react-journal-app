import { createSlice } from '@reduxjs/toolkit';

export const authInit = {
	status: 'no-authenticate',
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
		},
		logout: (state, { payload }) => {
			return {
				...authInit,
				errorMessage: payload.errorMessage,
			};
		},
		checkingCredencial: (state) => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredencial } = authSlice.actions;
