import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import { authSlice } from "../../redux/auth/authReducer";
import { useKeyboardState } from "../../utils/keyboardContext";

import { ModalWindow } from "../../components/ModalWindow";
import { BtnSecond } from "../../components/btns/BtnSecond";
import { BtnMain } from "../../components/btns/BtnMain";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { AddAvatarBtn } from "../../components/btns/AddAvatarBtn";

import { styles } from "./AuthFormStyles";
import { getImageFromLibrary } from "../../utils/getImageFromLibrary";

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
	const state = useSelector((state) => state.auth);

	async function updateCurrentField(field, value) {
		dispatch(updateField({ [field]: value }));
	}

	// set avatar to initial state
	async function addAvatar() {
		const result = await getImageFromLibrary();

		if (!result.canceled) {
			await updateCurrentField("serverAvatar", result.assets[0].uri);
		}
	}

	return (
		<View
			style={[
				styles.form,
				loginScreen ? { paddingBottom: 132 } : { paddingBottom: 66 },
				isKeyboardShown && { paddingBottom: 16 },
			]}>
			{state.authErrorMessage && <ModalWindow />}

			{/* ADD AVATAR */}
			{!loginScreen && (
				<View style={styles.regImageContainer}>
					<Image
						style={styles.avatarImg}
						source={
							state?.serverAvatar ? { uri: state.serverAvatar } : regEmptyImg
						}
					/>
					{/* ADD AVATAR BTN */}
					<TouchableOpacity
						style={styles.regAddImgBtnWrapper}
						onPress={addAvatar}>
						<AddAvatarBtn
							isAvatar={state.serverAvatar}
							buttonStyles={styles.regAddImgBtn}
						/>
					</TouchableOpacity>
				</View>
			)}

			{/* FORM TITLE */}
			<Text
				style={[
					styles.formTitle,
					loginScreen ? { marginTop: 32 } : { marginTop: 92 },
				]}>
				{loginScreen ? "Увійти" : "Реєстрація"}
			</Text>

			{/* INPUT FIELDS */}
			<View style={styles.inputsWrapper}>
				{!loginScreen && (
					<TextInput
						autoFocus
						value={state?.nickname}
						placeholder={"Логін"}
						placeholderTextColor={"#BDBDBD"}
						style={[
							styles.input,
							state?.currentFocusInput === "nickname" && styles.inputFocused,
						]}
						onSubmitEditing={hideKB} // press "OK" on KB
						onFocus={() => {
							setIsKeyboardShown(true);
							updateCurrentField("currentFocusInput", "nickname");
						}}
						onBlur={() => updateCurrentField("currentFocusInput", "")}
						onChangeText={(value) => updateCurrentField("nickname", value)}
					/>
				)}

				<TextInput
					value={state?.email}
					placeholder={"Адреса електронної пошти"}
					placeholderTextColor={"#BDBDBD"}
					keyboardType="email-address"
					autoFocus={loginScreen}
					style={[
						styles.input,
						state?.currentFocusInput === "email" && styles.inputFocused,
					]}
					onSubmitEditing={hideKB}
					onFocus={() => {
						setIsKeyboardShown(true);
						updateCurrentField("currentFocusInput", "email");
					}}
					onBlur={() => updateCurrentField("currentFocusInput", "")}
					onChangeText={(value) => updateCurrentField("email", value)}
				/>

				<View
					style={[
						styles.input,
						styles.passwordInputContainer,
						state?.currentFocusInput === "password" && styles.inputFocused,
					]}>
					<TextInput
						value={state?.password}
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						style={[styles.passwordInput]}
						secureTextEntry={!state?.showPassword}
						onSubmitEditing={hideKB}
						onFocus={() => {
							setIsKeyboardShown(true);
							updateCurrentField("currentFocusInput", "password");
						}}
						onBlur={() => updateCurrentField("currentFocusInput", "")}
						onChangeText={(value) => updateCurrentField("password", value)}
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
							{state?.showPassword ? "Приховати" : "Показати"}
						</Text>
					</TouchableOpacity>
				</View>

				{/* REGISTRATION/LOGIN BTN */}
				{!isKeyboardShown && (
					<>
						<BtnMain
							title={mainBtnText}
							buttonStyle={styles.mainBtn}
							onPress={() => submitForm()}
						/>

						<BtnSecond
							title={secondBtnText}
							onPress={() => {
								loginScreen
									? navigation.navigate("RegisterScreen")
									: navigation.navigate("LoginScreen");
							}}
						/>
					</>
				)}
			</View>
		</View>
	);
}
