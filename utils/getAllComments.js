// import {
// 	collection,
// 	doc,
// 	query,
// 	onSnapshot,
// 	getDocs,
// } from "firebase/firestore";
// import { dbFirestore } from "../firebase/config";

// export const getCurrentPostComments = async (postId) => {
// 	const currentPostRef = doc(dbFirestore, "dcim", postId);
// 	const commentsCollection = query(collection(currentPostRef, "comments"));

// 	const currentPostSnapshot = await getDocs(commentsCollection);
// 	const arr = currentPostSnapshot.docs.map((doc) => {
// 		return {
// 			id: doc.id,
// 			data: doc.data(),
// 		};
// 	});

// 	return arr;
// };
