import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewai-7c409.firebaseapp.com",
  projectId: "interviewai-7c409",
  storageBucket: "interviewai-7c409.firebasestorage.app",
  messagingSenderId: "302365023396",
  appId: "1:302365023396:web:8ab0e503baf3551ef95a31"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth, provider}