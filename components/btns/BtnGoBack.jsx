import {
	useIsFocused,
	// useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
// import { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useButtonState } from "../../utils/tabBtnsContext";
// import { useButtonState } from "../../utils/tabBtnsContext";

export function BtnGoBack({ buttonStyle }) {
	const navigation = useNavigation();
	const route = useRoute();

	const { isTabButtonsEnabled, previousScreen, activeScreen } =
		useButtonState();
	console.log("BtnGoBack >> previousScreen:", previousScreen);
	console.log("BtnGoBack >> activeScreen:", activeScreen);

	// const isFocused = useIsFocused();
	// const handleGoBack = () => {
	// 	const originScreen = route.params?.originScreen;
	// 	if (originScreen) {
	// 		navigation.navigate(route.params?.originScreen, {
	// 			sourceScreen: originScreen,
	// 		});
	// 	} else {
	// 		navigation.goBack();
	// 	}

	// 	// navigation.goBack();
	// };

	const handleGoBack = () => {
		// const { originScreen } = route.params;
		// console.log("handleGoBack >> originScreen:", originScreen);
		// console.log("BtnGoBack >> originScreen:", originScreen);
		if (previousScreen !== "Home") {
			navigation.navigate(previousScreen);
		} else {
			navigation.navigate("Home", { screen: "PostsScreen" });
		}
	};

	return (
		// Button for GoBack
		<TouchableOpacity
			style={[styles.button, buttonStyle]}
			onPress={handleGoBack}>
			<Svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<Path
					d="M20 12H4"
					stroke="#212121"
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M10 18L4 12L10 6"
					stroke="#212121"
					stroke-opacity="0.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</Svg>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		marginLeft: 16,
	},
});
