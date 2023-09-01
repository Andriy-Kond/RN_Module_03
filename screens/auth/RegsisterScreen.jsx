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
import { authSingUpUser } from "../../redux/auth/authOperations";

import { useKeyboardState } from "../../utils/keyboardContext";
import { ModalWindow } from "../../components/ModalWindow";
import bgImage from "../../assets/img/bg_photo.jpg";

import { styles } from "./RegsisterScreenStyles";

export default function RegisterScreen() {
	const state = useSelector((state) => state.auth);
	const { authSignError } = authSlice.actions;
	const { hideKB } = useKeyboardState();
	const dispatch = useDispatch();

	const submitForm = async () => {
		await hideKB();
		try {
			// Clear previous value of error
			dispatch(authSignError(null));

			// Call register operation
			dispatch(authSingUpUser(state));
		} catch (error) {
			console.error("submitForm >>> error:", error);
		}
	};

	// Props for AuthForm:
	const mainBtnText = "Зареєструватися";
	const secondBtnText = "Вже є акаунт? Увійти";
	const loginScreen = false;

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.registrationContainer}>
				{state.authErrorMessage && <ModalWindow />}
				<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />

				<KeyboardAvoidingView
					style={styles.kbAvoidingContainer}
					behavior={Platform.OS === "ios" ? "padding" : null}>
					<AuthForm
						mainBtnText={mainBtnText}
						secondBtnText={secondBtnText}
						submitForm={submitForm}
						loginScreen={loginScreen}
					/>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
