// it is operations for actions from authReducer
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
// import {
// 	authSignError,
// 	authSingOut,
// 	updateStateChange,
// 	updateUserProfile,
// } from "./authReducer";
import { authSlice } from "./authReducer";

const {
	updateUserProfile,
	updateStateChange,
	authSingOut,
	authSignError,
	updateField,
} = authSlice.actions;

// export const authError = (errorMessage) => async (dispatch, getState) => {
// 	try {
// 		await dispatch(authSignError(errorMessage));
// 	} catch (error) {
// 		console.error("authError >> error:", error);
// 	}
// };

export const authSingUpUser = ({ email, password, nickname, avatar }) => {
	console.log("authSingUpUser >> avatar:", avatar);
	return async (dispatch) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("return >> userCredential:", userCredential);

			if (userCredential?.user) {
				await updateProfile(userCredential.user, {
					displayName: nickname,
					photoURL: avatar,
				});
				console.log("return >> userCredential:", userCredential);
			}

			const userUpdateProfile = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
			};

			dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			console.error(
				"createUserWithEmailAndPassword >> error.code:",
				error.code
			);

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

				case "auth/missing-password":
					errorMessage = "Enter password registration";
					break;
				case "auth/missing-email":
					errorMessage = "Enter email for registration";
					break;

				default:
					errorMessage = "Unknown error";
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
			const result = await signInWithEmailAndPassword(auth, email, password);
			// console.log("result:", result);

			// const {
			// 	displayName: nickname,
			// 	email: baseEmail,
			// 	photoURL: avatar,
			// 	uid: userId,
			// } = result.user;

			// await dispatch(
			// 	updateField({
			// 		field: "nickname",
			// 		value: nickname,
			// 	})
			// );
			// await dispatch(
			// 	updateField({
			// 		field: "email",
			// 		value: baseEmail,
			// 	})
			// );
			// await dispatch(
			// 	updateField({
			// 		field: "avatar",
			// 		value: result.user.photoURL,
			// 	})
			// );
			// await dispatch(
			// 	updateField({
			// 		field: "userId",
			// 		value: userId,
			// 	})
			// );
		} catch (error) {
			console.error("signInWithEmailAndPassword >> error.code:", error.code);

			let errorMessage = "";
			switch (error.code) {
				case "auth/invalid-email":
					errorMessage = "Email address is not valid. Please check your email.";
					break;
				case "auth/user-disabled":
					errorMessage =
						"The user corresponding to the given email has been disabled";
					break;
				case "auth/user-not-found":
					errorMessage = "There is no user corresponding to the given email.";
					break;
				case "auth/wrong-password":
					errorMessage = "The password is invalid. Try again.";
					break;

				case "auth/missing-password":
					errorMessage = "Enter password login";
					break;
				case "auth/missing-email":
					errorMessage = "Enter email for login";
					break;

				default:
					errorMessage = "Unknown error";
					break;
			}

			await dispatch(authSignError(errorMessage));
			// await dispatch(
			// 	updateField({ field: "authErrorMessage", value: errorMessage })
			// );
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

		let errorMessage = "";
		switch (error.code) {
			case "auth/invalid-user-token":
				errorMessage =
					"The user to be updated belongs to a different Firebase project";
				break;
			case "auth/user-token-expired":
				errorMessage = "Session time is out. Please login again.";
				break;
			case "auth/null-user":
				errorMessage = "The user to be updated is null.";
				break;
			case "auth/tenant-id-mismatch":
				errorMessage =
					"The provided user's tenant ID does not match the underlying Auth instance's configured tenant ID";
				break;

			default:
				errorMessage = "Unknown error";
				break;
		}

		await dispatch(authSignError(errorMessage));
	}
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		await dispatch(authSingOut()); // clear redux
		await signOut(auth); // exit on firebase
	} catch (error) {
		console.error("signOut >> error.code:", error.code);

		let errorMessage = "";
		switch (error.code) {
			case "auth/invalid-user-token":
				errorMessage =
					"The user to be updated belongs to a different Firebase project";
				break;
			case "auth/user-token-expired":
				errorMessage = "Session time is out. Please login again.";
				break;
			case "auth/null-user":
				errorMessage = "The user to be updated is null.";
				break;
			case "auth/tenant-id-mismatch":
				errorMessage =
					"The provided user's tenant ID does not match the underlying Auth instance's configured tenant ID";
				break;

			default:
				errorMessage = "Unknown error";
				break;
		}

		await dispatch(authSignError(errorMessage));
	}
};
