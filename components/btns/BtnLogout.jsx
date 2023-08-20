// import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { authSingOutUser } from "../../redux/auth/authOperations";

export function BtnLogout({ buttonStyle }) {
	// const navigation = useNavigation();
	const dispatch = useDispatch();

	// const handleLogout = () => {
	// 	navigation.navigate("Login");
	// };

	const handleLogout = () => {
		dispatch(authSingOutUser());
	};

	return (
		// Button for logout
		<TouchableOpacity
			onPress={handleLogout}
			style={[styles.button, buttonStyle]}>
			<Svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<Path
					d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
					stroke="#BDBDBD"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M17 16L21 12L17 8"
					stroke="#BDBDBD"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M21 12H9"
					stroke="#BDBDBD"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</Svg>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		// marginLeft: 16,
		// backgroundColor: "#FF6C00",
		// paddingVertical: 16,
		// paddingHorizontal: 32,
		// borderRadius: 100,
	},
});
