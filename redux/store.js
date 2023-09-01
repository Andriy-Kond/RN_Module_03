import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
// import { navigationSlice } from "./navigation/navigationReducer";

const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	// [navigationSlice.name]: navigationSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
