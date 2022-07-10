import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { setActiveNote } from '../../store/journal/journalSlice';

export function SideBarItem(note) {
	const dispatch = useDispatch();
	const { title, body } = note;

	const titleTemp = useMemo(() => {
		return title.length > 17 ? `${title.substring(0, 17)}...` : title;
	}, [title]);

	const activeNote = () => {
		dispatch(setActiveNote(note));
	};

	return (
		<ListItem disablePadding onClick={activeNote}>
			<ListItemButton>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={titleTemp} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
}
