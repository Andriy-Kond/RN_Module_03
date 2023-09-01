import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useButtonState } from "../../utils/tabBtnsContext";
import Svg, { Path, Rect } from "react-native-svg";
import { useNavScreen } from "../../utils/navContext";

export function TabBtnHome({ focused, color, size, isDisabled }) {
	const navigation = useNavigation();
	const { isTabButtonsEnabled } = useButtonState();

	const handleTabBtnPress = () => {
		navigation.navigate("Home", { screen: "PostsScreen" });
		console.log(
			'TabBtnHome >> navigation.navigate TO ("Home", { screen: "PostsScreen" })'
		);
	};

	const { activeScreen, previousScreen } = useNavScreen();
	// console.log("TabBtnHome >> previousScreen:", previousScreen);
	console.log("TabBtnHome >> activeScreen:", activeScreen);

	return (
		<TouchableOpacity
			onPress={handleTabBtnPress}
			style={styles.activeBtn}
			disabled={isDisabled}>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none">
				<Rect width="24" height="24" fill="white" />
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 3H10V10H3V3Z"
					stroke={isTabButtonsEnabled ? "#212121" : "#BDBDBD"}
					// stroke="#212121"
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M14 3H21V10H14V3Z"
					stroke={isTabButtonsEnabled ? "#212121" : "#BDBDBD"}
					// stroke="#212121"
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M14 14H21V21H14V14Z"
					stroke={isTabButtonsEnabled ? "#212121" : "#BDBDBD"}
					// stroke="#212121"
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 14H10V21H3V14Z"
					// stroke="#212121"
					stroke={isTabButtonsEnabled ? "#212121" : "#BDBDBD"}
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</Svg>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	activeBtn: {
		width: 40,
		height: 40,
		padding: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});
