import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
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
		// right: 0,
		// bottom: 0,
		width: "100%",
	},

	kbAvoidingContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
	},
});
