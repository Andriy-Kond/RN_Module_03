import { createContext, useContext, useReducer } from "react";

// create context
const InitStateContext = createContext();

// Функція для зручного використання контексту в компонентах
export function useInitStateContext() {
	return useContext(InitStateContext);
}

// Initial state
const initialState = {
	nickname: "",
	email: "",
	password: "",
	currentFocusInput: "",
	showPassword: false,
};

// Reducer for state change
function initStateReducer(state, action) {
	switch (action.type) {
		case "UPDATE_FIELD":
			return { ...state, [action.field]: action.value };
		default:
			return state;
	}
}

// Компонент-постачальник контексту
export function InitStateProvider({ children }) {
	const [initState, initStateDispatch] = useReducer(
		initStateReducer,
		initialState
	);

	return (
		<InitStateContext.Provider value={{ initState, initStateDispatch }}>
			{children}
		</InitStateContext.Provider>
	);
}
