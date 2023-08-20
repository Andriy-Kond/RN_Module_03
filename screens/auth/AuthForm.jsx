import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { styles } from "./AuthFormStyles";

import { useKeyboardState } from "../../utils/keyboardContext";
import { useInitStateContext } from "../../utils/initStateContext";

import { BtnMain } from "../../components/btns/BtnMain";
import { BtnSecond } from "../../components/btns/BtnSecond";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";

export function AuthForm({
	mainBtnText,
	secondBtnText,
	submitForm,
	loginScreen,
}) {
	const { initialState, initStateDispatch } = useInitStateContext();
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const navigation = useNavigation();
	// console.log("initialState?.showPassword:", initialState.showPassword);
	return (
		<View
			style={[
				styles.form,
				loginScreen ? { paddingBottom: 132 } : { paddingBottom: 66 },
				isKeyboardShown && { paddingBottom: 16 },
			]}>
			{!loginScreen && (
				<View style={styles.regImageContainer}>
					<Image style={styles.regEmptyImg} source={regEmptyImg} />

					<TouchableOpacity
						style={[styles.regAddImgBtn]}
						onPress={() => console.log("Button regAddImgBtn pressed")}>
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
							// inputsState.inputs["loginInput"] ? styles.inputFocused : null,
						]}
						onSubmitEditing={hideKB} // press OK key on KB
						onFocus={() => {
							setIsKeyboardShown(true);
							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "currentFocusInput",
								value: "nickname",
							});
						}}
						onBlur={() =>
							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "currentFocusInput",
								value: "",
							})
						}
						onChangeText={(value) =>
							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "nickname",
								value,
							})
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
						initStateDispatch({
							type: "UPDATE_FIELD",
							field: "currentFocusInput",
							value: "email",
						});
					}}
					onBlur={() =>
						initStateDispatch({
							type: "UPDATE_FIELD",
							field: "currentFocusInput",
							value: "",
						})
					}
					onChangeText={(value) =>
						initStateDispatch({
							type: "UPDATE_FIELD",
							field: "email",
							value,
						})
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

							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "currentFocusInput",
								value: "password",
							});
						}}
						onBlur={() =>
							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "currentFocusInput",
								value: "",
							})
						}
						onChangeText={(value) => {
							initStateDispatch({
								type: "UPDATE_FIELD",
								field: "password",
								value,
							});
						}}
					/>

					<TouchableOpacity
						name="passwordBtn"
						onPress={() =>
							initStateDispatch({
								type: "TOGGLE_FIELD",
								field: "showPassword",
							})
						}>
						<Text style={styles.passwordToggleText}>
							{initialState?.showPassword ? "Приховати" : "Показати"}
						</Text>
					</TouchableOpacity>
				</View>

				{!isKeyboardShown && (
					<>
						<BtnMain
							title={mainBtnText}
							buttonStyle={styles.mainBtn}
							onPress={submitForm}
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
