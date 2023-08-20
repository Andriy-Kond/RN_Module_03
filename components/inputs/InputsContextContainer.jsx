import { useReducer, createContext } from "react";
import { inputsReducer, inputsInitialState } from "./inputsReducer";

export const InputsStateContext = createContext();

export const InputsContextContainer = ({ children }) => {
	const [inputsState, dispatch] = useReducer(inputsReducer, inputsInitialState);

	return (
		<InputsStateContext.Provider value={{ inputsState, dispatch }}>
			{children}
		</InputsStateContext.Provider>
	);
};
