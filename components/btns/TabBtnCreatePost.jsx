import { useNavigation } from "@react-navigation/native";

import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { useButtonState } from "../../utils/tabBtnsContext";

export function TabBtnCreatePost() {
	const navigation = useNavigation();
	const handleTabBtnPress = () => {
		navigation.navigate("CreatePostsScreen");
	};

	const { isTabButtonsEnabled } = useButtonState();

	return (
		<TouchableOpacity onPress={handleTabBtnPress} style={styles.activeBtn}>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width="70"
				height="40"
				viewBox="0 0 70 40"
				fill="none">
				<G clip-path="url(#clip0_12_109)">
					<Rect
						width="70"
						height="40"
						rx="20"
						fill={isTabButtonsEnabled ? "#FF6C00" : "#BDBDBD"}
					/>
					<Path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
						fill="white"
					/>
				</G>
				<Defs>
					<ClipPath id="clip0_12_109">
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
