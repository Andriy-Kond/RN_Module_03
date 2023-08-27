import { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => {
	return useContext(ButtonStateContext);
};

export const ButtonStateProvider = ({ children }) => {
	const [isTabButtonsEnabled, setIsTabButtonsEnabled] = useState(true);
	const [previousScreen, setPreviousScreen] = useState(true);

	const toggleButtonsEnabled = (btnsState) => {
		setIsTabButtonsEnabled(btnsState);
	};

	return (
		<ButtonStateContext.Provider
			value={{
				isTabButtonsEnabled,
				toggleButtonsEnabled,
				previousScreen,
				setPreviousScreen,
			}}>
			{children}
		</ButtonStateContext.Provider>
	);
};
