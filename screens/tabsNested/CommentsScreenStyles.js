import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingBottom: 16,
		paddingTop: 32,
		backgroundColor: "#fff",
	},

	screenTitle: {
		alignSelf: "center",
		marginVertical: 15,
		fontSize: 20,
	},

	commentsContainer: {
		flex: 1,
		paddingVertical: 32,
	},

	currentCommentContainer: {
		flex: 1,
		borderColor: "#007BFF",
		borderWidth: 2,
		marginBottom: 5,
		padding: 5,
	},

	currentImg: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		borderColor: "#fff",

		marginBottom: 10,
	},

	// Image Comment
	imageCommentContainer: {
		borderWidth: 1,
		borderRadius: 50,
		borderColor: "#E8E8E8",
		marginVertical: 10,
		backgroundColor: "#F6F6F6",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 8,
	},

	inputFocused: {
		backgroundColor: "#FFF",
		borderColor: "#FF6C00",
	},

	imageComment: {
		paddingHorizontal: 16,
		flex: 1,
		height: "100%",
		fontFamily: "RobotoMedium500",
		fontSize: 16,
		color: "#212121",
	},

	addCommentBtn: {
		// alignItems: "center",
		// justifyContent: "center",
		// marginBottom: 15,
		// padding: 10,
		// borderWidth: 2,
		// borderRadius: 50,
		// borderColor: "#0d0d0d7f",
	},

	disabled: {
		borderColor: "#d7d7d7",
		color: "#d7d7d7",
	},
});
