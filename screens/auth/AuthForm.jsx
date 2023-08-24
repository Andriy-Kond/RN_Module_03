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
	const initState = useSelector((state) => state.auth);

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
		} else {
			await updateCurrentField(
				"authErrorMessage",
				"Доступ до сховища не наданий"
			);
		}
	}

	return (
		<View
			style={[
				styles.form,
				loginScreen ? { paddingBottom: 132 } : { paddingBottom: 66 },
				isKeyboardShown && { paddingBottom: 16 },
			]}>
			{initState.authErrorMessage && <ModalWindow />}

			{/* ADD AVATAR */}
			{!loginScreen && (
				<View style={styles.regImageContainer}>
					<Image
						style={styles.avatarImg}
						source={initState?.avatar ? { uri: initState.avatar } : regEmptyImg}
					/>
					{/* ADD AVATAR BTN */}
					<TouchableOpacity style={[styles.regAddImgBtn]} onPress={addAvatar}>
						<AddAvatarBtn />
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
						value={initState?.nickname}
						placeholder={"Логін"}
						placeholderTextColor={"#BDBDBD"}
						style={[
							styles.input,
							initState?.currentFocusInput === "nickname" &&
								styles.inputFocused,
						]}
						onSubmitEditing={hideKB} // press OK key on KB
						onFocus={() => {
							setIsKeyboardShown(true);
							updateCurrentField("currentFocusInput", "nickname");
						}}
						onBlur={() => updateCurrentField("currentFocusInput", "")}
						onChangeText={(value) => updateCurrentField("nickname", value)}
					/>
				)}

				<TextInput
					value={initState?.email}
					placeholder={"Адреса електронної пошти"}
					placeholderTextColor={"#BDBDBD"}
					keyboardType="email-address"
					autoFocus={loginScreen}
					style={[
						styles.input,
						initState?.currentFocusInput === "email" && styles.inputFocused,
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
					// pointerEvents="box-none"
					style={[
						styles.input,
						styles.passwordInputContainer,
						initState?.currentFocusInput === "password" && styles.inputFocused,
					]}>
					<TextInput
						value={initState?.password}
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						style={[styles.passwordInput]}
						secureTextEntry={!initState?.showPassword}
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
							{initState?.showPassword ? "Приховати" : "Показати"}
						</Text>
					</TouchableOpacity>
				</View>

				{/* REGISTRATION/LOGIN BTN */}
				{!isKeyboardShown && (
					<>
						<BtnMain
							title={mainBtnText}
							buttonStyle={styles.mainBtn}
							onPress={() => submitForm(initState.avatar)}
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
