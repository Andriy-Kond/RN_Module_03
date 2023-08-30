import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		// paddingHorizontal: 16,
		// paddingTop: 32,
		// width: "100%",
		flex: 1,
		backgroundColor: "#fff",
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

	formContainer: {
		flex: 1,
		backgroundColor: "#fff",
		// paddingHorizontal: 16,
		// paddingTop: 32,
		// width: "100%",
	},

	user: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},
	userImg: {
		borderRadius: 16,
		width: 120,
		height: 120,
	},
	userName: {
		color: "#212121",
		fontFamily: "RobotoMedium500",
		fontSize: 30,
		letterSpacing: 0.3,
	},

	imgContainer: {
		marginBottom: 30,
	},

	currentImg: {
		width: "100%",
		height: 200,
		borderRadius: 8,
		marginBottom: 8,
	},

	imgTitle: {
		marginBottom: 8,
		color: "#212121",
		fontFamily: "RobotoMedium500",
		fontSize: 16,
	},

	buttonsWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	commentBtnWrapper: {
		flexDirection: "row",
	},

	commentBtnText: {
		marginLeft: 6,
		color: "#212121",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
		textDecorationLine: "underline",
	},
});
