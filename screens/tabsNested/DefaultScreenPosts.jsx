import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";
import { useSelector } from "react-redux";

import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";

export default function DefaultScreenPosts() {
	const initState = useSelector((state) => state.auth);
	console.log("DefaultScreenPosts >> initState:", initState);

	const navigation = useNavigation();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getAllPosts();
	}, []);

	const getAllPosts = async () => {
		const dcimCollection = query(collection(dbFirestore, "dcim"));

		onSnapshot(dcimCollection, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setPosts(arr);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.item}>
				<Image
					style={styles.userImg}
					source={initState?.avatar ? { uri: initState.avatar } : regEmptyImg}
				/>
				<View>
					<Text style={styles.userName}>{initState.nickname}</Text>
					<Text style={styles.userEmail}>{initState.email}</Text>
				</View>
			</View>

			<FlatList
				data={posts}
				keyExtractor={(item, indx) => item.id}
				renderItem={({ item }) => {
					const indx = posts.indexOf(item);

					return (
						<View style={styles.imgContainer}>
							<Text Style={styles.imgTitle}>Image #{indx + 1}</Text>
							<Image
								source={{ uri: item.data.photo }}
								style={styles.currentImg}
							/>
							<Text>{item.data.imageTitle}</Text>
							<View style={styles.buttonsWrapper}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("MapScreen", item.data.location)
									}>
									<Text>Go to MAP</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										navigation.navigate("CommentsScreen", {
											imageTitle: item.data.imageTitle,
											postId: item.id,
										})
									}>
									<Text>Add COMMENT</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 32,
		flex: 1,
		width: "100%",
		backgroundColor: "white",
	},

	item: {
		flexDirection: "row",
		alignItems: "center",
	},

	userImg: {
		borderRadius: 16,
		marginRight: 8,
		width: 60,
		height: 60,
	},
	userName: {
		color: "#212121",
		fontFamily: "RobotoBold700",
		fontSize: 13,
	},

	userEmail: {
		color: "rgba(33, 33, 33, 0.80)",
		fontFamily: "RobotoRegular400",
		fontSize: 11,
	},

	imgContainer: {
		alignItems: "center",
		marginBottom: 30,
	},

	imgTitle: {
		marginBottom: 100,
	},

	currentImg: {
		width: "100%",
		height: 200,
		borderRadius: 20,
		borderColor: "#fff",
		marginTop: 10,
		marginBottom: 10,
	},

	buttonsWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
});
