export function switchError(errorCode) {
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
