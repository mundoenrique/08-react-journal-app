import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { creatatingUserWithEmailPassword } from '../../store/auth';

const formData = {
	displayName: '',
	email: '',
	password: '',
};

const formValidations = {
	displayName: [(value) => value.length >= 1, 'El nombre es requerido.'],
	email: [(value) => value.includes('@'), 'El correo debe contener "@".'],
	password: [
		(value) => value.length >= 6,
		'La contraseña debe tener al menos 6 caracteres.',
	],
};

export function RegisterPage() {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const {
		formState,
		displayName,
		email,
		password,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
		onInputchange,
	} = useForm(formData, formValidations);

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const handleRegister = (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		if (isFormValid) {
			dispatch(creatatingUserWithEmailPassword(formState));
		}
	};

	return (
		<AuthLayout title="Crear Cuenta">
			<form
				className="animate__animated animate__fadeIn animate__faster"
				onSubmit={handleRegister}
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Tu nombre"
							autoComplete="off"
							fullWidth
							disabled={isAuthenticating}
							name="displayName"
							value={displayName}
							onChange={onInputchange}
							error={!!displayNameValid && formSubmitted}
							helperText={formSubmitted && displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@server.xxx"
							autoComplete="off"
							fullWidth
							disabled={isAuthenticating}
							name="email"
							value={email}
							onChange={onInputchange}
							error={!!emailValid && formSubmitted}
							helperText={formSubmitted && emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							disabled={isAuthenticating}
							name="password"
							value={password}
							onChange={onInputchange}
							error={!!passwordValid && formSubmitted}
							helperText={formSubmitted && passwordValid}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								disabled={isAuthenticating}
							>
								Crear cuenta
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
}
