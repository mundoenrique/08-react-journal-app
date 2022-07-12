export const journalInitState = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	active: null,
};

export const emptyNote = {
	id: new Date().getTime() * 5,
	title: '',
	body: '',
	imageUrls: [],
	date: new Date().getTime(),
};

export const notes = [
	{
		id: 'GB5NoF0f0SJfqLjGHX7Q',
		body: 'Descripción de la otra entrada',
		imageUrls: [
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657545733/journal/l3hpkaohqvkddqwgpnwa.jpg',
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657545734/journal/sbbb7htpko62dzp98lry.jpg',
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657545734/journal/afxs31b8o71s6ukhcuer.jpg',
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657545734/journal/o9kxgxfds2dcylbg3qhc.jpg',
		],
		date: 1657545701594,
		title: 'otra entreda',
	},
	{
		id: 'Q66BY2ZUEFZg8NljSjps',
		imageUrls: [
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657497516/journal/xjubfxy5sbibnjiofvis.jpg',
			'https://res.cloudinary.com/dfzenqqko/image/upload/v1657497516/journal/glikmdgr9yblwcigakiu.jpg',
		],
		body: 'Era hace una vez un barquito pequeñito',
		date: 1657487382167,
		title: 'Primera entrada',
	},
];

export const urlImages = [
	'https://res.cloudinary.com/dfzenqqko/image/upload/v1657497516/journal/mklwzzycxdtegplbreto.jpg',
	'https://res.cloudinary.com/dfzenqqko/image/upload/v1657497516/journal/ewou21wir1ueuvdwcxs8.jpg',
	'https://res.cloudinary.com/dfzenqqko/image/upload/v1657497516/journal/hfu5p0cnefmnrqwle33c.jpg',
];

export const journalstate = { ...journalInitState };
journalstate.notes = [...notes];
journalstate.active = notes[1];

export const upgradeNote = { ...notes[0] };
upgradeNote.title = 'Actuliza el título';
upgradeNote.body = 'Actuliza el cuerpo';
