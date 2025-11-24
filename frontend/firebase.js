// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0uFw4fNVY3VxMQyeNfQ-LGlcrU8rUQIQ",
  authDomain: "swep-storage-e7d63.firebaseapp.com",
  projectId: "swep-storage-e7d63",
  storageBucket: "swep-storage-e7d63.firebasestorage.app",
  messagingSenderId: "184877643970",
  appId: "1:184877643970:web:384456d0785f56766c235b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
