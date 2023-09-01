import { StyleSheet } from "react-native";

const regImgHeight = 120;
const regAddImgBtnHeight = 25;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 148,
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

	formContainer: {
		flex: 1,
		// width: "100%",
		paddingHorizontal: 16,

		// alignItems: "center",
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,

		// justifyContent: "flex-end",
	},

	headerContainer: {
		width: "100%",
		alignItems: "center",
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

	btnLogout: {
		alignSelf: "flex-end",
		marginTop: 22,
	},

	userName: {
		color: "#212121",
		fontFamily: "RobotoMedium500",
		fontSize: 30,
		letterSpacing: 0.3,

		marginTop: 46,
		marginBottom: 32,
		alignSelf: "center",
	},

	imgContainer: {
		marginBottom: 30,
		// width: "100%",
		// paddingHorizontal: 16,
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
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	commentLikeWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	btnWrapper: {
		flexDirection: "row",
	},
	btnMargin: {
		marginLeft: 24,
	},

	mapWrapper: {
		// borderWidth: 1,
		marginLeft: 24,
		flex: 1, //! hold this item in father container (in buttonsWrapper)
	},

	mapLinkWrapper: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end", //! work only if children in <View>
	},

	btnText: {
		marginLeft: 6,
		color: "#212121",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
	},

	underline: {
		flex: 1, //! hold this item in father container (in mapWrapper)
		textDecorationLine: "underline",
	},
});
