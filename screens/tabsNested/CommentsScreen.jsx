import { useEffect, useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	FlatList,
	Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { dbFirestore } from "../../firebase/config";
import { collection, doc, addDoc, query, onSnapshot } from "firebase/firestore";

import { useKeyboardState } from "../../utils/keyboardContext";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CommentsScreenStyles";

export default function CommentsScreen() {
	const { hideKB } = useKeyboardState();
	const initState = useSelector((store) => store.auth);

	const {
		params: { postId, imageTitle, image },
	} = useRoute();
	console.log("CommentsScreen >> image:", image);

	const [imageComment, setImageComment] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getAllComments();
	}, []);

	const getAllComments = async () => {
		const currentPostRef = doc(dbFirestore, "dcim", postId);
		const commentsCollection = query(collection(currentPostRef, "comments"));

		onSnapshot(commentsCollection, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setComments(arr);
		});
	};

	const createComment = async () => {
		hideKB();
		setImageComment("");
		const currentPostRef = doc(dbFirestore, "dcim", postId);
		await addDoc(collection(currentPostRef, "comments"), {
			comment: imageComment,
			userNickName: initState.currentUser,
		});
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<Image style={styles.currentImg} source={{ uri: image }}></Image>
				<Text style={styles.imageTitle}>Image title: {imageTitle}</Text>
				<FlatList
					data={comments}
					keyExtractor={(item, indx) => item.id}
					renderItem={({ item }) => {
						console.log("CommentsScreen >> item:", item);
						const indx = comments.indexOf(item);

						return (
							<SafeAreaView style={styles.commentContainer}>
								<Text>User: {item.data.userNickName}</Text>
								<Text>Comment: {item.data.comment}</Text>
							</SafeAreaView>
						);
					}}
				/>

				<View style={styles.imageCommentContainer}>
					<TextInput
						style={styles.imageComment}
						value={imageComment}
						multiline
						onChangeText={(value) => {
							setImageComment(value);
						}}
					/>
				</View>

				<TouchableOpacity
					disabled={!imageComment}
					style={[styles.button, !imageComment && styles.disabled]}
					onPress={createComment}>
					<Text style={[styles.text, !imageComment && styles.disabled]}>
						ADD Comment
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}
