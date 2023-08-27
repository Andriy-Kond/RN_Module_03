// navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// styles
import { styles } from "./routerStyles";

// screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegsisterScreen";
import Home from "../screens/tabs/Home";
import CreatePostsScreen from "../screens/tabs/CreatePostsScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import PostsScreen from "../screens/tabsNested/PostsScreen";

import {
	FontAwesome5,
	MaterialCommunityIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";

// components
import { useButtonState } from "../utils/tabBtnsContext";
import { BtnGoBack } from "../components/btns/BtnGoBack";

const AuthStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

function AuthNavigation() {
	return (
		<AuthStack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{ headerShown: false }} // settings for all screens
		>
			<AuthStack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{ title: "Login screen" }} // settings for current screen
			/>

			<AuthStack.Screen
				name="RegisterScreen"
				component={RegisterScreen}
				options={{ title: "Registration screen" }}
			/>
		</AuthStack.Navigator>
	);
}

function TabsNavigation() {
	const { isTabButtonsEnabled } = useButtonState();

	return (
		<MainStack.Navigator
			initialRouteName="Home"
			screenOptions={{
				// tabBarHideOnKeyboard: true, // Hide tab-bar when keyboard shown
				tabBarShowLabel: false, // Show title on bottom tab-buttons
				headerStyle: styles.headerStyle,
			}}>
			<MainStack.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false,
					// title: "Публікації",
					// headerTitleStyle: styles.headerTitleStyle,
					// headerTitleAlign: "center",

					tabBarIcon: ({ focused, color, size }) => (
						<MaterialCommunityIcons
							name="postage-stamp"
							size={size}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault(); // Prohibit switching to another screen
							// someFn(); // Call function before transition to another screen
						}
					},
				}}
			/>

			<MainStack.Screen
				name="CreatePostsScreen"
				component={CreatePostsScreen}
				options={{
					title: "Створити публікацію",
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleAlign: "center",
					headerLeft: () => <BtnGoBack />,

					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="plus"
							size={35}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				// unmountOnBlur={true} // uninstall screen in DOM when focus is outside (set settings of screen in default)
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault();
						}
					},
				}}
			/>

			<MainStack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					title: "Профіль",
					headerTitleAlign: "center",
					headerShown: false,

					tabBarIcon: ({ focused, color, size }) => (
						<SimpleLineIcons
							name="user"
							size={size}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault();
						}
					},
				}}
			/>
		</MainStack.Navigator>
	);
}

export const useMyRoutes = (isAuth) => {
	return !isAuth ? <AuthNavigation /> : <TabsNavigation />;
};
