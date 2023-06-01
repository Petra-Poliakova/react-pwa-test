// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqcrszk7pEWGrHWBMveYQVJxxYq8jsOlk",
  authDomain: "users-comments-1e926.firebaseapp.com",
  databaseURL:
    "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "users-comments-1e926",
  storageBucket: "users-comments-1e926.appspot.com",
  messagingSenderId: "860609586306",
  appId: "1:860609586306:web:368d65c7965b59e60c009b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Voliteľne: inicializácia IndexedDB
// if ("indexedDB" in window) {
//   const request = window.indexedDB.open("yourDatabaseName", 1);

//   request.onerror = function (event) {
//     console.log("Chyba pri otváraní IndexedDB:", event.target.error);
//   };

//   request.onupgradeneeded = function (event) {
//     const db = event.target.result;
//     // Vytvorenie objektu úložiska v IndexedDB
//     const store = db.createObjectStore("comments", { keyPath: "id" });
//     // Definovanie indexu (voliteľné)
//     //store.createIndex("indexName", "indexProperty", { unique: false });
//   };

//   request.onsuccess = function (event) {
//     const db = event.target.result;
//     console.log("IndexedDB je pripravené na použitie.");
//   };
// } else {
//   console.log("IndexedDB nie je podporované v tomto prehliadači.");
// }

export default db;
