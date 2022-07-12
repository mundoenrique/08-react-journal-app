import {
	signInWithGoogle,
	registerUserWithEmaiPassword,
	loginUserWithEmaiPassword,
	logoutFirebase,
} from '../../../firebase/firebaseProviders';
import {
	checkingCredencial,
	login,
	logout,
} from '../../../store/auth/authSlice';
import {
	checkingAuthentication,
	checkingGoogleAuthentication,
	creatatingUserWithEmailPassword,
	exampleThunks,
	signOutUser,
} from '../../../store/auth/authThunks';
import { clearNotes } from '../../../store/journal/journalSlice';
import {
	demoUser,
	displayName,
	email,
	password,
} from '../../fixtures/authFixtures';

jest.mock('../../../firebase/firebaseProviders');

describe('Pruebas en authThunks.js', () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('Debe llamar al checkingCredencial', async () => {
		await exampleThunks()(dispatch);

		expect(dispatch).toBeCalledWith({
			payload: undefined,
			type: 'auth/checkingCredencial',
		});
		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
	});

	test('checkingGoogleAuthentication debe llamar checkingCredencial y login', async () => {
		const loginData = {
			ok: true,
			...demoUser,
		};

		await signInWithGoogle.mockResolvedValue(loginData);

		await checkingGoogleAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('checkingGoogleAuthentication debe llamar checkingCredencial y logout', async () => {
		const loginData = {
			ok: false,
			errorCode: '10000520',
			errorMessage: 'No success',
		};

		await signInWithGoogle.mockResolvedValue(loginData);

		await checkingGoogleAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(logout(loginData));
	});

	test('creatatingUserWithEmailPassword debe llamar checkingCredencial y login', async () => {
		const signUpData = {
			email,
			password,
			displayName,
		};

		const dataRegister = {
			ok: true,
			...demoUser,
		};

		await registerUserWithEmaiPassword.mockResolvedValue(dataRegister);
		await creatatingUserWithEmailPassword(signUpData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(login(dataRegister));
	});

	test('creatatingUserWithEmailPassword debe llamar checkingCredencial y logout', async () => {
		const signUpData = {
			email,
			password,
			displayName,
		};
		const dataRegister = {
			ok: false,
			errorCode: '10000520',
			errorMessage: 'No success',
		};

		await registerUserWithEmaiPassword.mockResolvedValue(dataRegister);
		await creatatingUserWithEmailPassword(signUpData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(logout(dataRegister));
	});

	test('checkingAuthentication debe llamar checkingCredencial y login', async () => {
		const signInData = {
			email,
			password,
		};

		const dataLogin = {
			ok: true,
			...demoUser,
		};

		await loginUserWithEmaiPassword.mockResolvedValue(dataLogin);
		await checkingAuthentication(signInData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(login(dataLogin));
	});

	test('checkingAuthentication debe llamar checkingCredencial y logout', async () => {
		const signInData = {
			email,
			password,
		};

		const dataLogin = {
			ok: false,
			errorCode: '10000520',
			errorMessage: 'No success',
		};

		await loginUserWithEmaiPassword.mockResolvedValue(dataLogin);
		await checkingAuthentication(signInData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredencial());
		expect(dispatch).toHaveBeenCalledWith(logout(dataLogin));
	});

	test('signOutUser debe llmara logout firebase, clearNotes y logout', async () => {
		await signOutUser()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotes());
		expect(dispatch).toHaveBeenCalledWith(logout({}));
	});
});
