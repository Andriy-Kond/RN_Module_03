import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: "#fff",
		justifyContent: "flex-end", //! Show Input when KB is active
	},

	// Camera field
	cameraFieldContainer: {
		position: "relative",
		height: 240,
		width: "100%",
		borderRadius: 8,
		borderColor: "#E8E8E8",
		borderWidth: 1,

		backgroundColor: "#F6F6F6",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},

	takePhotoIcon: {
		position: "absolute",
	},

	sendingMessageContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	sendingMessage: {
		textAlign: "center",
		fontSize: 36,
		lineHeight: 50,
	},

	cameraContainer: {
		height: 240,
		width: "100%",
		borderRadius: 8,
		borderColor: "#E8E8E8",
		borderWidth: 1,
		backgroundColor: "#F6F6F6",
	},

	camera: {
		height: 240,
		width: "100%",
		borderRadius: 8,
		borderWidth: 1,
		overflow: "hidden",
		borderColor: "#E8E8E8",
	},

	photoImg: {
		height: 240,
		width: "100%",
		borderRadius: 8,
		borderWidth: 1,
		overflow: "hidden",
		borderColor: "#E8E8E8",
	},
	// /Camera field

	cameraFieldTitle: {
		marginBottom: 32,

		color: "#BDBDBD",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
	},

	buttonsWrapper: {
		flex: 1,
		justifyContent: "space-between",
	},

	deleteButton: {
		width: 60,
		minHeight: 40,
		alignSelf: "center",
		borderRadius: 20,
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

	photoTextInput: {
		paddingVertical: 16,
	},

	photoPlaceWrapper: {
		flexDirection: "row",
		marginTop: 16,
		marginBottom: 32,

		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
		color: "#212121",

		alignItems: "center",
	},

	mapPin: {
		marginRight: 4,
	},
});
