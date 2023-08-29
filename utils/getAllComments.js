import {
	collection,
	doc,
	query,
	onSnapshot,
	getDocs,
} from "firebase/firestore";
import { dbFirestore } from "../firebase/config";

// export const getAllComments = async (postId) => {
// 	const currentPostRef = doc(dbFirestore, "dcim", postId);
// 	const commentsCollection = query(collection(currentPostRef, "comments"));

// 	let arr = [];

// 	onSnapshot(commentsCollection, (snapshot) => {
// 		arr = snapshot.docs.map((doc) => {
// 			return {
// 				id: doc.id,
// 				data: doc.data(),
// 			};
// 		});
// 	});

// 	return arr.length;
// };

export const getCurrentPostComments = async (postId) => {
	const currentPostRef = doc(dbFirestore, "dcim", postId);
	const commentsCollection = query(collection(currentPostRef, "comments"));

	const currentPostSnapshot = await getDocs(commentsCollection);
	const arr = currentPostSnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			data: doc.data(),
		};
	});

	return arr;
};

// onSnapshot(commentsCollection, (snapshot) => {
// 	const arr = snapshot.docs.map((doc) => {
// 		return {
// 			id: doc.id,
// 			data: doc.data(),
// 		};
// 	});

// 	// // add qty comments to each post
// 	// const updatedPosts = posts.map((post) => {
// 	// 	if (post.id === postId) {
// 	// 		return {
// 	// 			...post,
// 	// 			commentsCount: arr.length,
// 	// 		};
// 	// 	}
// 	// 	return post;
// 	// });
// 	// setPosts(updatedPosts);
// });
