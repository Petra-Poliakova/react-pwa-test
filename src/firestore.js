import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCqcrszk7pEWGrHWBMveYQVJxxYq8jsOlk",
    authDomain: "users-comments-1e926.firebaseapp.com",
    databaseURL: "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "users-comments-1e926",
    storageBucket: "users-comments-1e926.appspot.com",
    messagingSenderId: "860609586306",
    appId: "1:860609586306:web:368d65c7965b59e60c009b"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

export default db;

//export default getFirestore();