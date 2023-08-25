import { Provider } from "react-redux";
import { store } from "./redux/store";

// fonts
import { useFonts } from "expo-font";
import RobotoRegular400 from "./assets/fonts/Roboto-Regular-400.ttf";
import RobotoMedium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import RobotoBold700 from "./assets/fonts/Roboto-Bold-700.ttf";

// components
import Main from "./components/Main";
// import { ButtonStateProvider } from "./utils/tabBtnsContext";
// import { KeyboardStateProvider } from "./utils/keyboardContext";

export default function App() {
	const [fontsLoaded] = useFonts({
		RobotoRegular400,
		RobotoMedium500,
		RobotoBold700,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			{/* <KeyboardStateProvider>
				<ButtonStateProvider> */}
			<Main></Main>
			{/* </ButtonStateProvider>
			</KeyboardStateProvider> */}
		</Provider>
	);
}
