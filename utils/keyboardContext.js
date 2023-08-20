import { createContext, useContext, useState, useEffect } from "react";
import { Keyboard } from "react-native";

const keyboardStateContext = createContext();

export const useKeyboardState = () => {
	return useContext(keyboardStateContext);
};

export const KeyboardStateProvider = ({ children }) => {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);

	// keyboard listeners for press btn "arrowDown" in standard bottom nav-panel
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setIsKeyboardShown(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setIsKeyboardShown(false);
			}
		);
		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const hideKB = () => {
		setIsKeyboardShown(false);
		Keyboard.dismiss();
	};

	return (
		<keyboardStateContext.Provider
			value={{
				isKeyboardShown,
				setIsKeyboardShown,
				hideKB,
			}}>
			{children}
		</keyboardStateContext.Provider>
	);
};
