// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Google_API_KEY",
  authDomain: "course-management-system-4d9f1.firebaseapp.com",
  projectId: "course-management-system-4d9f1",
  storageBucket: "course-management-system-4d9f1.appspot.com",
  messagingSenderId: "692224928875",
  appId: "1:692224928875:web:261f1a7e91c41121bbd52e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);