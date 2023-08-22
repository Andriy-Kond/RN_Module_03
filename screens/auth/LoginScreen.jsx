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
import { useDispatch, useSelector } from "react-redux";

import { AuthForm } from "./AuthForm";
import { styles } from "./LoginScreenStyles";
import { authError, authSingInUser } from "../../redux/auth/authOperations";
import { useKeyboardState } from "../../utils/keyboardContext";

import bgImage from "../../assets/img/bg_photo.jpg";

import { ModalWindow } from "../../components/ModalWindow";

import { authSlice } from "../../redux/auth/authReducer";
import { useModalContext } from "../../utils/modalWindowContext";

export default function LoginScreen() {
	const initialState = useSelector((state) => state.auth);
	const { resetFields, authSignError } = authSlice.actions;

	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const dispatch = useDispatch();
	const authErrorMessage = useSelector((state) => state.auth.authErrorMessage);

	const { showModalMessagePopup } = useModalContext();

	const submitForm = async () => {
		hideKB();

		try {
			// Очистити попередню помилку перед реєстрацією
			await dispatch(authSignError(null));

			await dispatch(authSingInUser(initialState));

			if (authErrorMessage) {
				await showModalMessagePopup(authErrorMessage);
			}

			// dispatch(resetFields());
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
				<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />

				<KeyboardAvoidingView
					style={styles.kbAvoidingContainer}
					behavior={Platform.OS === "ios" ? "padding" : null}>
					<AuthForm
						mainBtnText={mainBtnText}
						secondBtnText={secondBtnText}
						submitForm={submitForm}
						loginScreen={loginScreen}>
						<ModalWindow />
					</AuthForm>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
