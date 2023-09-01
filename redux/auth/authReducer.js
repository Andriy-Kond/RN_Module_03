import { createSlice } from "@reduxjs/toolkit";

const initState = {
	userId: null,
	stateChange: false,
	authErrorMessage: null,

	nickname: "",
	email: "",
	password: "",
	currentFocusInput: "",
	showPassword: false,

	serverAvatar: null,
};

const actions = {
	authSignError: (state, action) => {
		return {
			...state,
			authErrorMessage: action.payload,
		};
	},

	updateField: (state, action) => {
		return {
			...state,
			...action.payload,
		};
	},

	toggleField: (state, action) => {
		const { field } = action.payload;
		return {
			...state,
			[field]: !state[field],
		};
	},

	updateUserProfile: (state, action) => {
		return {
			...state,
			...action.payload,
		};
	},

	updateStateChange: (state, action) => {
		return {
			...state,
			stateChange: action.payload.stateChange,
		};
	},

	authSingOut: (state, action) => initState,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initState,
	reducers: actions,
});
