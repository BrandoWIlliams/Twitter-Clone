// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsxiORDg23Qb3Wrqv9ObcxfpfFIx0s0AA",
  authDomain: "twitter-clone-6309f.firebaseapp.com",
  projectId: "twitter-clone-6309f",
  storageBucket: "twitter-clone-6309f.appspot.com",
  messagingSenderId: "263862332262",
  appId: "1:263862332262:web:384077beddb8367975f6a7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export default app;
export { db, storage, auth };
