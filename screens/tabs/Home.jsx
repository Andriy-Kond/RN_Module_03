import { createStackNavigator } from "@react-navigation/stack";
// import { useIsFocused, useRoute } from "@react-navigation/native";
// import { useEffect } from "react";
import { StyleSheet } from "react-native";

// screens
import PostsScreen from "../tabsNested/PostsScreen";
import MapScreen from "../tabsNested/MapScreen";
import CommentsScreen from "../tabsNested/CommentsScreen";

import { BtnGoBack } from "../../components/btns/BtnGoBack";
import { BtnLogout } from "../../components/btns/BtnLogout";
import { useIsFocused } from "@react-navigation/native";
import { useButtonState } from "../../utils/tabBtnsContext";

const NestedStack = createStackNavigator();

export default function Home() {
	// const route = useRoute();

	const isFocused = useIsFocused();
	// useEffect(() => {
	// 	if (isFocused) {
	// 		console.log("Home >> route:", route.name);
	// 	}
	// }, [isFocused]);

	const { setActiveScreen } = useButtonState();
	isFocused && setActiveScreen("Home");

	return (
		<NestedStack.Navigator
			initialRouteName="PostsScreen"
			screenOptions={{
				headerStyle: styles.headerStyle,
				headerTitleStyle: styles.headerTitleStyle,
			}}>
			<NestedStack.Screen
				name="PostsScreen"
				component={PostsScreen}
				options={{
					title: "Публікації",
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleAlign: "center",

					headerRight: () => <BtnLogout buttonStyle={styles.container} />,
				}}
			/>

			<NestedStack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{
					title: "Мапа",
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleAlign: "center",
					headerLeft: () => <BtnGoBack />,
				}}
			/>

			<NestedStack.Screen
				name="CommentsScreen"
				component={CommentsScreen}
				options={{
					title: "Коментарі",
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleAlign: "center",
					headerLeft: () => <BtnGoBack />,
				}}
			/>
		</NestedStack.Navigator>
	);
}

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},

	headerStyle: {
		borderBottomWidth: 0.5,
		borderBottomColor: "rgba(0, 0, 0, 0.3)",
		height: 88,
	},

	headerTitleStyle: {
		alignItems: "center",
		color: "#212121",

		fontFamily: "RobotoMedium500",
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: -0.408,
	},
});
