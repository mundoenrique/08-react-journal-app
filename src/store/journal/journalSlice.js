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
		},
		setNotes: (state, { payload }) => {
			state.notes = payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
		},
		updateNote: (state, { payload }) => {
			state.isSaving = false;
			state.notes = state.notes.map((note) => {
				if (note.id === payload.id) {
					return payload;
				}

				return note;
			});
		},
		deleteNote: (state, { payload }) => {},
	},
});

export const {
	savingNewNota,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNote,
} = journalSlice.actions;
