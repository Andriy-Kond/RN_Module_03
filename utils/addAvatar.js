// import * as ImagePicker from "expo-image-picker";
// import { useDispatch } from "react-redux";

// // set avatar to initial state
// export async function addAvatar() {
// 	const dispatch = useDispatch();

// 	const result = await ImagePicker.launchImageLibraryAsync({
// 		mediaTypes: ImagePicker.MediaTypeOptions.All,
// 		allowsEditing: true,
// 		aspect: [3, 3],
// 		quality: 1,
// 	});

// 	if (!result.canceled) {
// 		await dispatch(updateField({ phoneAvatar: result.assets[0].uri }));
// 		// await updateCurrentField("phoneAvatar", result.assets[0].uri);
// 	}
// }
