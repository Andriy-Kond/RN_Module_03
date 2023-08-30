import { StyleSheet } from "react-native";

const regImgHeight = 120;
const regAddImgBtnHeight = 25;

export const styles = StyleSheet.create({
	// form styles
	form: {
		width: "100%",
		paddingLeft: 16,
		paddingRight: 16,

		alignItems: "center",
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,

		justifyContent: "flex-end",
	},

	regImageContainer: {
		position: "relative",
	},

	avatarImg: {
		position: "absolute",
		width: regImgHeight,
		height: regImgHeight,

		borderRadius: 16,
		backgroundColor: "#F6F6F6",

		top: 0,
		left: 0,
		transform: [
			{ translateY: -regImgHeight / 2 },
			{ translateX: -regImgHeight / 2 },
		],
	},

	regAddImgBtnWrapper: {
		position: "absolute",
		top: 20,
		transform: [{ translateX: regImgHeight / 2 - regAddImgBtnHeight / 2 }],

		width: regAddImgBtnHeight,
		height: regAddImgBtnHeight,
	},

	regAddImgBtn: {
		width: regAddImgBtnHeight,
		height: regAddImgBtnHeight,
		alignItems: "center",
		justifyContent: "center",
	},

	formTitle: {
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
		paddingHorizontal: 0,
	},

	passwordInput: {
		flex: 1,
		height: "100%",
		paddingHorizontal: 16,
	},

	passwordToggleBtn: {
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		paddingHorizontal: 16,
	},
	passwordToggleBtnText: {
		color: "#1B4371",
	},

	mainBtn: {
		width: "100%",
		marginBottom: 16,
		marginTop: 26,
	},
});
