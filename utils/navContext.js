import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const useNavScreen = () => {
	return useContext(NavContext);
};

export const NavScreenProvider = ({ children }) => {
	const [previousScreen, setPreviousScreen] = useState("PostsScreen");
	const [activeScreen, setActiveScreen] = useState("PostsScreen");
	console.log("activeScreen:", activeScreen);

	const setCurrentScreen = (newScreen) => {
		if (newScreen === "Home" && previousScreen === "PostsScreen") {
			return;
		} else {
			if (activeScreen === newScreen) {
				return;
			} else {
				setPreviousScreen(activeScreen);
				setActiveScreen(newScreen);
			}
		}
	};

	const setLogoutScreen = () => {
		setPreviousScreen(activeScreen);
		setActiveScreen("PostsScreen");
	};

	return (
		<NavContext.Provider
			value={{
				previousScreen,

				activeScreen,
				setCurrentScreen,
				setLogoutScreen,
			}}>
			{children}
		</NavContext.Provider>
	);
};
