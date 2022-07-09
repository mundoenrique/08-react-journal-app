import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase';

export async function loadNotes(uid) {
	const colecctionRef = collection(firebaseDB, `${uid}/journal/notes`);
	const docs = await getDocs(colecctionRef);

	const notes = [];

	docs.forEach((doc) => {
		notes.push({ id: doc.id, ...doc.data() });
	});

	return notes;
}
