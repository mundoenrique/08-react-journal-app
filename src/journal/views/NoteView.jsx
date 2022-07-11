/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	DeleteOutlined,
	SaveOutlined,
	UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import {
	deletingNote,
	savingNote,
	setActiveNote,
	uploadingFiles,
} from '../../store/journal';

export function NoteView() {
	const dispatch = useDispatch();
	const {
		journal: { messageSaved, active: note, isSaving },
	} = useSelector((state) => state);

	const { formState, id, title, body, date, imageUrls, onInputchange } =
		useForm(note);

	const tempDate = useMemo(() => {
		return new Date(date).toUTCString();
	}, [date]);

	const fileInputRef = useRef();

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Nota actulizada', messageSaved, 'success');
		}
	}, [messageSaved]);

	const handleSaveNote = () => {
		dispatch(savingNote());
	};

	const handleInputChange = ({ target }) => {
		if (target.files.length === 0) return;

		dispatch(uploadingFiles(target.files));
	};

	const HandleDeleteNote = () => {
		dispatch(deletingNote(id));
	};

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
				<input
					ref={fileInputRef}
					type="file"
					multiple
					onChange={handleInputChange}
					style={{ display: 'none' }}
				/>
				<IconButton
					color="primary"
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					color="primary"
					sx={{ padding: 2 }}
					onClick={handleSaveNote}
					disabled={isSaving}
				>
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
			<Grid container justifyContent="end">
				<Button color="error" sx={{ mt: 2 }} onClick={HandleDeleteNote}>
					<DeleteOutlined />
					Borrar
				</Button>
			</Grid>
			<ImageGallery images={imageUrls} />
		</Grid>
	);
}
