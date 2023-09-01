import { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => {
	return useContext(ButtonStateContext);
};

export const ButtonStateProvider = ({ children }) => {
	const [isTabButtonsEnabled, setIsTabButtonsEnabled] = useState(true);

	// const [previousScreen, setPreviousScreen] = useState("PostsScreen");
	// const [activeScreen, setActiveScreen] = useState("PostsScreen");

	const toggleButtonsEnabled = (btnsState) => {
		setIsTabButtonsEnabled(btnsState);
	};

	// const setCurrentScreen = (newScreen) => {
	// 	if (newScreen === "Home" && previousScreen === "PostsScreen") {
	// 		return;
	// 	} else {
	// 		if (activeScreen === newScreen) {
	// 			return;
	// 		} else {
	// 			setPreviousScreen(activeScreen);
	// 			setActiveScreen(newScreen);
	// 		}
	// 	}
	// };

	// const setLogoutScreen = () => {
	// 	setPreviousScreen(activeScreen);
	// 	setActiveScreen("PostsScreen");
	// };

	return (
		<ButtonStateContext.Provider
			value={{
				isTabButtonsEnabled,
				toggleButtonsEnabled,
				// previousScreen,
				// setPreviousScreen,
				// activeScreen,
				// setCurrentScreen,
				// setLogoutScreen,
			}}>
			{children}
		</ButtonStateContext.Provider>
	);
};
