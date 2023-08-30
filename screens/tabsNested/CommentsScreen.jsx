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
import { useDispatch, useSelector } from "react-redux";
// import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CommentsScreenStyles";
import regEmptyImg from "../../assets/img/reg_rectangle_grey.png";
import { AddCommentBtn } from "../../components/btns/AddCommentBtn";
import { useButtonState } from "../../utils/tabBtnsContext";

import { authSlice } from "../../redux/auth/authReducer";

export default function CommentsScreen() {
	const { updateField } = authSlice.actions;
	const dispatch = useDispatch();

	// const {
	// 	params: { postId, imageTitle, image },
	// } = useRoute();
	const route = useRoute();
	const { postId, imageTitle, image } = route.params;
	const { hideKB } = useKeyboardState();
	const state = useSelector((store) => store.auth);

	const [inputComment, setInputComment] = useState("");
	const [comments, setComments] = useState([]);
	// console.log("CommentsScreen >> comments:", comments);

	const { previousScreen, setPreviousScreen, setCurrentScreen } =
		useButtonState();

	useEffect(() => {
		const arr = getAllComments(postId);
		// console.log("useEffect >> arr:", arr);
		setComments(arr);
	}, []);

	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) {
			setCurrentScreen("CommentsScreen");
		}
		// dispatch(updateField({ tabNavigation: false }));
	}, [isFocused, setCurrentScreen]);

	// ???
	useEffect(() => {
		dispatch(updateField({ tabNavigation: true }));
	}, []);

	const getAllComments = (postId) => {
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
			comment: inputComment,
			avatar: state.serverAvatar,
			commentDate: Date.now(),
			userId: state.userId,
		});

		await updateDoc(currentPostRef, {
			postsCount: increment(1),
		});

		setInputComment("");
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
