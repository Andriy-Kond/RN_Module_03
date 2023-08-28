import { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => {
	return useContext(ButtonStateContext);
};

export const ButtonStateProvider = ({ children }) => {
	const [isTabButtonsEnabled, setIsTabButtonsEnabled] = useState(true);
	const [previousScreen, setPreviousScreen] = useState(true);
	const [activeScreen, setActiveScreen] = useState("Home");

	const toggleButtonsEnabled = (btnsState) => {
		setIsTabButtonsEnabled(btnsState);
	};

	const setCurrentScreen = (screen) => {
		setActiveScreen(screen);
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
