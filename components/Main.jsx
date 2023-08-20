import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useMyRoutes } from "../utils/router";
import { authStateChangeUser } from "../redux/auth/authOperations";

// Components
import { InputsContextContainer } from "./inputs/InputsContextContainer";

const Main = () => {
	const dispatch = useDispatch();

	const stateChange = useSelector((state) => state.auth.stateChange);

	useEffect(() => {
		dispatch(authStateChangeUser());
	}, []);

	const routing = useMyRoutes(stateChange);

	return (
		<InputsContextContainer>
			<NavigationContainer>
				<StatusBar />
				{routing}
			</NavigationContainer>
		</InputsContextContainer>
	);
};

export default Main;
