import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function BtnMain({ title, onPress, buttonStyle }) {
	return (
		<TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#FF6C00",
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 100,
	},

	buttonText: {
		textAlign: "center",
		color: "#FFF",
		fontFamily: "RobotoRegular400",
		fontSize: 16,
	},
});
