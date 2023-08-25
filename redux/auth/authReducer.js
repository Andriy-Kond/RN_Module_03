// slice об'єднує в собі actions та reducer
import { createSlice } from "@reduxjs/toolkit";

// експорт authSlice буде експортувати ред'юсери з reducers з іменем "auth", а його початковий стан буде ===	initialState

// Extract the action creators object and the reducer
// const { actions, reducer } = postsSlice
// Extract and export each action creator by name
// export const { createPost, updatePost, deletePost } = actions

const initState = {
	userId: null,
	stateChange: false,
	authErrorMessage: null,

	nickname: "",
	email: "",
	password: "",
	currentFocusInput: "",
	showPassword: false,
	phoneAvatar: null,
	serverAvatar: null,
	error: null,
};

const actions = {
	authSignError: (state, action) => {
		return {
			...state,
			authErrorMessage: action.payload,
		};
	},

	// updateField: (state, action) => {
	// 	const { field, value } = action.payload;
	// 	return {
	// 		...state,
	// 		[field]: value,
	// 	};
	// },

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
		// state[field] = !state[field];
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

// Створення slice
export const authSlice = createSlice({
	name: "auth",
	initialState: initState,
	reducers: actions,
});
