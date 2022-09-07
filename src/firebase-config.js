// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Y2Hpn8pOQwU-6iaD0bl_-PI_WbUXxaA",
  authDomain: "todo-backend-145ad.firebaseapp.com",
  projectId: "todo-backend-145ad",
  storageBucket: "todo-backend-145ad.appspot.com",
  messagingSenderId: "666944245058",
  appId: "1:666944245058:web:f7c06d85118406ee534cdb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};
