// TODO: використання глаголиці
// todo: кнопка для повторного фото, якщо перше не сподобалось
// todo: додати кнопки наближення і віддалення на мапі
// todo: Об'єднати логінскрін і регітрскрін
// todo: розширити натискання в TextInput, бо по краю клікаєш і воно зникає.

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
	KeyboardAvoidingView,
	ScrollView,
	FlatList,
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

export default function CreatePostsScreen() {
	const isFocused = useIsFocused();
	const { isKeyboardShown, hideKB } = useKeyboardState();
	const { toggleButtonsEnabled, isTabButtonsEnabled, setCurrentScreen } =
		useButtonState();

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("CreatePostsScreen");
		}
	}, [isFocused, setCurrentScreen]);

	// navigation
	const navigation = useNavigation();

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

	const { userId, nickname } = useSelector((state) => state.auth);
	const initState = useSelector((state) => state.auth);

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

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	// const getCityAndCountry = async (latitude, longitude) => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
	// 		);

	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			// console.log("getCityAndCountry >> data.address:", data.address);
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
			console.log("takePhoto >> cameraRef.current:", cameraRef.current);
			if (permissionCamera && cameraRef.current) {
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

						// const latitude = 50.425038;
						// const longitude = 30.333454;
						// take posision name from google API
						const { city, state, country } = await getCityAndCountry(
							latitude,
							longitude
						);

						// newLocation.coords.latitude = latitude;
						// newLocation.coords.longitude = longitude;
						newLocation.coords.city = city;
						newLocation.coords.state = state;
						newLocation.coords.country = country;

						setCapturedLocation(newLocation);
						setIsBtnSendEnabled(true); // unlock SEND-btn
					}
				}
			}
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
			postsCount: 0,
			likesCount: 0,
			usersLikedPost: [],
			manualPhotoPlace: photoPlace,
		});
	};

	// todo Зробити перевірку на наявність поля manualPhotoPlace коли рендеряться дані з mapPin на PostScreen і ProfileScreen

	const sendPhoto = async () => {
		if (capturedPhoto) {
			setIsBtnSendEnabled(false); // lock SEND-btn
			setIsRestBtnsSendEnabled(false); // lock other btns on this screen
			await toggleButtonsEnabled(false); // lock tab-btns
			setPhotoName("");
			await uploadPostToServer();
			setCapturedPhoto(null);
			navigation.navigate("PostsScreen");
			await toggleButtonsEnabled(true); // unlock tab-btns
			setIsRestBtnsSendEnabled(true); // unlock other btns on this screen
		}
	};

	const deletePhoto = () => {
		setCapturedPhoto(null);
		setIsBtnSendEnabled(false);
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			{/* <View style={styles.container}> */}

			<View style={styles.container}>
				{/* <ScrollView
						contentContainerStyle={
							{
								// flex: 1,
								// justifyContent: "space-between",
							}
						}> */}
				{/* Camera field */}
				<View style={styles.cameraFieldContainer}>
					{permissionCamera === null ? (
						<Text>Очікую доступу до камери...</Text>
					) : !permissionCamera ? (
						<Text>Немає доступу до камери. Надайте доступ у налаштуваннях</Text>
					) : // isFocused &&
					!isTabButtonsEnabled ? (
						<View style={styles.sendingMessageContainer}>
							<Text style={styles.sendingMessage}>
								Sending data to the server.{"\n"}Please wait.
							</Text>
						</View>
					) : (
						<View style={styles.cameraContainer}>
							<Camera style={styles.camera} ref={cameraRef} type={type}>
								{/* {capturedPhoto ? ( */}
								<>
									{/* {capturedPhoto && !isBtnSendEnabled && (
											<Text style={styles.sendingMessage}>
												Saving data to the phone.{"\n"}Please wait
											</Text>
										)} */}

									{capturedPhoto && (
										<Image
											style={styles.photoImg}
											source={{ uri: capturedPhoto }}
										/>
									)}
								</>
								{/* ) : null} */}
							</Camera>
						</View>
					)}

					<TouchableOpacity
						style={[
							styles.takePhotoIcon,
							!isRestBtnsSendEnabled && styles.disabled,
						]}
						onPress={takePhoto}
						disabled={!isRestBtnsSendEnabled}>
						<CreatePhotoBtn permissionCamera={permissionCamera} />
						{/* <Text
							style={[styles.buttonText, !isRestBtnsSendEnabled && styles.disabled]}>
							SNAP
						</Text> */}
					</TouchableOpacity>
				</View>
				{/* /Camera field */}

				<Text style={styles.cameraFieldTitle}>Завантажте фото</Text>

				{/* <KeyboardAvoidingView
					style={styles.kbAvoidingContainer}
					behavior={Platform.OS === "ios" ? "padding" : null}> */}
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
				{/* </KeyboardAvoidingView> */}

				{/* <View style={styles.buttonContainer}> */}
				{/* <TouchableOpacity
						style={[styles.button, !isRestBtnsSendEnabled && styles.disabled]}
						onPress={toggleCameraType}
						disabled={!isRestBtnsSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							Flip Camera
						</Text>
					</TouchableOpacity> */}
				{/* </ScrollView> */}

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
