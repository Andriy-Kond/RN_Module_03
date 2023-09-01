// import { useSelector } from "react-redux";
// import { navigationSlice } from "./navigationReducer";

// const { setActiveScreen, setPreviousScreen } = navigationSlice.actions;

// const { activeScreen, previousScreen } = useSelector(
// 	(state) => state.navigation
// );

// export const setCurrentActiveScreen =
// 	(newScreen, activeScreen, previousScreen) => async (dispatch, getState) => {
// 		try {
// 			if (newScreen === "Home" && previousScreen === "PostsScreen") {
// 				return;
// 			} else {
// 				if (activeScreen === newScreen) {
// 					return;
// 				} else {
// 					await dispatch(setPreviousScreen(activeScreen));
// 					await dispatch(setActiveScreen(newScreen));
// 				}
// 			}
// 		} catch (error) {
// 			console.log("setCurrentActiveScreen >> error:", error);
// 		}
// 	};
