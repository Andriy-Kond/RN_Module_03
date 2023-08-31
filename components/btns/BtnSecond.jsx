import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function BtnSecond({ title, onPress, buttonStyle }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, buttonStyle]}
			activeOpacity={0.4}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {},
	buttonText: {
		color: "#1B4371",
		textAlign: "center",
		fontFamily: "RobotoNormal400",
		fontSize: 16,
	},
});
