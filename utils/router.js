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

// components
import { useButtonState } from "../utils/tabBtnsContext";
import { BtnGoBack } from "../components/btns/BtnGoBack";
import {
	useNavigation,
	useNavigationState,
	useRoute,
} from "@react-navigation/native";

import { TabBtnHome } from "../components/btns/TabBtnHome";
import { TabBtnCreatePost } from "../components/btns/TabBtnCreatePost";
import { TabBtnProfile } from "../components/btns/TabBtnProfile";
import { TabBtnProfileOnProfileScreen } from "../components/btns/TabBtnProfileOnProfileScreen";
import { TabBtnCreatePostOnProfileScreen } from "../components/btns/TabBtnCreatePostOnProfileScreen";
import { useState } from "react";

const AuthStack = createStackNavigator();

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

const MainStack = createBottomTabNavigator();
function TabsNavigation() {
	// const route = useRoute();
	// const routeName = route.name;
	// console.log("TabsNavigation >> routeName:", routeName);

	const { isTabButtonsEnabled, previousScreen, activeScreen, setActiveScreen } =
		useButtonState();
	const navigation = useNavigation();
	// const navigationState = useNavigationState((state) => state);
	// const activeScreenIndex = navigationState?.index;
	// console.log("TabsNavigation >> activeScreenIndex:", activeScreenIndex === 1);

	const handleHomePress = () => {
		navigation.navigate("Home", { screen: "PostsScreen" });
	};

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

					tabBarIcon: ({ focused, color, size }) => (
						<TabBtnHome focused={focused} color={color} size={size} />
					),
				}}
				listeners={{
					tabPress: (e) => {
						// setActiveScreen("Home");
						if (!isTabButtonsEnabled) {
							e.preventDefault(); // Disable switching to another screen
							// someFn(); // Call function before transition to another screen
							() => handleHomePress();
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

					tabBarIcon: ({ focused, color, size }) => {
						return (
							<>
								{activeScreen !== "ProfileScreen" ? (
									<TabBtnCreatePost
										focused={focused}
										size={size}
										color={color}
									/>
								) : (
									<TabBtnProfileOnProfileScreen
										focused={focused}
										size={size}
										color={color}
									/>
								)}
							</>
						);
						// <TabBtnCreatePost focused={focused} size={size} color={color} />;
					},
				}}
				// unmountOnBlur={true} // uninstall screen in DOM when focus is outside (set settings of screen in default)
				listeners={{
					tabPress: (e) => {
						// setActiveScreen("CreatePostsScreen");
						if (!isTabButtonsEnabled || activeScreen === "ProfileScreen") {
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

					tabBarIcon: ({ focused, color, size }) => {
						return (
							<>
								{activeScreen !== "ProfileScreen" ? (
									<TabBtnProfile focused={focused} color={color} size={size} />
								) : (
									<TabBtnCreatePostOnProfileScreen
										focused={focused}
										size={size}
										color={color}
									/>
								)}
							</>
						);
					},
				}}
				listeners={{
					tabPress: (e) => {
						// setActiveScreen("ProfileScreen");
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
