import React, { useEffect, useState } from "react";
import {readAllData} from '../helper/idb'

function Home() {
  const [data, setData] = useState([]);

  const fetchData = async() => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
      //.then(json => console.log(json))
      setData(result);
  }
console.log('data',data);

  useEffect(() => {
    fetchData();
  },[]);

  if ('indexedDB' in window) {
    readAllData('comments').then((idbData) => {
      if (data == null) {
        console.log('from cache');
        setData(idbData)
      }
    })
  }

  return (
    <div style={{margin: '15px 25px', width:'50%'}}>
      <h1>This is Home page</h1>
      <h2>List of post</h2>
      {data?.map(x => {
        return <div key={x.id} style={{marginBottom:'25px'}}>
          <h3>Title: {x.title}</h3>
          <p>Text: {x.body}</p>
          </div>
      })}
    </div>
  );
}

export default Home;
