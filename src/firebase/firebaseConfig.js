// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAK4hQdzu5K1uFVkxf67GHwD6eReTfnCmg',
	authDomain: 'my-apps-34a08.firebaseapp.com',
	projectId: 'my-apps-34a08',
	storageBucket: 'my-apps-34a08.appspot.com',
	messagingSenderId: '580891462853',
	appId: '1:580891462853:web:745d21e90895bbb167f4ac',
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseapp);
export const firebaseDB = getFirestore(firebaseapp);
