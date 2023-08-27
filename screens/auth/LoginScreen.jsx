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
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect } from "react";

export default function LoginScreen() {
	const route = useRoute();
	console.log("LoginScreen >> route:", route.name);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			console.log("LoginScreen focused");
		}
	}, [isFocused]);

	const initState = useSelector((state) => state.auth);
	const { authSignError } = authSlice.actions;
	const { hideKB } = useKeyboardState();
	const dispatch = useDispatch();

	const submitForm = async () => {
		hideKB();

		try {
			// Clear error field in state
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
