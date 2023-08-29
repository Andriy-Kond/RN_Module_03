import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	kbAvoidingContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
	},

	imgBg: {
		flex: 1,
		position: "absolute",
		resizeMode: "cover",
		justifyContent: "center",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
	},

	// Form styles
	form: {
		width: "100%",
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 144,

		alignItems: "center",
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,

		justifyContent: "flex-end",
	},

	formTitle: {
		marginTop: 32,
		marginBottom: 32,
		color: "#212121",
		fontFamily: "RobotoMedium500",
		fontSize: 30,
		letterSpacing: 0.3,
	},

	inputsWrapper: {
		width: "100%",
	},

	input: {
		height: 50,
		width: "100%", // 343
		marginBottom: 16,
		paddingHorizontal: 16,

		borderWidth: 1,

		borderRadius: 10,
		backgroundColor: "#F6F6F6",
		borderColor: "#E8E8E8",

		color: "#212121",
		fontFamily: "RobotoNormal400",
		fontSize: 16,

		alignItems: "center",
	},

	inputFocused: {
		backgroundColor: "#FFF",
		borderColor: "#FF6C00",
	},

	passwordInputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	passwordInput: {
		flex: 1,
	},

	passwordToggleText: {
		color: "#1B4371",
	},

	mainBtn: {
		width: "100%",
		marginBottom: 16,
		marginTop: 26,
	},
});
