import {
	Image,
	View,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AuthForm } from "./AuthForm";
import { authSlice } from "../../redux/auth/authReducer";
import { authSingInUser } from "../../redux/auth/authOperations";

import { useKeyboardState } from "../../utils/keyboardContext";
import { ModalWindow } from "../../components/ModalWindow";
import bgImage from "../../assets/img/bg_photo.jpg";

import { styles } from "./LoginScreenStyles";

export default function LoginScreen() {
	const initState = useSelector((state) => state.auth);
	const { authSignError } = authSlice.actions;
	const { hideKB } = useKeyboardState();
	const dispatch = useDispatch();

	const submitForm = async () => {
		hideKB();

		try {
			// Очистити попередню помилку перед реєстрацією
			dispatch(authSignError(null));

			// Call login operation
			dispatch(authSingInUser(initState));
		} catch (error) {
			console.error("submitForm >>> error:", error);
		}
	};

	const mainBtnText = "Увійти";
	const secondBtnText = "Немає акаунту? Зареєструватися";
	const loginScreen = true;

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				{initState.authErrorMessage && <ModalWindow />}
				<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />
				<KeyboardAvoidingView
					style={styles.kbAvoidingContainer}
					behavior={Platform.OS === "ios" ? "padding" : null}>
					<AuthForm
						mainBtnText={mainBtnText}
						secondBtnText={secondBtnText}
						submitForm={submitForm}
						loginScreen={loginScreen}></AuthForm>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
