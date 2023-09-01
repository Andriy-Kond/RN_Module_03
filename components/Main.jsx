import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useMyRoutes } from "../utils/router";
import { authStateChangeUser } from "../redux/auth/authOperations";

import { ButtonStateProvider } from "../utils/tabBtnsContext";
import { KeyboardStateProvider } from "../utils/keyboardContext";
import { NavScreenProvider } from "../utils/navContext";

const Main = () => {
	const dispatch = useDispatch();

	const authState = useSelector((state) => state.auth);
	console.log("Main >> authState:", authState);

	const { stateChange } = useSelector((state) => state.auth);

	useEffect(() => {
		console.log(
			" ЗАПУСКАЮ ВПЕРШЕ І В ОСТАННЄ: dispatch(authStateChangeUser());"
		);
		dispatch(authStateChangeUser());
		console.log(" ЗАКІНЧИВ ВИКОНАННЯ: dispatch(authStateChangeUser());");
	}, []);

	const routing = useMyRoutes(stateChange);

	return (
		<KeyboardStateProvider>
			<NavScreenProvider>
				<ButtonStateProvider>
					<NavigationContainer>
						<StatusBar />
						{routing}
					</NavigationContainer>
				</ButtonStateProvider>
			</NavScreenProvider>
		</KeyboardStateProvider>
	);
};

export default Main;
