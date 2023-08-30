import { doc, updateDoc, increment } from "firebase/firestore";

import { dbFirestore } from "../firebase/config";

export const addLike = async (
	postId,
	usersLikedPost,
	likesCount,
	currentUser
) => {
	const currentPostRef = doc(dbFirestore, "dcim", postId);

	if (usersLikedPost.includes(currentUser)) {
		// delete user's like
		const updateUsersLikedPost = usersLikedPost.filter(
			(userId) => userId !== currentUser
		);

		await updateDoc(currentPostRef, {
			likesCount: Number(likesCount) - 1,
			usersLikedPost: updateUsersLikedPost,
		});
	} else {
		// add user's like
		const updateUsersLikedPost = [...usersLikedPost, currentUser];
		await updateDoc(currentPostRef, {
			likesCount: increment(1),
			usersLikedPost: updateUsersLikedPost,
		});
	}
};
