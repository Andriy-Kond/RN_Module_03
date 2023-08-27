import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
	const {
		params: {
			location: { latitude, longitude },
			originScreen,
		},
	} = useRoute();
	const route = useRoute();

	const [navOriginScreen, setNavOriginScreen] = useState(
		route.params?.originScreen
	);

	useEffect(() => {
		return () => {
			setNavOriginScreen(""); // Очищення під час розмонтовування компонента
		};
	}, []);

	return (
		<View style={styles.container}>
			{/* <Text>It is MapScreen</Text> */}
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
