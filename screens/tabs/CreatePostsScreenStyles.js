import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: "#fff",
	},

	// Camera field
	cameraFieldContainer: {
		height: 240,
		// width: "100%",
		borderRadius: 8,
		borderColor: "#E8E8E8",
		borderWidth: 1,
		backgroundColor: "#F6F6F6",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
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
	// /Camera field

	cameraFieldTitle: {
		marginBottom: 32,

		color: "#BDBDBD",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
	},

	button: {
		paddingVertical: 16,
		paddingHorizontal: 32,
		alignItems: "center",

		borderRadius: 100,
		backgroundColor: "#FF6C00",
	},

	buttonText: {
		color: "#fff",
	},

	disabled: {
		backgroundColor: "#F6F6F6",
		color: "#BDBDBD",
	},

	// Image Comment
	photoText: {
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
		color: "#212121",
	},

	photoPlaceWrapper: {
		flexDirection: "row",
		marginTop: 16,
		marginBottom: 32,
	},

	mapPin: {
		marginRight: 4,
	},
});
