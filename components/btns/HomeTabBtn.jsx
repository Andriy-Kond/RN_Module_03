import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useButtonState } from "../../utils/tabBtnsContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export function HomeTabBtn({ focused, color, size }) {
	const navigation = useNavigation();
	const { isTabButtonsEnabled, previousScreen } = useButtonState();
	console.log("HomeTabBtn >> isTabButtonsEnabled:", isTabButtonsEnabled);

	const route = useRoute();
	// console.log("HomeTabBtn >> route.params:", route.params?.originScreen);

	const handleHomePress = () => {
		navigation.navigate("Home", { screen: "PostsScreen" });
	};

	return (
		<TouchableOpacity onPress={handleHomePress}>
			<MaterialCommunityIcons
				name="postage-stamp"
				size={30}
				color={
					!isTabButtonsEnabled
						? "green"
						: previousScreen === "PostsScreen"
						? "red"
						: "#212121"
				}
			/>
		</TouchableOpacity>
	);
}
