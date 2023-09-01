// it is operations for actions from authReducer
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import { authSlice } from "./authReducer";
import { switchError } from "../../utils/switchError";
import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";

const {
	updateUserProfile,
	updateStateChange,
	authSingOut,
	authSignError,
	updateField,
	toggleField,
} = authSlice.actions;

export const authSingUpUser = ({ email, password, nickname, serverAvatar }) => {
	return async (dispatch, getState) => {
		try {
			// Create new user on the Firebase
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential?.user) {
				// Update userId field in Redux state
				await dispatch(updateField({ userId: userCredential.user.uid }));
				let serverUrlAvatar = null;

				if (serverAvatar) {
					// Upload avatar to server
					serverUrlAvatar = await uploadPhotoToServer(serverAvatar);

					// Update field "serverAvatar" in state
					dispatch(updateField({ serverAvatar: serverUrlAvatar }));
				}

				// Update Firebase userCredential
				await updateProfile(userCredential.user, {
					displayName: nickname,
					photoURL: serverUrlAvatar,
					// photoURL: avatar,
				});
			}

			const userUpdateProfile = {
				// 	userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
				// 	serverAvatar: userCredential.user.photoURL,
			};
			await dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			console.error(
				"createUserWithEmailAndPassword >> error.code:",
				error.code
			);
			const errorMessage = switchError(error.code);
			await dispatch(authSignError(errorMessage));
		}
	};
};

// export const updateCurrentField = (field, value) => {
// 	try {
// 		dispatch(updateField({ [field]: value }));
// 	} catch (error) {
// 		console.log("updateCurrentField >> error:", error);
// 	}
// };

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			console.log(
				"ОТРИМАВ authSingInUser >>> userCredential.user:",
				userCredential.user
			);

			const newProfileFields = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
				serverAvatar: userCredential.user.photoURL,
			};

			console.log("  ЗАПУСКАЮ dispatch(updateUserProfile(newProfileFields)):");
			dispatch(updateUserProfile(newProfileFields));
		} catch (error) {
			console.error("signInWithEmailAndPassword >> error.code:", error.code);
			const errorMessage = switchError(error.code);
			await dispatch(authSignError(errorMessage));
		}
	};

// Check if the user was signed in on this device
export const authStateChangeUser = () => async (dispatch, getState) => {
	try {
		onAuthStateChanged(auth, (user) => {
			console.log("ВИКОНУЮ onAuthStateChanged -- ЗАПИТ НА СЕРВЕР");
			if (user) {
				// Update Redux state
				const userUpdateProfile = {
					userId: user.uid,
					nickname: user.displayName,
					serverAvatar: user.photoURL,
					email: user.email,
					// phoneAvatar: user.photoURL,
				};
				dispatch(updateUserProfile(userUpdateProfile));

				// Set stateChange ->
				// Set routing in Main.jsx ->
				// Set isAuth in router.js ->
				// "true" will show <TabsNavigation />

				console.log(
					" ЗАПУСКАЮ В authStateChangeUser -->>> dispatch(updateStateChange({ stateChange: true }));"
				);
				dispatch(updateStateChange({ stateChange: true }));
			}
		});
	} catch (error) {
		console.error("onAuthStateChanged >> error.code:", error.code);

		const errorMessage = switchError(error.code);
		await dispatch(authSignError(errorMessage));
	}
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		await dispatch(authSingOut()); // clear redux
		await signOut(auth); // exit on firebase
	} catch (error) {
		console.error("signOut >> error.code:", error.code);

		const errorMessage = switchError(error.code);
		await dispatch(authSignError(errorMessage));
	}
};
