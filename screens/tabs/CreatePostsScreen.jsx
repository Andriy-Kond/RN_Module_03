import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	TouchableWithoutFeedback,
} from "react-native";

import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";

import { collection, addDoc } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

import { useButtonState } from "../../utils/tabBtnsContext";
import { useKeyboardState } from "../../utils/keyboardContext";

import { ModalWindow } from "../../components/ModalWindow";
import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";
import { styles } from "./CreatePostsScreenStyles";
import { CreatePhotoBtn } from "../../components/btns/CreatePhotoBtn";
import { MapPinBtn } from "../../components/btns/MapPinBtn";
import { DeleteBtn } from "../../components/btns/DeleteBtn";
import { getCityAndCountry } from "../../utils/getCityAndCountry";
import { useNavScreen } from "../../utils/navContext";

export default function CreatePostsScreen() {
	// navigation
	const navigation = useNavigation();

	const isFocused = useIsFocused();
	const { isKeyboardShown, hideKB } = useKeyboardState();
	const { toggleButtonsEnabled, isTabButtonsEnabled } = useButtonState();
	const { setCurrentScreen } = useNavScreen();

	const { userId, nickname } = useSelector((state) => state.auth);
	const initState = useSelector((state) => state.auth);

	// reference on camera in DOM
	const cameraRef = useRef(null);
	const [type, setType] = useState(CameraType.back);

	// permissions
	const [permissionLocation, setPermissionLocation] = useState(null);
	const [permissionMediaLibrary, setPermissionMediaLibrary] = useState(null);
	const [permissionCamera, setPermissionCamera] = useState(null);

	// local btns
	const [isBtnSendEnabled, setIsBtnSendEnabled] = useState(false);
	const [isRestBtnsSendEnabled, setIsRestBtnsSendEnabled] = useState(true);

	// captured photo, location
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo link
	const [capturedLocation, setCapturedLocation] = useState(null);

	const [photoName, setPhotoName] = useState("");
	const [photoPlace, setPhotoPlace] = useState("");

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("CreatePostsScreen");
		}
	}, [isFocused]);

	// request accesses to camera, location and mediaLibrary
	useEffect(() => {
		(async () => {
			const camera = await Camera.requestCameraPermissionsAsync();
			setPermissionCamera(camera.status === "granted");

			const location = await Location.requestForegroundPermissionsAsync();
			setPermissionLocation(location.status === "granted");

			const mediaLibrary = await MediaLibrary.requestPermissionsAsync();
			setPermissionMediaLibrary(mediaLibrary.status === "granted");
		})();
	}, [permissionCamera, permissionLocation, permissionMediaLibrary]);

	// const getCityAndCountry = async (latitude, longitude) => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
	// 		);

	// 		if (response.ok) {
	// 			const data = await response.json();

	// 			const city =
	// 				data.address.city || data.address.town || data.address.village;
	// 			const state = data.address.state;
	// 			const country = data.address.country;

	// 			return { city, state, country };
	// 		} else {
	// 			throw new Error("Error fetching data");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 		return null;
	// 	}
	// };

	const takePhoto = async () => {
		try {
			// if (permissionCamera && cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();

			// Обробка фото
			if (photo && photo.uri) {
				setCapturedPhoto(photo.uri);

				if (permissionMediaLibrary) {
					await MediaLibrary.createAssetAsync(photo.uri);
				} else {
					dispatch(
						updateField({
							authErrorMessage:
								"Немає доступу до сховища телефону, тому не можу записати ваше фото в його пам'ять. Надайте доступ до сховища в налаштуваннях доступу цього застосунку",
						})
					);
				}

				if (permissionLocation) {
					const newLocation = await Location.getCurrentPositionAsync();
					const { latitude, longitude } = newLocation?.coords;

					const { city, state, country } = await getCityAndCountry(
						latitude,
						longitude
					);

					newLocation.coords.city = city;
					newLocation.coords.state = state;
					newLocation.coords.country = country;

					setCapturedLocation(newLocation);
					setIsBtnSendEnabled(true); // unlock SEND-btn

					setPhotoPlace(`${city ? city : state}, ${country}`);
				}
			}
			// }
		} catch (error) {
			console.error("Error taking photo:", error);
		}
	};

	const uploadPostToServer = async () => {
		const photo = await uploadPhotoToServer(capturedPhoto);

		// send to db
		await addDoc(collection(dbFirestore, "dcim"), {
			photo,
			imageTitle: photoName,
			location: capturedLocation?.coords,
			userId,
			nickname,
			commentsCount: 0,
			likesCount: 0,
			usersLikedPost: [],
			manualPhotoPlace: photoPlace,
			createDate: Date.now(),
		});
	};

	const sendPhoto = async () => {
		if (capturedPhoto) {
			setIsBtnSendEnabled(false); // lock SEND-btn
			setIsRestBtnsSendEnabled(false); // lock other btns on this screen
			await toggleButtonsEnabled(false); // lock tab-btns
			setPhotoName("");
			await uploadPostToServer();
			setCapturedPhoto(null);
			navigation.navigate("Home", { screen: "PostsScreen" });
			await toggleButtonsEnabled(true); // unlock tab-btns
			setIsRestBtnsSendEnabled(true); // unlock other btns on this screen
			setPhotoPlace("");
		}
	};

	const deletePhoto = () => {
		setCapturedPhoto(null);
		setIsBtnSendEnabled(false);
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<View style={styles.cameraFieldContainer}>
					{permissionCamera === null ? (
						<Text>Очікую доступу до камери...</Text>
					) : !permissionCamera ? (
						<Text>Немає доступу до камери. Надайте доступ у налаштуваннях</Text>
					) : !isTabButtonsEnabled ? (
						<View style={styles.sendingMessageContainer}>
							<Text style={styles.sendingMessage}>
								Sending data to the server.{"\n"}Please wait.
							</Text>
						</View>
					) : (
						<View style={styles.cameraContainer}>
							<>
								{capturedPhoto ? (
									<Image
										style={styles.photoImg}
										source={{ uri: capturedPhoto }}
									/>
								) : (
									<Camera style={styles.camera} ref={cameraRef} type={type} />
								)}
							</>
						</View>
					)}

					<TouchableOpacity
						style={[styles.takePhotoIcon]}
						onPress={takePhoto}
						disabled={!isRestBtnsSendEnabled || isBtnSendEnabled}>
						<CreatePhotoBtn permissionCamera={permissionCamera} />
					</TouchableOpacity>
				</View>

				<Text style={styles.cameraFieldTitle}>Завантажте фото</Text>

				<TextInput
					placeholder="Назва..."
					placeholderTextColor={"#BDBDBD"}
					style={styles.photoText}
					value={photoName}
					onChangeText={(value) => {
						setPhotoName(value);
					}}
				/>

				<View style={[styles.photoPlaceWrapper]}>
					<MapPinBtn buttonStyle={styles.mapPin} />
					<TextInput
						placeholder="Місцевість..."
						placeholderTextColor={"#BDBDBD"}
						style={styles.photoTextInput}
						value={photoPlace}
						onChangeText={(value) => {
							setPhotoPlace(value);
						}}
					/>
				</View>

				{!isKeyboardShown && (
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							style={[styles.button, !isBtnSendEnabled && styles.disabled]}
							onPress={sendPhoto}
							disabled={!isBtnSendEnabled}>
							<Text
								style={[
									styles.buttonText,
									!isBtnSendEnabled && styles.disabled,
								]}>
								Опублікувати
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[
								styles.deleteButton,
								!isBtnSendEnabled && styles.disabled,
							]}
							onPress={deletePhoto}
							disabled={!isBtnSendEnabled}>
							<DeleteBtn active={isBtnSendEnabled} />
						</TouchableOpacity>
					</View>
				)}
				{initState.authErrorMessage && (
					<ModalWindow modalMessage={authErrorMessage} />
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}
