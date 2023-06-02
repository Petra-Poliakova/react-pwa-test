var dbPromise = new Promise ((resolve, reject) => {
    var DBOpenRequest = indexedDB.open('post-store', 1);
    DBOpenRequest.onupgradeneeded = e => {
        const dbInstance = DBOpenRequest.result;
        if (!dbInstance.objectStoreNames.contains('posts')) {
            dbInstance.createObjectStore('posts', {keyPath: 'id'});
        }
    }
    DBOpenRequest.onsuccess = e => {
        resolve(DBOpenRequest.result)
    }
});

export const putData = (dbName, data) => {
    dbPromise.then(async(db)=> {
        const tx = db.transaction(dbName, 'posts');
        const store = tx.objectStore(dbName);
        store.put(data)
    });
}

export const putAllData = (dbName, data) => {
    dbPromise.then(async(db)=> {
        const tx = db.transaction(dbName, 'posts');
        const store = tx.objectStore(dbName);
        data.foreach(item => {
            store.put(item);
        });
     })
}

  export const readAllData = (st) => {
    return new Promise((resolve, reject) => {
        dbPromise.then(async (db)=> {
            const tx = db.transaction(st, 'readonly');
            const store = tx.objectStore(st);
            const getAllRequest = store.getAll();
            getAllRequest.onsuccess= () => {
                resolve(getAllRequest.result);
            }
        })
    })
  }
 