import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { useButtonState } from "../../utils/tabBtnsContext";

export function TabBtnProfileOnProfileScreen({ color, size }) {
	const navigation = useNavigation();
	const handleTabBtnPress = () => {
		console.log(
			'TabBtnProfileOnProfileScreen >> navigation.navigate TO ("ProfileScreen")'
		);
		navigation.navigate("ProfileScreen");
	};

	const { isTabButtonsEnabled } = useButtonState();

	return (
		<TouchableOpacity
			onPress={handleTabBtnPress}
			style={styles.activeBtn}
			disabled>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width="70"
				height="40"
				viewBox="0 0 70 40"
				fill="none">
				<G clip-path="url(#clip0_43_325)">
					<Rect
						width="70"
						height="40"
						rx="20"
						fill={isTabButtonsEnabled ? "#FF6C00" : "#BDBDBD"}
					/>

					<G transform="translate(23, 10)">
						<Path
							d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
							stroke="white"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>

						<Path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
							stroke="white"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</G>
				</G>
				<Defs>
					<ClipPath id="clip0_43_325">
						<Rect width="70" height="40" fill="white" />
					</ClipPath>
				</Defs>
			</Svg>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	activeBtn: {
		width: 70,
		height: 40,
	},
});
