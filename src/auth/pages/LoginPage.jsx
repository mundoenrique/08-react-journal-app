import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {
	checkingAuthentication,
	checkingGoogleAuthentication,
} from '../../store/auth';
import { useMemo } from 'react';

export function LoginPage() {
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.auth);

	const { email, password, formState, onInputchange } = useForm({
		email: 'enrique@gmail.com',
		password: '123456',
	});

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const handleSignIn = (event) => {
		event.preventDefault();
		dispatch(checkingAuthentication(formState));
	};

	const handleGoogleSignIn = (event) => {
		event.preventDefault();
		dispatch(checkingGoogleAuthentication());
	};

	return (
		<AuthLayout title="Iniciar sesión">
			<form onSubmit={handleSignIn}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@server.xxx"
							fullWidth
							disabled={isAuthenticating}
							name="email"
							value={email}
							onChange={onInputchange}
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
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								disabled={isAuthenticating}
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								disabled={isAuthenticating}
								onClick={handleGoogleSignIn}
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
}
