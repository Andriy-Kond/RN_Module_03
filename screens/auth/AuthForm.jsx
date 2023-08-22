import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Circle, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";

import { authSlice } from "../../redux/auth/authReducer";
import { useKeyboardState } from "../../utils/keyboardContext";

import { ModalWindow } from "../../components/ModalWindow";
import { BtnSecond } from "../../components/btns/BtnSecond";
import { BtnMain } from "../../components/btns/BtnMain";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";

import { styles } from "./AuthFormStyles";

export function AuthForm({
	mainBtnText,
	secondBtnText,
	submitForm,
	loginScreen,
}) {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { toggleField, updateField } = authSlice.actions;
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const initialState = useSelector((state) => state.auth);

	async function updateCurrentField(field, value) {
		dispatch(
			updateField({
				field,
				value,
			})
		);
	}
	async function addAvatar() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [3, 3],
			quality: 1,
		});

		if (!result.canceled) {
			await updateCurrentField("avatar", result.assets[0].uri);
			// dispatch(
			// 	updateField({
			// 		field: "avatar",
			// 		value: result.assets[0].uri,
			// 	})
			// );
		} else {
			await updateCurrentField(
				"authErrorMessage",
				"Доступ до сховища не наданий"
			);
			// dispatch(
			// 	updateField({
			// 		field: "authErrorMessage",
			// 		value: "Доступ до сховища не наданий",
			// 	})
			// );
		}
	}

	const authErrorMessage = useSelector((state) => state.auth.authErrorMessage);

	return (
		<View
			style={[
				styles.form,
				loginScreen ? { paddingBottom: 132 } : { paddingBottom: 66 },
				isKeyboardShown && { paddingBottom: 16 },
			]}>
			{initialState.authErrorMessage && (
				<ModalWindow modalMessage={authErrorMessage} />
			)}
			{!loginScreen && (
				<View style={styles.regImageContainer}>
					<Image
						style={styles.avatarImg}
						source={
							initialState?.avatar ? { uri: initialState.avatar } : regEmptyImg
						}
					/>

					<TouchableOpacity style={[styles.regAddImgBtn]} onPress={addAvatar}>
						<Svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<Circle cx="12.5" cy="12.5" r="12" fill="#fff" stroke="#FF6C00" />
							<Path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
								fill="#FF6C00"
							/>
						</Svg>
					</TouchableOpacity>
				</View>
			)}

			<Text
				style={[
					styles.formTitle,
					loginScreen ? { marginTop: 32 } : { marginTop: 92 },
				]}>
				{loginScreen ? "Увійти" : "Реєстрація"}
			</Text>

			<View style={styles.inputsWrapper}>
				{!loginScreen && (
					<TextInput
						autoFocus
						value={initialState?.nickname}
						placeholder={"Логін"}
						placeholderTextColor={"#BDBDBD"}
						style={[
							styles.input,
							initialState?.currentFocusInput === "nickname" &&
								styles.inputFocused,
						]}
						onSubmitEditing={hideKB} // press OK key on KB
						onFocus={() => {
							setIsKeyboardShown(true);
							updateCurrentField("currentFocusInput", "nickname");
							// dispatch(
							// 	updateField({
							// 		field: "currentFocusInput",
							// 		value: "nickname",
							// 	})
							// );
						}}
						onBlur={
							() => updateCurrentField("currentFocusInput", "")
							// dispatch(
							// 	updateField({
							// 		field: "currentFocusInput",
							// 		value: "",
							// 	})
							// )
						}
						onChangeText={
							(value) => updateCurrentField("nickname", value)
							// dispatch(
							// 	updateField({
							// 		field: "nickname",
							// 		value,
							// 	})
							// )
						}
					/>
				)}

				<TextInput
					value={initialState?.email}
					placeholder={"Адреса електронної пошти"}
					placeholderTextColor={"#BDBDBD"}
					keyboardType="email-address"
					autoFocus={loginScreen}
					style={[
						styles.input,
						initialState?.currentFocusInput === "email" && styles.inputFocused,
					]}
					onSubmitEditing={hideKB} // press OK key on KB
					onFocus={() => {
						setIsKeyboardShown(true);
						updateCurrentField("currentFocusInput", "email");
						// dispatch(
						// 	updateField({
						// 		field: "currentFocusInput",
						// 		value: "email",
						// 	})
						// );
					}}
					onBlur={
						() => updateCurrentField("currentFocusInput", "")
						// dispatch(
						// 	updateField({
						// 		field: "currentFocusInput",
						// 		value: "",
						// 	})
						// )
					}
					onChangeText={
						(value) => updateCurrentField("email", value)
						// dispatch(
						// 	updateField({
						// 		field: "email",
						// 		value,
						// 	})
						// )
					}
				/>

				<View
					pointerEvents="box-none"
					style={[
						styles.input,
						styles.passwordInputContainer,
						initialState?.currentFocusInput === "password" &&
							styles.inputFocused,
					]}>
					<TextInput
						value={initialState?.password}
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						style={[styles.passwordInput]}
						secureTextEntry={!initialState?.showPassword}
						onSubmitEditing={hideKB}
						onFocus={() => {
							setIsKeyboardShown(true);
							updateCurrentField("currentFocusInput", "password");
							// dispatch(
							// 	updateField({
							// 		field: "currentFocusInput",
							// 		value: "password",
							// 	})
							// );
						}}
						onBlur={
							() => updateCurrentField("currentFocusInput", "")
							// dispatch(
							// 	updateField({
							// 		field: "currentFocusInput",
							// 		value: "",
							// 	})
							// )
						}
						onChangeText={
							(value) => updateCurrentField("password", value)
							// dispatch(
							// 	updateField({
							// 		field: "password",
							// 		value,
							// 	})
							// );
						}
					/>

					<TouchableOpacity
						style={styles.passwordToggleBtn}
						name="showPasswordBtn"
						onPress={() =>
							dispatch(
								toggleField({
									field: "showPassword",
								})
							)
						}>
						<Text style={styles.passwordToggleBtnText}>
							{initialState?.showPassword ? "Приховати" : "Показати"}
						</Text>
					</TouchableOpacity>
				</View>

				{!isKeyboardShown && (
					<>
						<BtnMain
							title={mainBtnText}
							buttonStyle={styles.mainBtn}
							onPress={() => submitForm(initialState.avatar)}
						/>

						<BtnSecond
							title={secondBtnText}
							onPress={() => {
								loginScreen
									? navigation.navigate("Register")
									: navigation.navigate("Login");
							}}
						/>
					</>
				)}
			</View>
		</View>
	);
}
