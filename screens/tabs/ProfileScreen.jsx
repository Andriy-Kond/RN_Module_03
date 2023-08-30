import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot, where } from "firebase/firestore";

import { dbFirestore } from "../../firebase/config";

import { useButtonState } from "../../utils/tabBtnsContext";

import { styles } from "./ProfileScreenSttyles";
import { BtnLogout } from "../../components/btns/BtnLogout";
import { CommentBtn } from "../../components/btns/CommentBtn";
import { MapPinBtn } from "../../components/btns/MapPinBtn";
import bgImage from "../../assets/img/bg_photo.jpg";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const { setCurrentScreen } = useButtonState();

	const [userPosts, setUserPosts] = useState([]);
	const state = useSelector((state) => state.auth);
	const currentUser = useSelector((store) => store.auth.userId);

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

	return (
		<View style={styles.container}>
			<Image source={bgImage} style={styles.imgBg} resizeMode="cover" />
			<View style={styles.formContainer}>
				<BtnLogout />

				<View style={styles.user}>
					<Image
						style={styles.userImg}
						source={
							state?.serverAvatar ? { uri: state.serverAvatar } : regEmptyImg
						}
					/>
					<Text style={styles.userName}>{state.nickname}</Text>
				</View>

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

									<TouchableOpacity
										onPress={() =>
											navigation.navigate("MapScreen", {
												location: item.data.location,
												originScreen: "ProfileScreen",
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
						);
					}}
				/>
			</View>
		</View>
	);
}
