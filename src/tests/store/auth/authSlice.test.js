import {
	authSlice,
	checkingCredencial,
	login,
	logout,
} from '../../../store/auth/authSlice';
import {
	authenticatedState,
	demoUser,
	initialState,
} from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
	test('Debe regresar el estado inicial y llamarse "auth"', () => {
		const state = authSlice.reducer(initialState, {});

		expect(authSlice.name).toBe('auth');
		expect(state).toEqual(initialState);
	});

	test('Realizar la autenticación', () => {
		const state = authSlice.reducer(initialState, login(demoUser));

		expect(state).toEqual(authenticatedState);
	});

	test('Realizar el logout sin argumentos', () => {
		initialState.status = 'no-authenticate';
		initialState.errorMessage = undefined;
		const state = authSlice.reducer(authenticatedState, logout());

		expect(state).toEqual(initialState);
	});

	test('Realizar el logout con mensaje de error', () => {
		const errorMessage = 'Credenciales incorrectas';
		initialState.errorMessage = errorMessage;

		const state = authSlice.reducer(
			authenticatedState,
			logout({ errorMessage })
		);

		expect(state).toEqual(initialState);
	});

	test('Debe cambiar el estado a checking', () => {
		const state = authSlice.reducer(authenticatedState, checkingCredencial());

		expect(state.status).toBe('checking');
	});
});
