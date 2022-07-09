import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { JournalLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../views';
import { addNewNote } from '../../store/journal';

export function JournalPage() {
	const dispatch = useDispatch();
	const { isSaving, active } = useSelector((state) => state.journal);

	const handleCreateNewNote = () => {
		dispatch(addNewNote());
	};

	return (
		<JournalLayout>
			{!!active ? <NoteView /> : <NothingSelectedView />}
			<IconButton
				size="large"
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					position: 'fixed',
					right: 50,
					bottom: 50,
				}}
				onClick={handleCreateNewNote}
				disabled={isSaving}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
}
