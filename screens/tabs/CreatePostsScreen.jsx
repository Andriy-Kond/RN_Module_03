// TODO: використання глаголиці
// todo: кнопка для повторного фото, якщо перше не сподобалось
// todo: додати кнопки наближення і віддалення на мапі
// todo: Об'єднати логінскрін і регітрскрін
// todo: розширити натискання в TextInput, бо по краю клікаєш і воно зникає.

import {
	useNavigation,
	useIsFocused,
	useRoute,
} from "@react-navigation/native";
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

export default function CreatePostsScreen() {
	// const route = useRoute();
	const isFocused = useIsFocused();
	const { hideKB } = useKeyboardState();
	const { toggleButtonsEnabled, isTabButtonsEnabled, setCurrentScreen } =
		useButtonState();
	// isFocused && setCurrentScreen("CreatePostsScreen");

	useEffect(() => {
		if (isFocused) {
			// navigation.setParams({ activeScreen: "CreatePostsScreen" });
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

	const [imageTitle, setImageTitle] = useState("");
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

	const takePhoto = async () => {
		try {
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
						setCapturedLocation(newLocation);
						setIsBtnSendEnabled(true); // unlock SEND-btn
					}
				}
			}
		} catch (error) {
			console.error("Error taking photo:", error);
		}
	};

	const sendPhoto = async () => {
		if (capturedPhoto) {
			setIsBtnSendEnabled(false); // lock SEND-btn
			setIsRestBtnsSendEnabled(false); // lock other btns on this screen
			await toggleButtonsEnabled(false); // lock tab-btns
			setImageTitle("");
			await uploadPostToServer();
			setCapturedPhoto(null);
			navigation.navigate("PostsScreen");
			await toggleButtonsEnabled(true); // unlock tab-btns
			setIsRestBtnsSendEnabled(true); // unlock other btns on this screen
		}
	};

	const uploadPostToServer = async () => {
		const photo = await uploadPhotoToServer(capturedPhoto);
		// send to db
		if (capturedLocation) {
			await addDoc(collection(dbFirestore, "dcim"), {
				photo,
				imageTitle,
				location: capturedLocation.coords,
				userId,
				nickname,
			});
		}
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				{permissionCamera === null ? (
					<Text>Очікую доступу до камери...</Text>
				) : !permissionCamera ? (
					<Text>Немає доступу до камери. Надайте доступ у налаштуваннях</Text>
				) : (
					isFocused &&
					(!isTabButtonsEnabled ? (
						<View style={styles.sendingMessageContainer}>
							<Text style={styles.sendingMessage}>
								Sending data to the server.{"\n"}Please wait.
							</Text>
						</View>
					) : (
						<Camera ref={cameraRef} style={styles.camera} type={type}>
							{capturedPhoto && (
								<View style={styles.photoImgContainer}>
									{!isBtnSendEnabled ? (
										<Text style={styles.sendingMessage}>
											Saving data to the phone.{"\n"}Please wait
										</Text>
									) : (
										<Image
											source={{ uri: capturedPhoto }}
											style={styles.photoImg}
										/>
									)}
								</View>
							)}
						</Camera>
					))
				)}

				<View style={styles.imageTitleContainer}>
					<TextInput
						style={styles.imageTitle}
						value={imageTitle}
						onChangeText={(value) => {
							setImageTitle(value);
						}}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, !isRestBtnsSendEnabled && styles.disabled]}
						onPress={toggleCameraType}
						disabled={!isRestBtnsSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							Flip Camera
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, !isRestBtnsSendEnabled && styles.disabled]}
						onPress={takePhoto}
						disabled={!isRestBtnsSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							SNAP
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, !isBtnSendEnabled && styles.disabled]}
						onPress={sendPhoto}
						disabled={!isBtnSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							SEND PHOTO
						</Text>
					</TouchableOpacity>
				</View>
				{initState.authErrorMessage && (
					<ModalWindow modalMessage={authErrorMessage} />
				)}
				{/* <ModalWindow /> */}
			</View>
		</TouchableWithoutFeedback>
	);
}
