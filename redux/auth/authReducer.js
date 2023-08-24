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
	avatar: null,
	error: null,
};

const actions = {
	authSignError: (state, action) => {
		return {
			...state,
			authErrorMessage: action.payload,
		};
	},

	updateField: (state, action) => {
		const { field, value } = action.payload;
		state[field] = value;
		console.log("after updateField state.avatar:", state.avatar);
	},

	toggleField: (state, action) => {
		const { field } = action.payload;
		state[field] = !state[field];
	},

	updateUserProfile: (state, action) => ({
		...state,
		userId: action.payload.userId,
		nickname: action.payload.nickname,
		avatar: action.payload.avatar,
	}),

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

// Експортуємо редуктор та дії
// export const {
// 	updateField,
// 	toggleField,
// 	resetFields,
// 	updateUserProfile,
// 	updateStateChange,
// 	authSingOut,
// 	authSignError,
// } = authSlice.actions;

// export default authSlice.reducer; //? що це?

// initStateChanger: (state, action) => {
// 	switch (action.payload.type) {
// 		case "UPDATE_FIELD":
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case "TOGGLE_FIELD":
// 			return {
// 				...state,
// 				[action.payload.field]: !state[action.payload.field],
// 			};
// 		case "RESET_FIELDS":
// 			return {
// 				...state,
// 				nickname: "",
// 				email: "",
// 				password: "",
// 				currentFocusInput: "",
// 				showPassword: false,
// 				avatar: null,
// 				error: null,
// 			};
// 		default:
// 			return state;
// 	}
// },
