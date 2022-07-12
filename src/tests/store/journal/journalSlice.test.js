import {
	addNewEmptyNote,
	clearNotes,
	deleteNote,
	journalSlice,
	savingNewNota,
	setActiveNote,
	setNotes,
	setPhotosNote,
	setSaving,
	updateNote,
} from '../../../store/journal/journalSlice';
import {
	emptyNote,
	journalInitState,
	journalstate,
	notes,
	upgradeNote,
	urlImages,
} from '../../fixtures/journalFixtures';

describe('Pruebas en journalSlice', () => {
	test('Debe regresar el estado inicial de las notas', () => {
		const state = journalSlice.reducer(journalInitState, {});

		expect(journalSlice.name).toBe('journal');
		expect(state).toEqual(journalInitState);
	});

	test('Debe establecer isSaving en "true"', () => {
		const state = journalSlice.reducer(journalInitState, savingNewNota());

		expect(state.isSaving).toBeTruthy();
	});

	test('Debe insertar una nota vacía', () => {
		const state = journalSlice.reducer(
			journalInitState,
			addNewEmptyNote(emptyNote)
		);

		expect(state.notes).toContain(emptyNote);
	});

	test('Debe activar la una nota', () => {
		const state = journalSlice.reducer(journalstate, setActiveNote(notes[0]));

		expect(state.active).toEqual(notes[0]);
	});

	test('Debe insertas las notas', () => {
		const state = journalSlice.reducer(journalInitState, setNotes(notes));

		expect(state.notes).toEqual(notes);
	});

	test('Debe establecer isSaving en "true" messageSaved vacío', () => {
		journalstate.messageSaved = 'Hola mundo';

		const state = journalSlice.reducer(journalstate, setSaving());

		expect(state.isSaving).toBeTruthy();
		expect(state.messageSaved).toBe('');
	});

	test('Debe actulizar una nota', () => {
		const state = journalSlice.reducer(journalstate, updateNote(upgradeNote));

		expect(state.isSaving).toBeFalsy();
		expect(state.messageSaved).toBe(
			`${upgradeNote.title}, actualizada correctamente`
		);
		expect(state.notes[0].title).toBe(upgradeNote.title);
		expect(state.notes[0].body).toBe(upgradeNote.body);
	});

	test('Debe establecer las imagenes de la nota', () => {
		const state = journalSlice.reducer(journalstate, setPhotosNote(urlImages));

		expect(state.active.imageUrls).toStrictEqual([
			...journalstate.active.imageUrls,
			...urlImages,
		]);
	});

	test('Debe limpiar las notas y devolver el estado inicial', () => {
		const state = journalSlice.reducer(journalstate, clearNotes());

		expect(state).toEqual(journalInitState);
	});

	test('Debe borra una nota', () => {
		const noteId = journalstate.active.id;
		const state = journalSlice.reducer(journalstate, deleteNote(noteId));

		expect(state.notes).toEqual(
			journalstate.notes.filter((note) => note.id !== noteId)
		);
	});
});
