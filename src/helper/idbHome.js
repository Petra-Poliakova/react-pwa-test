import { openDB } from 'idb';

const dbPromise = openDB('post-DB', 1, {
    upgrade(db) {
      db.createObjectStore('posts', { keyPath: 'id' });
    },
  });
  
  export const saveDataToIndexedDB = async(data) => {
    const db = await dbPromise;
    const tx = db.transaction('posts', 'readwrite');
    const store = tx.objectStore('posts');
    await Promise.all(data.map(item => store.put(item)));
    await tx.complete;
  }
  
  export const getDataFromIndexedDB = async() => {
    const db = await dbPromise;
    const tx = db.transaction('posts', 'readonly');
    const store = tx.objectStore('posts');
    return store.getAll();
  }

  //Add data to IndexedDB
  //  export const saveDataToIndexedDB = async(data) => {
  //   const db = await dbPromise;
  //   const tx = db.transaction('posts', 'readwrite');
  //   const store = tx.objectStore('posts');
  //   await Promise.all(data.map(item => store.add(item))); // Použite metódu "add" namiesto "put"
  //   await tx.complete;
  // }

  //Remove data from IndexedDBň
  //  export const deleteDataFromIndexedDB= async(id) => {
  //   const db = await dbPromise;
  //   const tx = db.transaction('posts', 'readwrite');
  //   const store = tx.objectStore('posts');
  //   await store.delete(id);
  //   await tx.complete;
  // }

  //Read data from IndexedDB with filter or sort data
  //  export const getDataFromIndexedDB = async(filter) => {
  //   const db = await dbPromise;
  //   const tx = db.transaction('posts', 'readonly');
  //   const store = tx.objectStore('posts');
    
  //   if (filter) {
  //     // Príklad filtra na základe hodnoty pola "userId"
  //     const index = store.index('userId');
  //     return index.getAll(filter);
  //   } else {
  //     return store.getAll();
  //   }
  // }