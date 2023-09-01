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
import {
	collection,
	doc,
	addDoc,
	query,
	onSnapshot,
	increment,
	updateDoc,
} from "firebase/firestore";

import { useKeyboardState } from "../../utils/keyboardContext";
import { useSelector } from "react-redux";

import { styles } from "./CommentsScreenStyles";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { AddCommentBtn } from "../../components/btns/AddCommentBtn";

import { compareDates } from "../../utils/compareDates";

// import { months } from "../../utils/months";
import { useNavScreen } from "../../utils/navContext";

export default function CommentsScreen() {
	const route = useRoute();
	const { postId, image } = route.params;

	const state = useSelector((store) => store.auth);

	const { hideKB } = useKeyboardState();
	const { setCurrentScreen } = useNavScreen();

	const [inputComment, setInputComment] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const allComments = getAllComments(postId);
		setComments(allComments);
	}, []);

	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("CommentsScreen");
		}
	}, [isFocused]);

	const getAllComments = (postId) => {
		const currentPostRef = doc(dbFirestore, "dcim", postId);
		const commentsCollection = query(collection(currentPostRef, "comments"));

		onSnapshot(commentsCollection, (snapshot) => {
			const allCommentsSnapshot = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setComments(allCommentsSnapshot);
		});
	};

	const createComment = async () => {
		setInputComment("");
		hideKB();
		const currentPostRef = doc(dbFirestore, "dcim", postId);

		await addDoc(collection(currentPostRef, "comments"), {
			comment: inputComment,
			avatar: state.serverAvatar,
			createDate: Date.now(),
			userId: state.userId,
		});

		await updateDoc(currentPostRef, {
			commentsCount: increment(1),
		});
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
						data={comments?.sort(compareDates)}
						keyExtractor={(item, indx) => item.id}
						renderItem={({ item }) => {
							const commentDate = new Date(item.data.createDate);
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
						state?.currentFocusInput === "inputComment" && styles.inputFocused,
					]}>
					<TextInput
						value={inputComment}
						placeholder={"Коментувати..."}
						placeholderTextColor={"#BDBDBD"}
						style={styles.inputComment}
						multiline
						onChangeText={(value) => {
							setInputComment(value);
						}}
					/>
					{/* ADD COMMENT BTN */}
					<TouchableOpacity disabled={!inputComment} onPress={createComment}>
						<AddCommentBtn inputComment={inputComment} />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
