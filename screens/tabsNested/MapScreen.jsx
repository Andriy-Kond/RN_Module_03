import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useButtonState } from "../../utils/tabBtnsContext";

import { authSlice } from "../../redux/auth/authReducer";
import { useDispatch } from "react-redux";
import { useNavScreen } from "../../utils/navContext";

export default function MapScreen() {
	const route = useRoute();
	const {
		location: { latitude, longitude },
		originScreen,
	} = route.params;
	// const {
	// 	params: {
	// 		location: { latitude, longitude },
	// 		originScreen,
	// 	},
	// } = useRoute();

	const dispatch = useDispatch();
	const { updateField } = authSlice.actions;
	const { setCurrentScreen } = useNavScreen();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("MapScreen");
		}
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				}}>
				<Marker
					coordinate={{ latitude, longitude }}
					title="MapScreen"
					// image={{ uri: "custom_pin" }}
				/>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	map: {
		flex: 1,
	},
});
