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

const {
	updateUserProfile,
	updateStateChange,
	authSingOut,
	authSignError,
	initStateChanger,
} = authSlice.actions;

export const authError = (errorMessage) => async (dispatch, getState) => {
	try {
		await dispatch(authSignError(errorMessage));
	} catch (error) {
		console.error("authError >> error:", error);
	}
};

export const authSingUpUser = ({ email, password, nickname, avatar }) => {
	return async (dispatch) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
				avatar
			);

			if (userCredential?.user) {
				await updateProfile(userCredential.user, {
					displayName: nickname,
				});
			}

			const userUpdateProfile = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
			};
			dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			console.log("return >> error.code:", error.code);
			let errorMessage = "";
			switch (error.code) {
				case "auth/email-already-in-use":
					errorMessage = "Email already in use. Chose other email.";
					break;

				case "auth/invalid-email":
					errorMessage = "Email address is not valid. Please check your email.";
					break;
				case "auth/operation-not-allowed":
					errorMessage =
						"This account has been disabled. Please contact the administrator.";
					break;
				case "auth/weak-password":
					errorMessage =
						"The password is not strong enough. Make it more reliable.";
					break;

				default:
					break;
			}
			await dispatch(authSignError(errorMessage));
		}
	};
};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error("authSingInUser:", error);
		}
	};

export const authStateChangeUser = () => async (dispatch, getState) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userUpdateProfile = {
				userId: user.uid,
				nickname: user.displayName,
			};
			dispatch(updateUserProfile(userUpdateProfile));
			dispatch(updateStateChange({ stateChange: true }));
		}
	});
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		await dispatch(authSingOut()); // clear redux
		await signOut(auth); // exit on firebase
	} catch (error) {
		console.error("authSingOutUser >> error:", error);
	}
};

export const initStateReducer =
	({ type, field, value }) =>
	async (dispatch, getState) => {
		try {
			dispatch(initStateChanger({ type, field, value }));
		} catch (error) {
			console.error("authSingOutUser >> error:", error);
		}
	};
