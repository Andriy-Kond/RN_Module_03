import { useReducer, createContext } from "react";
import { inputsReducer, inputsInitialState } from "./inputsReducer";

export const InputsStateContext = createContext();

export const InputsContextContainer = ({ children }) => {
	const [inputsState, inputsStateDispatch] = useReducer(
		inputsReducer,
		inputsInitialState
	);

	return (
		<InputsStateContext.Provider value={{ inputsState, inputsStateDispatch }}>
			{children}
		</InputsStateContext.Provider>
	);
};
