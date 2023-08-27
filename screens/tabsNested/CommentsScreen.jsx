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
import { useIsFocused, useRoute } from "@react-navigation/native";

import { dbFirestore } from "../../firebase/config";
import { collection, doc, addDoc, query, onSnapshot } from "firebase/firestore";

import { useKeyboardState } from "../../utils/keyboardContext";
import { useSelector } from "react-redux";
// import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CommentsScreenStyles";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { AddCommentBtn } from "../../components/btns/AddCommentBtn";

export default function CommentsScreen() {
	// const {
	// 	params: { postId, imageTitle, image },
	// } = useRoute();
	const route = useRoute();
	// const isFocused = useIsFocused();
	// useEffect(() => {
	// 	if (isFocused) {
	// 		console.log("CommentsScreen >> route:", route.name);
	// 	}
	// }, [isFocused]);
	const { postId, imageTitle, image } = route.params;

	const { hideKB } = useKeyboardState();
	const state = useSelector((store) => store.auth);

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

		console.log("запуск addDoc :>> ");
		await addDoc(collection(currentPostRef, "comments"), {
			// userNickName: state.nickname,
			comment: imageComment,
			avatar: state.serverAvatar,
			commentDate: Date.now(),
			userId: state.userId,
		});

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
				<View style={styles.item}>
					<Image style={styles.currentImg} source={{ uri: image }} />
				</View>

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
							const isCurrentUser = item.data.userId === state.userId;
							return (
								<View
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
											state?.serverAvatar
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
								</View>
							);
						}}
					/>
				</View>

				{/* INPUT FIELD */}
				<View
					style={[
						styles.addCommentContainer,
						state?.currentFocusInput === "imageComment" && styles.inputFocused,
					]}>
					<TextInput
						value={imageComment}
						placeholder={"Коментувати..."}
						placeholderTextColor={"#BDBDBD"}
						style={styles.inputComment}
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
