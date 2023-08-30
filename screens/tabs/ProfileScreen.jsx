import {
	useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	collection,
	query,
	onSnapshot,
	where,
	doc,
	updateDoc,
	increment,
} from "firebase/firestore";

import { dbFirestore } from "../../firebase/config";

import { useButtonState } from "../../utils/tabBtnsContext";

import { styles } from "./ProfileScreenSttyles";
import { BtnLogout } from "../../components/btns/BtnLogout";
import { CommentBtn } from "../../components/btns/CommentBtn";
import { MapPinBtn } from "../../components/btns/MapPinBtn";
import bgImage from "../../assets/img/bg_photo.jpg";
import { AddAvatarBtn } from "../../components/btns/AddAvatarBtn";
import { authSlice } from "../../redux/auth/authReducer";
import { LikeBtn } from "../../components/btns/LikeBtn";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const { setCurrentScreen } = useButtonState();
	const dispatch = useDispatch();

	const [userPosts, setUserPosts] = useState([]);
	const state = useSelector((state) => state.auth);
	const currentUser = useSelector((store) => store.auth.userId);
	const { updateField } = authSlice.actions;

	// const route = useRoute();
	// const { postId, imageTitle, image } = route.params;

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("ProfileScreen");
		}
	}, [isFocused, setCurrentScreen]);

	useEffect(() => {
		getAllCurrentUserPosts();
	}, []);

	const getAllCurrentUserPosts = async () => {
		const dcimCurrentUserCollection = query(
			collection(dbFirestore, "dcim"),
			where("userId", "==", currentUser)
		);

		onSnapshot(dcimCurrentUserCollection, (snapshot) => {
			const currentUserPosts = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setUserPosts(currentUserPosts);
		});
	};

	// set avatar to initial state
	async function addAvatar() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [3, 3],
			quality: 1,
		});

		if (!result.canceled) {
			dispatch(updateField({ phoneAvatar: result.assets[0].uri }));
			// await updateCurrentField("phoneAvatar", result.assets[0].uri);
		}
	}

	const addLike = async (postId, usersLikedPost, likesCount) => {
		const currentPostRef = doc(dbFirestore, "dcim", postId);

		if (usersLikedPost.includes(currentUser)) {
			// delete user's like
			const updateUsersLikedPost = usersLikedPost.filter(
				(userId) => userId !== currentUser
			);

			await updateDoc(currentPostRef, {
				likesCount: Number(likesCount) - 1,
				usersLikedPost: updateUsersLikedPost,
			});
		} else {
			// add user's like
			const updateUsersLikedPost = [...usersLikedPost, currentUser];
			await updateDoc(currentPostRef, {
				likesCount: increment(1),
				usersLikedPost: updateUsersLikedPost,
			});
		}
	};

	return (
		<View style={styles.container}>
			<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />
			<View style={styles.formContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.regImageContainer}>
						<Image
							style={styles.avatarImg}
							source={
								state?.serverAvatar ? { uri: state.serverAvatar } : regEmptyImg
							}
						/>
						{/* ADD AVATAR BTN */}
						<TouchableOpacity style={[styles.regAddImgBtn]} onPress={addAvatar}>
							<AddAvatarBtn />
						</TouchableOpacity>
					</View>
					<BtnLogout buttonStyle={styles.btnLogout} />
				</View>

				<Text style={styles.userName}>{state.nickname}</Text>

				<FlatList
					data={userPosts}
					keyExtractor={(item, indx) => item.id}
					renderItem={({ item }) => {
						return (
							<View style={styles.imgContainer}>
								<Image
									style={styles.currentImg}
									source={{ uri: item.data.photo }}
								/>
								<Text style={styles.imgTitle}>{item.data.imageTitle}</Text>

								<View style={styles.buttonsWrapper}>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("CommentsScreen", {
												imageTitle: item.data.imageTitle,
												postId: item.id,
												image: item.data.photo,
												originScreen: "ProfileScreen",
											})
										}>
										<View style={styles.commentBtnWrapper}>
											<CommentBtn commentsQty={item.data.postsCount} />
											<Text
												style={[
													styles.btnText,
													{
														color:
															item.data.postsCount === 0
																? "#BDBDBD"
																: "#212121",
													},
												]}>
												{`${item.data.postsCount}`}
											</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() =>
											addLike(
												item.id,
												item.data.usersLikedPost,
												item.data.likesCount
											)
										}>
										<View style={styles.commentBtnWrapper}>
											<LikeBtn commentsQty={item.data.likesCount} />
											<Text
												style={[
													styles.btnText,
													{
														color:
															item.data.likesCount === 0
																? "#BDBDBD"
																: "#212121",
													},
												]}>
												{`${item.data.likesCount}`}
											</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() =>
											navigation.navigate("MapScreen", {
												location: item.data.location,
												originScreen: "ProfileScreen",
											})
										}>
										<View style={styles.commentBtnWrapper}>
											<MapPinBtn />
											<Text style={[styles.btnText, styles.underline]}>
												{`${
													item.data.location.city
														? item.data.location.city
														: item.data.location.state
												}, ${item.data.location.country}`}
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}
