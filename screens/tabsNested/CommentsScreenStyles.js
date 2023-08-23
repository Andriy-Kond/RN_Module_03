import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingBottom: 16,
		paddingTop: 32,
		backgroundColor: "#fff",
	},

	currentImg: {
		width: "100%",
		height: 240,
		borderRadius: 8,
	},

	commentsContainer: {
		flex: 1,
		paddingVertical: 32,
	},

	currentCommentContainer: {
		flex: 1,
		marginBottom: 24,
		flexDirection: "row",
	},

	avatarOfComment: {
		width: 28,
		height: 28,
		borderRadius: 50,
		marginRight: 16, //* or marginLeft: 16,
	},

	currentCommentWrapper: {
		flex: 1,
		borderRadius: 6,
		backgroundColor: "rgba(0, 0, 0, 0.03);",
		padding: 16,
	},

	currentCommentText: {
		flex: 1,
		paddingBottom: 8,

		color: "#212121",
		fontFamily: "RobotoRegular400",
		fontSize: 13,
		lineHeight: 18,
	},

	currentCommentDateTime: {
		color: "#BDBDBD",
		fontFamily: "RobotoRegular400",
		fontSize: 10,
		alignSelf: "flex-end", //* or alignSelf: "flex-start"
	},

	// Comment Input
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
		padding: 16,
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
