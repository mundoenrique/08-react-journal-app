import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';

export function NoteView() {
	const {
		journal: { active: note },
	} = useSelector((state) => state);

	const { formState, title, body, date, onInputchange, onResetForm } =
		useForm(note);
	const tempDate = useMemo(() => {
		return new Date(date).toUTCString();
	}, [date]);

	return (
		<Grid
			className="animate__animated animate__fadeIn animate__faster"
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{tempDate}
				</Typography>
			</Grid>
			<Grid item>
				<Button color="primary" sx={{ padding: 2 }}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					sx={{ border: 'none', mb: 1 }}
					name="title"
					value={title}
					onChange={onInputchange}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="Ingresa una descripción"
					label="Descripción"
					minRows={5}
					value={body}
					name="body"
					onChange={onInputchange}
				/>
			</Grid>
			<ImageGallery />
		</Grid>
	);
}
