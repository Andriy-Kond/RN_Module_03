import {
	Image,
	View,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

import { AuthForm } from "./AuthForm";
import { authSlice } from "../../redux/auth/authReducer";
import { authSingUpUser } from "../../redux/auth/authOperations";

import { useKeyboardState } from "../../utils/keyboardContext";
import { uriToBlob } from "../../utils/uriToBlob";
import { ModalWindow } from "../../components/ModalWindow";
import bgImage from "../../assets/img/bg_photo.jpg";

import { styles } from "./RegsisterScreenStyles";

export default function RegisterScreen() {
	const initState = useSelector((state) => state.auth);
	const { updateField, authSignError } = authSlice.actions;
	const { hideKB } = useKeyboardState();
	const dispatch = useDispatch();

	const uploadPhotoToServer = async (urlAvatar) => {
		try {
			// to BLOB from uri
			const blobFile = await uriToBlob(urlAvatar);

			// send to storage
			const uniqPostId = Date.now().toString();
			const storageRef = ref(storage, `${uniqPostId}`);
			await uploadBytes(storageRef, blobFile);

			// take from server
			const url = await getDownloadURL(storageRef);
			return url;
		} catch (e) {
			console.error("Error adding data: ", e);
			throw e;
		}
	};

	const submitForm = async (urlAvatar) => {
		hideKB();

		try {
			// Очистити попередню помилку перед реєстрацією
			dispatch(authSignError(null));

			if (urlAvatar) {
				// Отримання даних з серверу
				const serverUrlAvatar = await uploadPhotoToServer(urlAvatar);

				dispatch(
					updateField({ field: "serverAvatar", value: serverUrlAvatar })
				);
				console.log("submitForm >> initState 02:", initState);
			}

			// Call register operation
			dispatch(authSingUpUser(initState));
		} catch (error) {
			console.error("submitForm >>> error:", error);
		}
	};

	const mainBtnText = "Зареєструватися";
	const secondBtnText = "Вже є акаунт? Увійти";
	const loginScreen = false;

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.registrationContainer}>
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
