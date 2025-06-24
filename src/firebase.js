// import firebase from "firebase";
// import "firebase/storage";
// import "firebase/auth";

// const firebaseConfig = {
//     apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
//     authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//     databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
//     projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//     storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
// };


// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
// const realTimeDb = app.database();
// const db = app.firestore();
// const auth = app.auth();
// const storage = firebase.storage();



// // Set up Google Auth Provider
// const googleProvider = new firebase.auth.GoogleAuthProvider();

// // Function to handle Google Sign-In
// const signInWithGoogle = async () => {
//   try {
//     const result = await auth.signInWithPopup(googleProvider);
//     // Get user info if needed
//     const user = result.user;
//     console.log("User signed in:", user);
//   } catch (error) {
//     console.error("Error signing in with Google:", error);
//   }
// };

// export { auth, db, storage, realTimeDb, signInWithGoogle };















// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "@firebase/firestore"; 
// import { getDatabase } from "firebase/database"; // Import database module
// import { getStorage } from "firebase/storage"; // Import storage module

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const realTimeDb = getDatabase(app); // Initialize Realtime Database
// const storage = getStorage(app); // Initialize Storage

// // Set up Google Auth Provider
// const googleProvider = new GoogleAuthProvider();

// // Function to handle Google Sign-In
// const signInWithGoogle = async () => {
//     try {
//         const result = await auth.signInWithPopup(googleProvider);
//         const user = result.user;
//         console.log("User signed in:", user);
//     } catch (error) {
//         console.error("Error signing in with Google:", error);
//     }
// };

// export { auth, db, storage, realTimeDb, signInWithGoogle };














import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import { getFirestore } from "firebase/firestore"; // Corrected Firestore import
import { getDatabase } from "firebase/database"; // Import database module
import { getStorage } from "firebase/storage"; // Import storage module

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Corrected the typo: "FIREABSE"
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realTimeDb = getDatabase(app); // Initialize Realtime Database
const storage = getStorage(app); // Initialize Storage

// Set up Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider); // Updated method usage
        const user = result.user;
        console.log("User signed in:", user);
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

export { auth, db, storage, realTimeDb, signInWithGoogle };
