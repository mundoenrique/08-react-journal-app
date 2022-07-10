import { createSlice } from '@reduxjs/toolkit';

export const journalInit = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	active: null,
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState: journalInit,
	reducers: {
		savingNewNota: (state) => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, { payload }) => {
			state.notes.push(payload);
		},
		setActiveNote: (state, { payload }) => {
			state.active = payload;
			state.isSaving = false;
			state.messageSaved = '';
		},
		setNotes: (state, { payload }) => {
			state.notes = payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
			state.messageSaved = '';
		},
		updateNote: (state, { payload }) => {
			state.isSaving = false;
			state.messageSaved = `${payload.title}, actualizada correctamente`;
			state.notes = state.notes.map((note) => {
				if (note.id === payload.id) {
					return payload;
				}

				return note;
			});
		},
		setPhotosNote: (state, { payload }) => {
			state.isSaving = false;
			state.active.imageUrls = [...state.active.imageUrls, ...payload];
		},
		deleteNote: (state, { payload }) => {},
	},
});

export const {
	addNewEmptyNote,
	deleteNote,
	savingNewNota,
	setActiveNote,
	setNotes,
	setPhotosNote,
	setSaving,
	updateNote,
} = journalSlice.actions;
