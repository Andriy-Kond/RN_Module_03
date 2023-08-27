import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useButtonState } from "../../utils/tabBtnsContext";

export default function MapScreen() {
	const { previousScreen, setPreviousScreen } = useButtonState();

	// const {
	// 	params: {
	// 		location: { latitude, longitude },
	// 		originScreen,
	// 	},
	// } = useRoute();
	const route = useRoute();
	// const isFocused = useIsFocused();
	// useEffect(() => {
	// 	if (isFocused) {
	// 		// console.log("MapScreen >> route.name:", route.name);
	// 		// console.log("MapScreen >> route.params:", route.params.originScreen);
	// 	}
	// }, [isFocused]);
	const {
		location: { latitude, longitude },
		originScreen,
	} = route.params;

	console.log("MapScreen >> originScreen:", originScreen);
	setPreviousScreen(originScreen);

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
