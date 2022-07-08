import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(firebaseAuth, googleProvider);

		const { displayName, email, photoURL, uid } = result.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorCode,
			errorMessage,
		};
	}
}

export async function registerUserWithEmaiPassword(userInfo) {
	const { email, password, displayName } = userInfo;

	try {
		const result = await createUserWithEmailAndPassword(
			firebaseAuth,
			email,
			password
		);
		const { photoURL, uid } = result.user;
		await updateProfile(firebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorCode,
			errorMessage,
		};
	}
}

export async function loginUserWithEmaiPassword(userInfo) {
	const { email, password } = userInfo;

	try {
		const result = await signInWithEmailAndPassword(
			firebaseAuth,
			email,
			password
		);
		const { displayName, photoURL, uid } = result.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorCode,
			errorMessage,
		};
	}
}
