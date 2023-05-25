import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { set, ref, onValue } from "firebase/database";

import Avatar from "../images/avatar.png";
import "../index.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);

  ///// Pre konfiguraciu Firebase
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const dataDB = snapshot.val();
      //setData([]);
      console.log("dataDB", dataDB);

      if(dataDB !== null) {
        const arrayData = Object.entries(dataDB.comments).map(([key, value])=> ({
          idKey: key,
          id: value.id,
          name: value.name,
          email: value.email,
          body: value.body, 
          imgAvatar: value.imgAvatar
        }));
        console.log('arrayData',arrayData);
        setData(arrayData);
        
      }
   });
  }, []);

  console.log('arrayData-data',data)

  // const reformattedArray = Object.keys(comments).map((key) => ({
  //   id: comments[key].id,
  //   name: comments[key].name,
  // }));

  ////Priamy fetch na url
  //console.log("reformattedArray", reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       "https://jsonplaceholder.typicode.com/comments"
  //     ).then((response) => response.json());
  //     setData(result);
  //   };
  //   fetchData();
  // }, []);

  // const fetchUrl =
  //   "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app/comments.json";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(fetchUrl).then((response) => response.json());
  //     //console.log("result", result);
  //     let dataArray = [];
  //     for (var key in result) {
  //       dataArray.push(result[key]);
  //       //console.log("dataArray", dataArray);
  //     }
  //     setComments(dataArray);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <h1>Comments from our users.</h1>
      {data.map((comment) => (
        <div className="comment-container" key={comment.id}>
          <div className="avatar-box">
            <img src={comment.imgAvatar} alt="user-avatar" />
          </div>
          <div className="comment-box">
            <h2 className="comment-name">{comment.name}</h2>
            <h3>{comment.email}</h3>
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
