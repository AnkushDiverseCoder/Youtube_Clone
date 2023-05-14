import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtcK9a5MPsKpn-mfvzMDYQg3PSbHOgcQc",
  authDomain: "clone-98ac6.firebaseapp.com",
  projectId: "clone-98ac6",
  storageBucket: "clone-98ac6.appspot.com",
  messagingSenderId: "904794895960",
  appId: "1:904794895960:web:f4fd1f3aca5568d0613c2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;