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

import { uriToBlob } from "../../utils/uriToBlob";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const {
	updateUserProfile,
	updateStateChange,
	authSingOut,
	authSignError,
	updateField,
	toggleField,
} = authSlice.actions;

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

// uri to blob and upload to server storage
const uploadPhotoToServer = async (urlAvatar) => {
	try {
		// to BLOB from uri
		const blobFile = await uriToBlob(urlAvatar);

		// send to storage
		const uniqPostId = Date.now().toString();
		const storageRef = ref(storage, `${uniqPostId}`);
		await uploadBytes(storageRef, blobFile);

		// take from server
		const url = await getDownloadURL(storageRef);
		return url;
	} catch (e) {
		console.error("Error adding data: ", e);
		throw e;
	}
};

export const authSingUpUser = ({
	email,
	password,
	nickname,
	phoneAvatar,
	serverAvatar,
}) => {
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
				await dispatch(updateField("userId", userCredential.user.uid));

				let serverUrlAvatar;

				if (phoneAvatar) {
					// Upload avatar to server
					serverUrlAvatar = await uploadPhotoToServer(phoneAvatar);
					// Update field "serverAvatar" in state
					dispatch(updateUserField("serverAvatar", serverUrlAvatar));
				}

				await updateProfile(userCredential.user, {
					displayName: nickname,
					photoURL: serverUrlAvatar,
					// photoURL: avatar,
				});
			}

			// const userUpdateProfile = {
			// 	userId: userCredential.user.uid,
			// 	nickname: userCredential.user.displayName,
			// 	phoneAvatar: userCredential.user.photoURL,
			// 	serverAvatar: userCredential.user.photoURL,
			// };

			// await dispatch(updateUserProfile(userUpdateProfile));
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

export const updateUserField = (field, value) => async (dispatch, getState) => {
	try {
		await dispatch(updateField({ field, value }));
	} catch (error) {
		console.log("updateUserFeild >> error:", error);
	}
};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			// Хіба не треба тут записати щось у стейт?
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
			if (user) {
				// Update Redux state
				const userUpdateProfile = {
					userId: user.uid,
					nickname: user.displayName,
					serverAvatar: user.photoURL,
					phoneAvatar: user.photoURL,
				};
				// dispatch(updateUserProfile(userUpdateProfile));

				// Set stateChange ->
				// Set routing in Main.jsx ->
				// Set isAuth in router.js ->
				// "true" will show <TabsNavigation />
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
