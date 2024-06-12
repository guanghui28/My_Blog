// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "my-blog-92655.firebaseapp.com",
	projectId: "my-blog-92655",
	storageBucket: "my-blog-92655.appspot.com",
	messagingSenderId: "534284977341",
	appId: "1:534284977341:web:2c3d5fa835b83769ca63d4",
	measurementId: "G-8PGGLL0YD8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
