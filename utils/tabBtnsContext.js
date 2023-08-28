import { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => {
	return useContext(ButtonStateContext);
};

export const ButtonStateProvider = ({ children }) => {
	const [isTabButtonsEnabled, setIsTabButtonsEnabled] = useState(true);
	const [previousScreen, setPreviousScreen] = useState("Home");
	const [activeScreen, setActiveScreen] = useState("Home");

	const toggleButtonsEnabled = (btnsState) => {
		setIsTabButtonsEnabled(btnsState);
	};

	const setCurrentScreen = (newScreen) => {
		console.log("newScreen ::", newScreen);
		console.log("Previous:", previousScreen);
		console.log("active:", activeScreen);
		if (newScreen === "Home" && previousScreen === "PostsScreen") {
			return;
		} else {
			if (activeScreen !== newScreen) {
				console.log("ЗАПИС ПРЕВІОУС!");
				setPreviousScreen(activeScreen);
			}
			setActiveScreen(newScreen);
		}
	};

	return (
		<ButtonStateContext.Provider
			value={{
				isTabButtonsEnabled,
				toggleButtonsEnabled,
				previousScreen,
				setPreviousScreen,
				activeScreen,
				setCurrentScreen,
			}}>
			{children}
		</ButtonStateContext.Provider>
	);
};
