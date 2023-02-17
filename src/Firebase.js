// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDErsI0nuebwFnYkzJ4tdJd1FTkHo9z4k0',
	authDomain: 'test-82b8e.firebaseapp.com',
	databaseURL:'http://test-82b8e.firebaseio.com',
	projectId: 'test-82b8e',
	storageBucket: 'test-82b8e.appspot.com',
	messagingSenderId: '1042524823075',
	appId: '1:1042524823075:web:aaced4d07a9bb35b501b96',
	measurementId: 'G-HFR1X7QH05',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
