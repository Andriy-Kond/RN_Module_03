import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot, where } from "firebase/firestore";

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
import { addLike } from "../../utils/addLike";

import { getImageFromLibrary } from "../../utils/getImageFromLibrary";

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
		const result = await getImageFromLibrary();

		if (!result.canceled) {
			dispatch(updateField({ serverAvatar: result.assets[0].uri }));
		}
	}

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
						<TouchableOpacity
							style={styles.regAddImgBtnWrapper}
							onPress={addAvatar}>
							<AddAvatarBtn
								isAvatar={state.serverAvatar}
								buttonStyles={styles.regAddImgBtn}
							/>
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
									<View style={styles.commentLikeWrapper}>
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("CommentsScreen", {
													imageTitle: item.data.imageTitle,
													postId: item.id,
													image: item.data.photo,
													originScreen: "ProfileScreen",
												})
											}>
											<View style={styles.btnWrapper}>
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
													item.data.likesCount,
													currentUser
												)
											}>
											<View style={[styles.btnWrapper, styles.btnMarginLeft]}>
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
									</View>

									<TouchableOpacity
										onPress={() =>
											navigation.navigate("MapScreen", {
												location: item.data.location,
												originScreen: "ProfileScreen",
											})
										}>
										<View style={[styles.btnWrapper, styles.btnMarginLeft]}>
											<MapPinBtn />
											<Text style={[styles.btnText, styles.underline]}>
												{item.data.manualPhotoPlace
													? item.data.manualPhotoPlace
													: `${
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
