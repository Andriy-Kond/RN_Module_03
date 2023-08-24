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

const { updateUserProfile, updateStateChange, authSingOut, authSignError } =
	authSlice.actions;

function switchError(errorCode) {
	let errorMessage = "";
	switch (errorCode) {
		case "auth/email-already-in-use":
			return (errorMessage = "Email already in use. Chose other email.");

		case "auth/invalid-email":
			return (errorMessage =
				"Email address is not valid. Please check your email.");

		case "auth/operation-not-allowed":
			return (errorMessage =
				"This account has been disabled. Please contact the administrator.");

		case "auth/weak-password":
			return (errorMessage =
				"The password is not strong enough. Make it more reliable.");

		case "auth/missing-password":
			return (errorMessage = "Enter password");

		case "auth/missing-email":
			return (errorMessage = "Enter email");

		case "auth/user-disabled":
			return (errorMessage =
				"The user corresponding to the given email has been disabled");

		case "auth/user-not-found":
			return (errorMessage =
				"There is no user corresponding to the given email.");

		case "auth/wrong-password":
			return (errorMessage = "The password is invalid. Try again.");

		case "auth/invalid-user-token":
			return (errorMessage =
				"The user to be updated belongs to a different Firebase project");

		case "auth/user-token-expired":
			return (errorMessage = "Session time is out. Please login again.");

		case "auth/null-user":
			return (errorMessage = "The user to be updated is null.");

		case "auth/tenant-id-mismatch":
			return (errorMessage =
				"The provided user's tenant ID does not match the underlying Auth instance's configured tenant ID");

		default:
			return (errorMessage = "Unknown error");
	}
}

export const authSingUpUser = ({ email, password, nickname, serverAvatar }) => {
	return async (dispatch, getState) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential?.user) {
				await updateProfile(userCredential.user, {
					displayName: nickname,
					photoURL: serverAvatar,
				});
			}

			const userUpdateProfile = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
				avatar: userCredential.user.photoURL,
			};

			dispatch(updateUserProfile(userUpdateProfile));
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

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error("signInWithEmailAndPassword >> error.code:", error.code);

			const errorMessage = switchError(error.code);

			await dispatch(authSignError(errorMessage));
		}
	};

export const authStateChangeUser = () => async (dispatch, getState) => {
	try {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const userUpdateProfile = {
					userId: user.uid,
					nickname: user.displayName,
					avatar: user.photoURL,
				};
				dispatch(updateUserProfile(userUpdateProfile));
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
