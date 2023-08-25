import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useMyRoutes } from "../utils/router";
import { authStateChangeUser } from "../redux/auth/authOperations";

import { ButtonStateProvider } from "../utils/tabBtnsContext";
import { KeyboardStateProvider } from "../utils/keyboardContext";

const Main = () => {
	const dispatch = useDispatch();

	const stateChange = useSelector((state) => state.auth.stateChange);

	const state = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(authStateChangeUser());
	}, []);

	const routing = useMyRoutes(stateChange);

	return (
		<KeyboardStateProvider>
			<ButtonStateProvider>
				<NavigationContainer>
					<StatusBar />
					{routing}
				</NavigationContainer>
			</ButtonStateProvider>
		</KeyboardStateProvider>
	);
};

export default Main;
