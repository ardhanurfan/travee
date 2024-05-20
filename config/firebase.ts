import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence, getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDI0BiychPOUDb-Gq_ET5aGGssHeIoAWUw",
  authDomain: "travee-ad867.firebaseapp.com",
  databaseURL: "https://travee-ad867.firebaseio.com",
  projectId: "travee-ad867",
  storageBucket: "travee-ad867.appspot.com",
  messagingSenderId: "487780502110",
  appId: "1:487780502110:web:5af87ad744b837667d02cf",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
