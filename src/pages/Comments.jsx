import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { set, ref, onValue } from "firebase/database";

import Avatar from "../images/avatar.png";
import "../index.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     const data = snapshot.val();
  //     setComments([]);
  //     console.log("dataue", data);

  //     if (data !== null) {
  //       const arrData = Object.values(data).map((comment) => comment);
  //       console.log("arrData", arrData);
  //       setComments(arrData);
  //       console.log("arrData", arrData);
  //     }

  // if (data !== null) {
  //   const arrData = Object.values(data).map((comment) => {
  //     setComments((prevComments) => [...prevComments, comment]);
  //   });
  //   console.log("arrData", arrData);
  // }

  // let dataArray = [];
  // for (let key in data) {
  //   dataArray.push(data[key]);
  //   console.log("dataArray", dataArray);
  // }
  // setComments(dataArray);
  //});
  //}, []);

  // const reformattedArray = Object.keys(comments).map((key) => ({
  //   id: comments[key].id,
  //   name: comments[key].name,
  // }));

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

  const fetchUrl =
    "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app/comments.json";

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(fetchUrl).then((response) => response.json());
      console.log("result", result);
      let dataArray = [];
      for (var key in result) {
        dataArray.push(result[key]);
        console.log("dataArray", dataArray);
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
            <img src={Avatar} alt="user-avatar" />
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
