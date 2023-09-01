import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";

import { dbFirestore } from "../../firebase/config";
import { useButtonState } from "../../utils/tabBtnsContext";

import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { CommentBtn } from "../../components/btns/CommentBtn";
import { MapPinBtn } from "../../components/btns/MapPinBtn";

import { styles } from "./PostsScreenStyles";
import { addLike } from "../../utils/addLike";
import { LikeBtn } from "../../components/btns/LikeBtn";
import { isUserLikedPost } from "../../utils/isUserLikedPost";
import { compareDates } from "../../utils/compareDates";
import { useNavScreen } from "../../utils/navContext";

export default function PostsScreen() {
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	const state = useSelector((state) => state.auth);
	const currentUser = useSelector((store) => store.auth.userId);
	const { setCurrentScreen } = useNavScreen();
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("PostsScreen");
		}
	}, [isFocused]);

	useEffect(() => {
		getAllUsersPosts();
	}, []);

	const getAllUsersPosts = async () => {
		const dcimCollection = query(collection(dbFirestore, "dcim"));

		onSnapshot(dcimCollection, (snapshot) => {
			const allUsersPosts = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});

			setAllPosts(allUsersPosts);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.user}>
				<Image
					style={styles.userImg}
					source={
						state?.serverAvatar ? { uri: state.serverAvatar } : regEmptyImg
					}
				/>
				<View>
					<Text style={styles.userName}>{state.nickname}</Text>
					<Text style={styles.userEmail}>{state.email}</Text>
				</View>
			</View>

			<FlatList
				data={allPosts?.sort(compareDates)}
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
												originScreen: "PostsScreen",
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

								<TouchableOpacity
									onPress={() =>
										navigation.navigate("MapScreen", {
											location: item.data.location,
											originScreen: "PostsScreen",
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
	);
}
