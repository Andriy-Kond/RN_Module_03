import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingVertical: 32,
	},

	sendingMessageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	sendingMessage: {
		textAlign: "center",
		fontSize: 36,
		lineHeight: 50,
	},

	camera: {
		flex: 1,
	},

	photoImgContainer: {
		flex: 1,
		borderWidth: 3,
		borderWidth: 15,
		borderColor: "#0021f9",
		backgroundColor: "#e5d310",
	},

	photoImg: {
		alignSelf: "center",
		width: 350,
		height: "100%",
		resizeMode: "contain",
		borderWidth: 15,
		borderColor: "#f90000",
	},

	// buttons
	buttonContainer: {
		paddingHorizontal: 20,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	button: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
		padding: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "#0d0d0d7f",
	},

	disabled: {
		borderColor: "#d7d7d7",
		color: "#d7d7d7",
	},

	text: {
		color: "#000",
	},

	// Image Comment
	imageTitleContainer: {
		marginHorizontal: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "#007BFF",
		marginVertical: 10,
	},
	imageTitle: {
		color: "#000",
	},
});
