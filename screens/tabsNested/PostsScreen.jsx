import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";

import { dbFirestore } from "../../firebase/config";
import { useSelector } from "react-redux";

import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { useButtonState } from "../../utils/tabBtnsContext";

import { styles } from "./PostsScreenStyles";

import { CommentBtn } from "../../components/btns/CommentBtn";
import { MapPinBtn } from "../../components/btns/MapPinBtn";
// import { getCurrentPostComments } from "../../utils/getAllComments";

export default function PostsScreen() {
	const state = useSelector((state) => state.auth);

	const navigation = useNavigation();
	const [posts, setPosts] = useState([]);

	const { setCurrentScreen } = useButtonState();

	useEffect(() => {
		getAllPosts();
	}, []);

	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("PostsScreen");
		}
	}, [isFocused, setCurrentScreen]);

	const getAllPosts = async () => {
		const dcimCollection = query(collection(dbFirestore, "dcim"));

		onSnapshot(dcimCollection, (snapshot) => {
			const postsArr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});

			setPosts(postsArr);
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
				data={posts}
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
								<View>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("CommentsScreen", {
												imageTitle: item.data.imageTitle,
												postId: item.id,
												image: item.data.photo,
												originScreen: "PostsScreen",
											})
										}>
										<View style={styles.commentBtnWrapper}>
											<CommentBtn commentsQty={item.data.postsCount} />
											<Text
												style={[
													styles.commentBtnText,
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
								</View>

								<View>
									<TouchableOpacity
										style={styles.mapPin}
										onPress={() =>
											navigation.navigate("MapScreen", {
												location: item.data.location,
												originScreen: "PostsScreen",
											})
										}>
										<View style={styles.commentBtnWrapper}>
											<MapPinBtn />
											<Text style={styles.commentBtnText}>
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
						</View>
					);
				}}
			/>
		</View>
	);
}
