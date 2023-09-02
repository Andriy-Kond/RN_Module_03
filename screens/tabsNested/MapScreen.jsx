import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useNavScreen } from "../../utils/navContext";

import { styles } from "./MapScreenStyles";

export default function MapScreen() {
	const route = useRoute();
	console.log("MapScreen >> route.params:", route.params);
	const {
		location: { latitude, longitude },
	} = route.params;

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
				<Marker coordinate={{ latitude, longitude }} title="MapScreen" />
			</MapView>
		</View>
	);
}
