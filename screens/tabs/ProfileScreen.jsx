import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot, where } from "firebase/firestore";

import { dbFirestore } from "../../firebase/config";

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
import { isUserLikedPost } from "../../utils/isUserLikedPost";
import { compareDates } from "../../utils/compareDates";
import { useNavScreen } from "../../utils/navContext";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const { setCurrentScreen } = useNavScreen();
	const dispatch = useDispatch();

	const [userPosts, setUserPosts] = useState([]);
	const state = useSelector((state) => state.auth);
	const currentUser = useSelector((store) => store.auth.userId);
	const { updateField } = authSlice.actions;

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("ProfileScreen");
		}
	}, [isFocused]);

	useEffect(() => {
		getAllCurrentUserPosts(currentUser);
	}, [currentUser]);

	const getAllCurrentUserPosts = async (currentUser) => {
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
					data={userPosts?.sort(compareDates)}
					keyExtractor={(item, indx) => item.id}
					renderItem={({ item }) => {
						const isUserLikedCurrentPost = isUserLikedPost(
							item.data.usersLikedPost,
							currentUser
						);

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
													// originScreen: "ProfileScreen",
												})
											}>
											<View style={styles.btnWrapper}>
												<CommentBtn commentsQty={item.data.commentsCount} />
												<Text
													style={[
														styles.btnText,
														{
															color:
																item.data.commentsCount === 0
																	? "#BDBDBD"
																	: "#212121",
														},
													]}>
													{`${item.data.commentsCount}`}
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
											<View style={[styles.btnWrapper, styles.btnMargin]}>
												<LikeBtn
													likesQty={item.data.likesCount}
													isUserLikedCurrentPost={isUserLikedCurrentPost}
												/>
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

									<View style={styles.mapWrapper}>
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("MapScreen", {
													location: item.data.location,
													// originScreen: "ProfileScreen",
												})
											}>
											{/* Two <View> for push mapLinkWrapper in end of father (mapLinkWrapper -> justifyContent: "flex-end") */}
											<View style={[styles.mapLinkWrapper]}>
												<View>
													<MapPinBtn />
												</View>
												<View>
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
											</View>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}
