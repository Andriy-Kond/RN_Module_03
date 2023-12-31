import { createStackNavigator } from "@react-navigation/stack";

// screens
import PostsScreen from "../tabsNested/PostsScreen";
import MapScreen from "../tabsNested/MapScreen";
import CommentsScreen from "../tabsNested/CommentsScreen";

// components
import { BtnGoBack } from "../../components/btns/BtnGoBack";
import { BtnLogout } from "../../components/btns/BtnLogout";

import { styles } from "./HomeStyles";

const NestedStack = createStackNavigator();
export default function Home() {
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
					tabBarStyle: { display: "none" },
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
					tabBarStyle: { display: "none" },
					title: "Коментарі",
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleAlign: "center",

					headerLeft: () => <BtnGoBack />,
				}}
			/>
		</NestedStack.Navigator>
	);
}
