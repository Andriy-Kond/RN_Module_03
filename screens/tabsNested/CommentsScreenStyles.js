import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: "#fff",
	},

	screenTitle: {
		alignSelf: "center",
		marginVertical: 15,
		fontSize: 20,
	},

	imageTitle: {
		marginBottom: 5,
		fontSize: 16,
	},

	commentContainer: {
		flex: 1,
		borderColor: "#007BFF",
		borderWidth: 2,
		marginBottom: 5,
		padding: 5,
	},

	currentImg: {
		width: "100%",

		height: 240,
		borderRadius: 20,
		borderColor: "#fff",
		marginTop: 10,
		marginBottom: 10,
	},
	// Image Comment
	imageCommentContainer: {
		borderWidth: 2,
		borderRadius: 20,
		borderColor: "#007BFF",
		marginVertical: 10,
		padding: 10,
	},
	imageComment: {
		color: "#000",
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
});
