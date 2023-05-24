import React, { useState, useEffect } from "react";
import { db } from "../firebase"
import { set, ref, onValue} from "firebase/database"

import Avatar from "../images/avatar.png";
import "../index.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);

  const fetchUrl = 'https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app/comments.json'

  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     const data = snapshot.val();
  //     setComments([]);

  //     if(data !== null) {
  //       Object.values(data).map((comment) => {
  //         console.log(comment)
  //         setComments(prevComments => [...prevComments, comment]);
  //         console.log('comments', comments )
  //       })
  //     }
  //   });
  // }, []);  

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       "https://jsonplaceholder.typicode.com/comments"
  //     ).then((response) => response.json());
  //     setData(result);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(fetchUrl)
      .then((response) => response.json());
      let dataArray = [];
      for(var key in result) {
        dataArray.push(result[key])
      }
      setData(dataArray);
    };
    fetchData();
  }, []);
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
