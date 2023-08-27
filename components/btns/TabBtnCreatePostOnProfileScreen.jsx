import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export function TabBtnCreatePostOnProfileScreen({ focused, color, size }) {
	const navigation = useNavigation();
	const handleTabBtnPress = () => {
		navigation.navigate("CreatePostsScreen");
	};

	return (
		<TouchableOpacity onPress={handleTabBtnPress} style={styles.activeBtn}>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none">
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M20.5 13.5H19.5V19.5H13.5V20.5H19.5V26.5H20.5V20.5H26.5V19.5H20.5V13.5Z"
					fill="#212121"
					fill-opacity="0.8"
				/>
			</Svg>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	activeBtn: {
		width: 40,
		height: 40,
	},
});
