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
		login: (state, { payload }) => {},
		logout: (state, { payload }) => {},
		checkingCredencial: (state) => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredencial } = authSlice.actions;
