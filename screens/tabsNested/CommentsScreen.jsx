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
import Svg, { Circle, Path } from "react-native-svg";

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
			userNickName: initState.nickname,
			data: Date.now(),
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
				<Image style={styles.currentImg} source={{ uri: image }} />
				<View style={styles.commentsContainer}>
					<FlatList
						data={comments}
						keyExtractor={(item, indx) => item.id}
						renderItem={({ item }) => {
							const commentDate = new Date(item.data.data);
							const day = commentDate.getDate();
							const month = commentDate.getMonth();
							const year = commentDate.getFullYear();
							const hours = commentDate.getHours();
							const minutes = commentDate.getMinutes();

							const formattedDate = `${day} ${months[month]}, ${year}`;
							const formattedTime = `${hours
								.toString()
								.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

							const resultDate = `${formattedDate} | ${formattedTime}`;
							return (
								<SafeAreaView style={styles.currentCommentContainer}>
									<Text>User: {item.data.userNickName}</Text>
									<Text>Comment: {item.data.comment}</Text>
									<Text>DATA: {resultDate}</Text>
								</SafeAreaView>
							);
						}}
					/>
				</View>

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

					<TouchableOpacity
						disabled={!imageComment}
						style={[styles.addCommentBtn, !imageComment && styles.disabled]}
						onPress={createComment}>
						<Svg
							xmlns="http://www.w3.org/2000/svg"
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none">
							<Circle
								cx="17"
								cy="17"
								r="17"
								fill={imageComment ? "#FF6C00" : "#d7d7d7"}
							/>
							<Path
								d="M17 10L17.3536 9.64645C17.1583 9.45118 16.8417 9.45118 16.6464 9.64645L17 10ZM21.6464 15.3536C21.8417 15.5488 22.1583 15.5488 22.3536 15.3536C22.5488 15.1583 22.5488 14.8417 22.3536 14.6464L21.6464 15.3536ZM11.6464 14.6464C11.4512 14.8417 11.4512 15.1583 11.6464 15.3536C11.8417 15.5488 12.1583 15.5488 12.3536 15.3536L11.6464 14.6464ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM16.6464 10.3536L21.6464 15.3536L22.3536 14.6464L17.3536 9.64645L16.6464 10.3536ZM16.6464 9.64645L11.6464 14.6464L12.3536 15.3536L17.3536 10.3536L16.6464 9.64645ZM16.5 10V17H17.5V10H16.5ZM16.5 17V24H17.5V17H16.5Z"
								fill="white"
							/>
						</Svg>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
