// Project initialization
import { initializeApp } from "firebase/app";
// Connection db authorization to project
import { getAuth } from "firebase/auth";
// Connection db storage to project
import { getStorage } from "firebase/storage";

import "firebase/storage";
import "firebase/firestore";

// Connection different db in project
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCK1qpTSiTIgVDJxW2EmlR6s2DxrFBCevw",
	authDomain: "rn-2-f8dcb.firebaseapp.com",
	projectId: "rn-2-f8dcb",
	storageBucket: "rn-2-f8dcb.appspot.com",
	messagingSenderId: "467054084436",
	appId: "1:467054084436:web:beacaff9cb967e337288c1",
	measurementId: "G-S3DEJ3WG58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const dbFirestore = getFirestore(app);
export const storage = getStorage(app);
// export const dbDatabase = getDatabase(app);
