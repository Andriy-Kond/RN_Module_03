import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { uriToBlob } from "./uriToBlob";

// uri to blob and upload to server storage
export const uploadPhotoToServer = async (urlAvatar) => {
	try {
		// to BLOB from uri
		const blobFile = await uriToBlob(urlAvatar);

		// send to storage
		const uniqPostId = Date.now().toString();
		const storageRef = ref(storage, `${uniqPostId}`);
		await uploadBytes(storageRef, blobFile);

		// take from server
		const url = await getDownloadURL(storageRef);
		return url;
	} catch (e) {
		console.error("Error adding data: ", e);
		throw e;
	}
};
