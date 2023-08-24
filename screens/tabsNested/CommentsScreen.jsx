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
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { AddCommentBtn } from "../../components/btns/AddCommentBtn";

export default function CommentsScreen() {
	const { hideKB } = useKeyboardState();
	const initState = useSelector((store) => store.auth);
	console.log("CommentsScreen >> initState:", initState);

	const {
		params: { postId, imageTitle, image },
	} = useRoute();

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
		const currentPostRef = doc(dbFirestore, "dcim", postId);

		await addDoc(collection(currentPostRef, "comments"), {
			comment: imageComment,
			// userNickName: initState.nickname,
			avatar: initState.avatar,
			commentDate: Date.now(),
			userId: initState.userId,
		});
		console.log("awaitaddDoc >> initState:", initState);
		setImageComment("");
	};

	const months = [
		"січня",
		"лютого",
		"березня",
		"квітня",
		"травня",
		"червня",
		"липня",
		"серпня",
		"вересня",
		"жовтня",
		"листопада",
		"грудня",
	];

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<Image style={styles.currentImg} source={{ uri: image }} />
				<View style={styles.commentsContainer}>
					<FlatList
						data={comments}
						keyExtractor={(item, indx) => item.id}
						renderItem={({ item }) => {
							const commentDate = new Date(item.data.commentDate);
							const day = commentDate.getDate();
							const month = commentDate.getMonth();
							const year = commentDate.getFullYear();
							const hours = commentDate.getHours();
							const minutes = commentDate.getMinutes();

							const formattedDate = `${day} ${months[month]}, ${year}`;
							const formattedTime = `${hours
								.toString()
								.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
							const formattedDateTime = `${formattedDate} | ${formattedTime}`;
							const isCurrentUser = item.data.userId === initState.userId;
							return (
								<SafeAreaView
									style={[
										styles.currentCommentContainer,
										{ flexDirection: isCurrentUser ? "row-reverse" : "row" },
									]}>
									<Image
										style={[
											styles.avatarOfComment,
											isCurrentUser ? { marginLeft: 16 } : { marginRight: 16 },
										]}
										source={
											initState?.avatar
												? { uri: item.data.avatar }
												: regEmptyImg
										}
									/>
									<View style={styles.currentCommentWrapper}>
										<Text style={styles.currentCommentText}>
											{item.data.comment}
										</Text>
										<Text
											style={[
												styles.currentCommentDateTime,
												{
													alignSelf: isCurrentUser ? "flex-start" : "flex-end",
												},
											]}>
											{formattedDateTime}
										</Text>
									</View>
								</SafeAreaView>
							);
						}}
					/>
				</View>

				{/* INPUT FIELD */}
				<View
					style={[
						styles.imageCommentContainer,
						initState?.currentFocusInput === "imageComment" &&
							styles.inputFocused,
					]}>
					<TextInput
						value={imageComment}
						placeholder={"Коментувати..."}
						placeholderTextColor={"#BDBDBD"}
						style={styles.imageComment}
						multiline
						onChangeText={(value) => {
							setImageComment(value);
						}}
					/>
					{/* ADD COMMENT BTN */}
					<TouchableOpacity disabled={!imageComment} onPress={createComment}>
						<AddCommentBtn imageComment={imageComment} />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
