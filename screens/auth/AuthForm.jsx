import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import { styles } from "./LoginScreenStyles";

import { authSingInUser } from "../../redux/auth/authOperations";
import { useKeyboardState } from "../../utils/keyboardContext";
import { useInitStateContext } from "../../utils/initStateContext";

import { BtnMain } from "../../components/btns/BtnMain";
import { BtnSecond } from "../../components/btns/BtnSecond";

export function AuthForm({
	mainBtnText,
	secondBtnText,
	// initialState,
	submitForm,
}) {
	const { initialState, initStateDispatch } = useInitStateContext();

	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	// const dispatch = useDispatch();
	const navigation = useNavigation();
	// const [state, setState] = useState(initialState);

	// const submitForm = () => {
	// 	hideKB();
	// 	dispatch(authSingInUser(state));
	// 	setState(initialState);
	// };

	return (
		<View style={[styles.form, isKeyboardShown && { paddingBottom: 32 }]}>
			<Text style={styles.formTitle}>Увійти</Text>

			<View
				style={{
					...styles.inputsWrapper,
				}}>
				<TextInput
					autoFocus
					value={state.email}
					placeholder={"Адреса електронної пошти"}
					placeholderTextColor={"#BDBDBD"}
					keyboardType="email-address"
					style={[
						styles.input,
						state.currentFocusInput === "email" && styles.inputFocused,
					]}
					onSubmitEditing={hideKB} // press OK key on KB
					onFocus={() => {
						setIsKeyboardShown(true);
						setState((prevState) => ({
							...prevState,
							currentFocusInput: "email",
						}));
					}}
					onBlur={() =>
						setState((prevState) => ({
							...prevState,
							currentFocusInput: "",
						}))
					}
					onChangeText={(value) =>
						setState((prevState) => ({ ...prevState, email: value }))
					}
				/>

				<View
					style={[
						styles.input,
						styles.passwordInputContainer,
						state.currentFocusInput === "password" && styles.inputFocused,
					]}>
					<TextInput
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						value={state.password}
						style={styles.passwordInput}
						secureTextEntry={!state.showPassword}
						onSubmitEditing={hideKB}
						onFocus={() => {
							setIsKeyboardShown(true);
							setState((prevState) => ({
								...prevState,
								currentFocusInput: "password",
							}));
						}}
						onBlur={() =>
							setState((prevState) => ({
								...prevState,
								currentFocusInput: "",
							}))
						}
						onChangeText={(value) => {
							setState((prevState) => {
								return { ...prevState, password: value };
							});
						}}
					/>
					<TouchableOpacity
						name="passwordBtn"
						onPress={() =>
							setState((prevState) => ({
								...prevState,
								showPassword: !prevState.showPassword,
							}))
						}>
						<Text style={styles.passwordToggleText}>
							{state.showPassword ? "Приховати" : "Показати"}
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
								navigation.navigate("Register");
							}}
						/>
					</>
				)}
			</View>
		</View>
	);
}
