export const displayName = 'Demo User';
export const email = 'demo@gmail.com';
export const photoURL = 'https://demo.jpg';
export const uid = 'ABC123';
export const password = '123456';

export const demoUser = {
	displayName,
	email,
	photoURL,
	uid,
};

export const initialState = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated',
	...demoUser,
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'no-authenticate',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};
