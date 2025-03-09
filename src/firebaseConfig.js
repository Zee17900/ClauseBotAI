import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore

const firebaseConfig = {
    apiKey: "AIzaSyCEL2GO_pP7c0KIZvvzV53BcihX7Lh3OA4",
    authDomain: "clausebotai.firebaseapp.com",
    projectId: "clausebotai",
    storageBucket: "clausebotai.firebasestorage.app",
    messagingSenderId: "874583606821",
    appId: "1:874583606821:web:629e842b00561245d061cc",
    measurementId: "G-KCLQJ9HBKE"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore instance

export { auth, db }; // ✅ Export both `auth` and `db`
