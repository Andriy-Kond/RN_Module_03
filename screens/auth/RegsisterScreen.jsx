// import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	Image,
	View,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AuthForm } from "./AuthForm";
import { styles } from "./RegsisterScreenStyles";
import { authError, authSingUpUser } from "../../redux/auth/authOperations";
import { useKeyboardState } from "../../utils/keyboardContext";

import bgImage from "../../assets/img/bg_photo.jpg";
import { useInitStateContext } from "../../utils/initStateContext";

import { dbFirestore, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uriToBlob } from "../../utils/uriToBlob";
import { useModalContext } from "../../utils/modalWindowContext";
import { ModalWindow } from "../../components/ModalWindow";

export default function RegisterScreen() {
	const { initialState, initStateDispatch } = useInitStateContext();
	const { showModalMessagePopup } = useModalContext();
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const dispatch = useDispatch();
	const authErrorMessage = useSelector((state) => state.auth.authErrorMessage);

	// const navigation = useNavigation();
	// const [state, setState] = useState(initialState);

	// const handleNicknameChange = (newNickname) => {
	// 	dispatch({ type: "UPDATE_FIELD", field: "nickname", value: newNickname });
	// };

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
			dispatch(authError(null));

			if (urlAvatar) {
				// Отримання даних з серверу
				const serverUrlAvatar = await uploadPhotoToServer(urlAvatar);

				await initStateDispatch({
					type: "UPDATE_FIELD",
					field: "avatar",
					value: serverUrlAvatar,
				});
			}

			// Викликати операцію реєстрації

			dispatch(authSingUpUser(initialState));
			console.log("submitForm >> initialState:", initialState);

			// Показати помилку, якщо вона є
			console.log("submitForm >> authErrorMessage:", authErrorMessage);
			if (authErrorMessage) {
				await showModalMessagePopup(authErrorMessage);
			}

			await initStateDispatch({ type: "RESET_FIELDS" });
		} catch (error) {
			console.log("submitForm >> error:", error);
		}
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
						submitForm={submitForm}
						loginScreen={loginScreen}
					/>
				</KeyboardAvoidingView>

				<ModalWindow />
			</View>
		</TouchableWithoutFeedback>
	);
}
