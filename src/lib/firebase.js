import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase's web app config is public. Access to donor data is controlled by
// the Firestore rules in firestore.rules, not by hiding these values.
const firebaseConfig = {
  apiKey: "AIzaSyCwZp13UeBHwWmadRqx26SJpp-NKtBX_DU",
  authDomain: "find-donor-d7cf8.firebaseapp.com",
  projectId: "find-donor-d7cf8",
  storageBucket: "find-donor-d7cf8.firebasestorage.app",
  messagingSenderId: "1090897302068",
  appId: "1:1090897302068:web:5e7a680552d26379b27061",
  measurementId: "G-R7L0EVBTZQ",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
