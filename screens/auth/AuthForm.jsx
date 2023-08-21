import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { styles } from "./AuthFormStyles";

import { useKeyboardState } from "../../utils/keyboardContext";

import { BtnMain } from "../../components/btns/BtnMain";
import { BtnSecond } from "../../components/btns/BtnSecond";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";

import { dbFirestore, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useModalContext } from "../../utils/modalWindowContext";
import { uriToBlob } from "../../utils/uriToBlob";
import { useDispatch, useSelector } from "react-redux";
import { initStateReducer } from "../../redux/auth/authOperations";

import { ModalWindow } from "../../components/ModalWindow";

// import { toggleField, updateField } from "../../redux/auth/authReducer";
import { authSlice } from "../../redux/auth/authReducer";

export function AuthForm({
	mainBtnText,
	secondBtnText,
	submitForm,
	loginScreen,
}) {
	const { toggleField, updateField } = authSlice.actions;
	const navigation = useNavigation();

	const initialState = useSelector((state) => state.auth);
	console.log("initialState:", initialState);
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const { showModalMessagePopup } = useModalContext();
	const [urlAvatar, setUrlAvatar] = useState(null);
	const dispatch = useDispatch();

	async function addAvatar() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [3, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setUrlAvatar(result.assets[0].uri);
		} else {
			showModalMessagePopup("Доступ до сховища не наданий");
		}
	}

	const updateCurrentField = (fieldName, value) => {
		dispatch(
			updateField({
				field: fieldName,
				value,
			})
		);
	};

	return (
		<View
			style={[
				styles.form,
				loginScreen ? { paddingBottom: 132 } : { paddingBottom: 66 },
				isKeyboardShown && { paddingBottom: 16 },
			]}>
			{!loginScreen && (
				<View style={styles.regImageContainer}>
					<Image
						style={styles.avatarImg}
						source={urlAvatar ? { uri: urlAvatar } : regEmptyImg}
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

			<View
				style={{
					...styles.inputsWrapper,
				}}>
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
							dispatch(
								updateField({
									field: "currentFocusInput",
									value: "nickname",
								})
							);
						}}
						onBlur={() =>
							dispatch(
								updateField({
									field: "currentFocusInput",
									value: "",
								})
							)
						}
						onChangeText={(value) =>
							dispatch(
								updateField({
									field: "nickname",
									value,
								})
							)
						}
					/>
				)}

				<TextInput
					autoFocus={loginScreen}
					value={initialState?.email}
					placeholder={"Адреса електронної пошти"}
					placeholderTextColor={"#BDBDBD"}
					keyboardType="email-address"
					style={[
						styles.input,
						initialState?.currentFocusInput === "email" && styles.inputFocused,
					]}
					onSubmitEditing={hideKB} // press OK key on KB
					onFocus={() => {
						setIsKeyboardShown(true);
						dispatch(
							updateField({
								field: "currentFocusInput",
								value: "email",
							})
						);
					}}
					onBlur={() =>
						dispatch(
							updateField({
								field: "currentFocusInput",
								value: "",
							})
						)
					}
					onChangeText={(value) =>
						dispatch(
							updateField({
								field: "email",
								value,
							})
						)
					}
				/>

				<View
					style={[
						styles.input,
						styles.passwordInputContainer,
						initialState?.currentFocusInput === "password" &&
							styles.inputFocused,
					]}>
					<TextInput
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						value={initialState?.password}
						style={styles.passwordInput}
						secureTextEntry={!initialState?.showPassword}
						onSubmitEditing={hideKB}
						onFocus={() => {
							setIsKeyboardShown(true);

							dispatch(
								updateField({
									field: "currentFocusInput",
									value: "password",
								})
							);
						}}
						onBlur={() =>
							dispatch(
								updateField({
									field: "currentFocusInput",
									value: "",
								})
							)
						}
						onChangeText={(value) => {
							dispatch(
								updateField({
									field: "password",
									value,
								})
							);
						}}
					/>

					<TouchableOpacity
						name="passwordBtn"
						onPress={() =>
							dispatch(
								toggleField({
									field: "showPassword",
								})
							)
						}>
						<Text style={styles.passwordToggleText}>
							{initialState?.showPassword ? "Приховати" : "Показати"}
						</Text>
					</TouchableOpacity>
					<ModalWindow />
				</View>

				{!isKeyboardShown && (
					<>
						<BtnMain
							title={mainBtnText}
							buttonStyle={styles.mainBtn}
							onPress={() => submitForm(urlAvatar)}
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
