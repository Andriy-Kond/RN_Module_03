import { Provider } from "react-redux";
import { store } from "./redux/store";

// fonts
import { useFonts } from "expo-font";
import RobotoNormal400 from "./assets/fonts/Roboto-Regular-400.ttf";
import RobotoMedium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import RobotoBold700 from "./assets/fonts/Roboto-Bold-700.ttf";

// components
import Main from "./components/Main";

export default function App() {
	const [fontsLoaded] = useFonts({
		RobotoNormal400,
		RobotoMedium500,
		RobotoBold700,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
