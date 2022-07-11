export const demoUser = {
	uid: 'ABC123',
	email: 'demo@gmail.com',
	photoURL: 'https://demo.jpg',
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
