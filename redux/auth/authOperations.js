// operations for actions from authReducer
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
				});
			}

			const userUpdateProfile = {
				nickname: userCredential.user.displayName,
			};
			await dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			const errorMessage = switchError(error.code);
			await dispatch(authSignError(errorMessage));
		}
	};
};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const newProfileFields = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
				serverAvatar: userCredential.user.photoURL,
			};

			dispatch(updateUserProfile(newProfileFields));
		} catch (error) {
			const errorMessage = switchError(error.code);
			await dispatch(authSignError(errorMessage));
		}
	};

// Check if the user was signed in on this device
export const authStateChangeUser = () => async (dispatch, getState) => {
	try {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// Update Redux state
				const userUpdateProfile = {
					userId: user.uid,
					nickname: user.displayName,
					serverAvatar: user.photoURL,
					email: user.email,
				};
				dispatch(updateUserProfile(userUpdateProfile));

				// Set stateChange ->
				// Set routing in Main.jsx ->
				// Set isAuth in router.js ->
				// "true" will show <TabsNavigation />
				dispatch(updateStateChange({ stateChange: true }));
			}
		});
	} catch (error) {
		const errorMessage = switchError(error.code);
		await dispatch(authSignError(errorMessage));
	}
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		await dispatch(authSingOut()); // clear redux
		await signOut(auth); // exit on firebase
	} catch (error) {
		const errorMessage = switchError(error.code);
		await dispatch(authSignError(errorMessage));
	}
};
