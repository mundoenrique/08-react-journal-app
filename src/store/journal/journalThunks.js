import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase';
import { addNewEmptyNote, setActiveNote, savingNewNota } from './';

export function addNewNote() {
	return async function (dispatch, getSate) {
		dispatch(savingNewNota());
		const { uid } = getSate().auth;

		const NewNote = {
			title: '',
			body: '',
			date: new Date().getDate(),
		};

		const newdoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
		await setDoc(newdoc, NewNote);

		NewNote.id = newdoc.id;

		dispatch(addNewEmptyNote(NewNote));
		dispatch(setActiveNote(NewNote));
	};
}
