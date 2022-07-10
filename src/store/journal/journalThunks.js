import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase';
import { fileUpload, loadNotes } from '../../helpers';
import {
	addNewEmptyNote,
	savingNewNota,
	setActiveNote,
	setNotes,
	setPhotosNote,
	setSaving,
	updateNote,
} from './';

export function addNewNote() {
	return async function (dispatch, getSate) {
		dispatch(savingNewNota());
		const { uid } = getSate().auth;

		const NewNote = {
			title: '',
			body: '',
			imageUrls: [],
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

export function savingNote() {
	return async function (dispatch, getSate) {
		dispatch(setSaving());
		const {
			auth: { uid },
			journal: { active: note },
		} = getSate();

		const noteCopy = { ...note };
		delete noteCopy.id;

		const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteCopy, { merge: true });

		dispatch(updateNote(note));
	};
}

export function uploadingFiles(files = []) {
	return async function (dispatch) {
		dispatch(setSaving());

		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromises);

		dispatch(setPhotosNote(photosUrls));
	};
}
