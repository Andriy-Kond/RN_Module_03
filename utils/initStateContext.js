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
	avatar: null,
	error: null,
};

// Reducer for state change
function initStateReducer(state, action) {
	switch (action.type) {
		case "UPDATE_FIELD":
			return { ...state, [action.field]: action.value };
		case "TOGGLE_FIELD":
			return { ...state, [action.field]: !state[action.field] };
		case "RESET_FIELDS":
			return initialState;
		default:
			return state;
	}
}

// Компонент-постачальник контексту
export function InitStateProvider({ children }) {
	const [initialState, initStateDispatch] = useReducer(
		initStateReducer,
		initialState
	);

	return (
		<InitStateContext.Provider value={{ initialState, initStateDispatch }}>
			{children}
		</InitStateContext.Provider>
	);
}
