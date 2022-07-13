import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice } from '../../../store/auth/authSlice';
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { checkingGoogleAuthentication } from '../../../store/auth/authThunks';

const mockCheckingGoogleAuthentication = jest.fn();

jest.mock('../../../store/auth/authThunks', () => ({
	checkingGoogleAuthentication: () => mockCheckingGoogleAuthentication,
}));

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe('Pruebas en <LoginPage />', () => {
	test('Debe renderizar el componente', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getAllByText('Iniciar sesión').length).toBeGreaterThanOrEqual(
			1
		);
	});

	test('Debe de llamar al handleGoogleSignIn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const googleBtn = screen.getByLabelText('google-btn');
		fireEvent.click(googleBtn);

		expect(mockCheckingGoogleAuthentication).toHaveBeenCalled();
	});

	test('Debe llamar al checkingAuthentication', () => {
		const email = 'enrique@gmail.com';
		const password = '123456';

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const emailField = screen.getByRole('textbox', { name: 'Correo' });
		fireEvent.change(emailField, { target: { name: 'email', value: email } });
		const PassField = screen.getByTestId('password');
		fireEvent.change(PassField, {
			target: { name: 'password', value: password },
		});
		const signInBtn = screen.getByLabelText('signin-btn');
	});
});
