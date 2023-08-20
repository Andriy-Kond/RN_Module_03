// import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	// ImageBackground,
	Image,
	// Text,
	View,
	// TextInput,
	// TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

import { AuthForm } from "./AuthForm";
import { styles } from "./RegsisterScreenStyles";
import { authSingUpUser } from "../../redux/auth/authOperations";
import { useKeyboardState } from "../../utils/keyboardContext";

// import { BtnMain } from "../../components/btns/BtnMain";
// import { BtnSecond } from "../../components/btns/BtnSecond";
import bgImage from "../../assets/img/bg_photo.jpg";
import { useInitStateContext } from "../../utils/initStateContext";

// const initialState = {
// 	nickname: "",
// 	email: "",
// 	password: "",
// 	currentFocusInput: "",
// 	showPassword: false,
// };

export default function LoginScreen() {
	const { initialState, initStateDispatch } = useInitStateContext();

	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const dispatch = useDispatch();
	// const navigation = useNavigation();
	// const [state, setState] = useState(initialState);

	// const handleNicknameChange = (newNickname) => {
	// 	dispatch({ type: "UPDATE_FIELD", field: "nickname", value: newNickname });
	// };

	const submitForm = () => {
		hideKB();
		dispatch(authSingUpUser(initialState));
		initStateDispatch({ type: "RESET_FIELDS" });
	};

	const mainBtnText = "Зареєструватися";
	const secondBtnText = "Вже є акаунт? Увійти";
	const loginScreen = false;

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.registrationContainer}>
				<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />

				<KeyboardAvoidingView
					style={styles.kbAvoidingContainer}
					behavior={Platform.OS === "ios" ? "padding" : null}>
					<AuthForm
						mainBtnText={mainBtnText}
						secondBtnText={secondBtnText}
						// initialState={initialState}
						submitForm={submitForm}
						loginScreen={loginScreen}
						// style={styles.loginFormContainer}
					/>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 	},

// 	imageBackground: {
// 		flex: 1,
// 		resizeMode: "cover",
// 		justifyContent: "flex-end",
// 		paddingVertical: 30,
// 	},
// 	keyboardView: {
// 		flex: 1,
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 	},
// 	text: {
// 		color: "#000",
// 		fontSize: 30,
// 	},
// 	form: {
// 		padding: 20,
// 		width: "100%",
// 	},
// 	inputTitle: {
// 		marginBottom: 5,
// 		fontSize: 18,
// 		padding: 5,
// 		fontFamily: "RobotoBold700",
// 		color: "#fe0606",
// 	},
// 	input: {
// 		borderWidth: 2,
// 		height: 50,
// 		borderColor: "#000",
// 		paddingHorizontal: 20,
// 		borderRadius: 10,
// 		color: "#fff",
// 		textAlign: "center",
// 		fontSize: 24,
// 		backgroundColor: "rgba(0, 0, 0, 0.5)",
// 	},
// 	btn: {
// 		marginVertical: 20,
// 		backgroundColor: "blue",
// 		height: 40,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		borderRadius: 10,
// 	},
// 	btnText: {
// 		color: "#fff",
// 		fontSize: 20,
// 		fontFamily: "RobotoRegular400",
// 	},
// });
