import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../../../firebase/firebaseConfig';
import {
	addNewEmptyNote,
	savingNewNota,
	setActiveNote,
} from '../../../store/journal/journalSlice';
import { addNewNote } from '../../../store/journal/journalThunks';

describe('Pruebas en journalThunks', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('addNewNote Debe crear una nueva nota', async () => {
		const uid = 'TEST-UI';
		getState.mockReturnValue({ auth: { uid } });

		await addNewNote()(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(savingNewNota());
		expect(dispatch).toHaveBeenCalledWith(
			addNewEmptyNote({
				id: expect.any(String),
				title: '',
				body: '',
				imageUrls: expect.any(Array),
				date: expect.any(Number),
			})
		);
		expect(dispatch).toHaveBeenCalledWith(
			setActiveNote({
				id: expect.any(String),
				title: '',
				body: '',
				imageUrls: expect.any(Array),
				date: expect.any(Number),
			})
		);

		const colecctionRef = collection(firebaseDB, `${uid}/journal/notes`);
		const docs = await getDocs(colecctionRef);

		const deletePrommises = [];
		docs.forEach((doc) => deletePrommises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePrommises);
	});
});
