import React, { useEffect, useState } from "react";
import {saveDataToIndexedDB, getDataFromIndexedDB } from '../helper/idbHome'
//import { openDB } from 'idb';

import "../index.css";

function Home() {
  const [data, setData] = useState([]);

  // const dbPromise = openDB('my-database', 2, {
  //   upgrade(db) {
  //     db.createObjectStore('posts', { keyPath: 'id' });
  //   },
  // });
  
  // async function saveDataToIndexedDB(data) {
  //   const db = await dbPromise;
  //   const tx = db.transaction('posts', 'readwrite');
  //   const store = tx.objectStore('posts');
  //   await Promise.all(data.map(item => store.put(item)));
  //   await tx.complete;
  // }
  
  // async function getDataFromIndexedDB() {
  //   const db = await dbPromise;
  //   const tx = db.transaction('posts', 'readonly');
  //   const store = tx.objectStore('posts');
  //   return store.getAll();
  // }

  const fetchData = async() => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
      //.then(json => console.log(json))
      setData(result);
      saveDataToIndexedDB(result);
  }
console.log('data',data);

  useEffect(() => {
    async function fetchDataFromIndexedDB() {
      const indexedDBData = await getDataFromIndexedDB();
      setData(indexedDBData);
    }
  
    fetchDataFromIndexedDB();
    fetchData();
  },[]);


  return (
    <div className="post-container" >
      <h1>This is Home page</h1>
      <h2>List of post</h2>
      {data?.map(x => {
        return <div className="post-box" key={x.id} >
          <h3>Title: {x.title}</h3>
          <p>Text: {x.body}</p>
          </div>
      })}
    </div>
  );
}

export default Home;
