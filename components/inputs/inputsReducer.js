export const inputsInitialState = {
	inputs: {
		loginInput: "",
		emailInput: "",
		passwordInput: "",
	},
	login: "",
	email: "",
	password: "",
	focus: false,
};

export const inputsReducer = (state, action) => {
	switch (action.type) {
		case "FOCUS_CHANGE":
			return {
				...state,
				focus: action.isFocused,
				inputs: {
					...state.inputs,
					[action.name]: action.isFocused,
				},
			};

		case "LOGIN_CHANGE":
			return {
				...state,
				login: action.login,
			};

		case "EMAIL_CHANGE":
			return {
				...state,
				email: action.email,
			};

		case "PASSWORD_CHANGE":
			return {
				...state,
				password: action.password,
			};

		case "SUBMIT":
			return inputsInitialState;

		default:
			return state;
	}
};
