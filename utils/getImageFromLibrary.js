import * as ImagePicker from "expo-image-picker";

export async function getImageFromLibrary() {
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [3, 3],
		quality: 1,
	});

	return result;
}
