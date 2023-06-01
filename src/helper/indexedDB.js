import { openDB } from "idb";

// Názov a verzia databázy
const DB_NAME = "comments-DB";
const DB_VERSION = 3;

// Názov a nastavenia objektového úložiska
const OBJECT_STORE_NAME = "comments";
const OBJECT_STORE_OPTIONS = { keyPath: "id" };

// Vytvorenie a inicializácia IndexedDB databázy
export const openDatabase = () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, OBJECT_STORE_OPTIONS);
      }
    },
  });
};

// Pridanie komentára do IndexedDB
export const addCommentToDB = async (comment) => {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.put(comment);
};

// Odstránenie komentára z IndexedDB
export const deleteCommentFromDB = async (commentId) => {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.delete(commentId);
};

// Získanie všetkých komentárov z IndexedDB
export const getCommentsFromDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  return store.getAll();
};
