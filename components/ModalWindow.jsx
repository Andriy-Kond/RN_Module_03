// Модальне вікно з повідомленням
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { useModalContext } from "../utils/modalWindowContext";
import { View, Text, TouchableOpacity } from "react-native";

export function ModalWindow() {
	const { modalMessage, hideMOdalMessagePopup } = useModalContext();

	return (
		<Modal
			isVisible={modalMessage ? true : false}
			onBackdropPress={hideMOdalMessagePopup}>
			<View style={styles.modalContent}>
				<Text style={styles.modalText}>{modalMessage}</Text>
				<TouchableOpacity
					onPress={hideMOdalMessagePopup}
					style={styles.modalButton}>
					<Text style={styles.modalButtonText}>OK</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	// Modal styles
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 8,
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	modalButton: {
		alignSelf: "flex-end",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 4,
		backgroundColor: "#007BFF",
	},
	modalButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});