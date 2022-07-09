import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, setActiveNote, savingNewNota, setNotes } from './';

export function addNewNote() {
	return async function (dispatch, getSate) {
		dispatch(savingNewNota());
		const { uid } = getSate().auth;

		const NewNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const newdoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
		await setDoc(newdoc, NewNote);

		NewNote.id = newdoc.id;

		dispatch(addNewEmptyNote(NewNote));
		dispatch(setActiveNote(NewNote));
	};
}

export function LoadingNotes(uid) {
	return async function (dispatch) {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
}
