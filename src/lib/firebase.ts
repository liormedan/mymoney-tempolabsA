import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYrcJmNxZcHWHH_GZtmAnHk6x7B9D7B8c",
  authDomain: "tempo-finance-app.firebaseapp.com",
  projectId: "tempo-finance-app",
  storageBucket: "tempo-finance-app.appspot.com",
  messagingSenderId: "846236041267",
  appId: "1:846236041267:web:e0f9d8b8d0d9b8d0d9b8d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
