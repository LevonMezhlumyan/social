// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjG9MWAKOvkmZDI7B_5SvO1nxbSBMRqWA",
  authDomain: "uploadingfile-3a4a5.firebaseapp.com",
  projectId: "uploadingfile-3a4a5",
  storageBucket: "uploadingfile-3a4a5.appspot.com",
  messagingSenderId: "10948439932",
  appId: "1:10948439932:web:83e1259340aa9ac8877ef9",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
