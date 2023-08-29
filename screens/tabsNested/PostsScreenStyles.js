import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 32,
		flex: 1,
		width: "100%",
		backgroundColor: "white",
	},

	user: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},

	userImg: {
		borderRadius: 16,
		marginRight: 8,
		width: 60,
		height: 60,
	},
	userName: {
		color: "#212121",
		fontFamily: "RobotoBold700",
		fontSize: 13,
	},

	userEmail: {
		color: "rgba(33, 33, 33, 0.80);",
		fontFamily: "RobotoNormal400",
		fontSize: 11,
	},

	imgContainer: {
		// alignItems: "center",
		marginBottom: 30,
	},

	currentImg: {
		width: "100%",
		height: 200,
		borderRadius: 8,
		borderColor: "#fff",
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
		// marginRight: 20,
	},

	commentBtnText: {
		marginLeft: 6,
		color: "#212121",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
		textDecorationLine: "underline",
	},

	mapPin: {
		flex: 1,
		// marginLeft: 48,
		// alignSelf: "flex-end",
	},
});
