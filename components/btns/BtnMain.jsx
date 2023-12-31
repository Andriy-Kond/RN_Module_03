import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function BtnMain({ title, onPress, buttonStyle }) {
	return (
		<TouchableOpacity
			style={[styles.button, buttonStyle]}
			onPress={onPress}
			activeOpacity={0.7}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 42,
		backgroundColor: "#FF6C00",
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 100,
	},

	buttonText: {
		textAlign: "center",
		color: "#FFF",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
	},
});
