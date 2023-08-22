import { createStackNavigator } from "@react-navigation/stack";

// screens
import DefaultScreenPosts from "../tabsNested/DefaultScreenPosts";
import MapScreen from "../tabsNested/MapScreen";
import CommentsScreen from "../tabsNested/CommentsScreen";

import { BtnGoBack } from "../../components/btns/BtnGoBack";
import { BtnLogout } from "../../components/btns/BtnLogout";

// import { useSelector } from "react-redux";
const NestedStack = createStackNavigator();

export default function NestedNavigation() {
	return (
		<NestedStack.Navigator
			screenOptions={{
				headerStyle: styles.headerStyle,
			}}>
			<NestedStack.Screen
				name="DefaultScreenPosts"
				component={DefaultScreenPosts}
				options={{
					title: "Публікації",
					headerTitleStyle: styles.headerTitle,
					headerTitleAlign: "center",

					headerRight: () => <BtnLogout buttonStyle={styles.container} />,
				}}
			/>
			<NestedStack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{
					title: "Мапа",
					headerTitleStyle: styles.headerTitle,
					headerTitleAlign: "center",
					headerLeft: () => <BtnGoBack />,
				}}
			/>
			<NestedStack.Screen
				name="CommentsScreen"
				component={CommentsScreen}
				options={{
					title: "Коментарі",
					headerTitleStyle: styles.headerTitle,
					headerTitleAlign: "center",
					headerLeft: () => <BtnGoBack />,
				}}
			/>
		</NestedStack.Navigator>
	);
}

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},

	headerStyle: {
		borderBottomWidth: 0.5,
		borderBottomColor: "rgba(0, 0, 0, 0.30)",
	},

	headerTitle: {
		alignItems: "center",
		color: "#212121",

		fontFamily: "RobotoMedium500",
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: -0.408,
	},
});
