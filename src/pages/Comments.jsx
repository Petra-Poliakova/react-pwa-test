import React, { useState, useEffect, useRef } from "react";
import db from "../firebase/firestore";
//import {db} from "../firebase/firebase";
//import { uid } from "uid";
//import { set, ref, onValue, remove } from "firebase/database";

//import {getCommentsFromDB, addCommentToDB} from '../helper/indexedDB'
//import { openDB } from "idb";

import Avatar from "../images/avatar.png";
import "../index.css";
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";

function Comments() {
  
  const [data, setData] = useState([]);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const textInputRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("commentsDB", 1);

      request.onerror = (event) => {
        reject("Error opening database");
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("comments", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("msg", "msg", { unique: false });
      };
    });
  };

  //const fetchData = () => {
    //Firebase
    // onValue(ref(db), (snapshot) => {
    //   const dataDB = snapshot.val();
    //   setData([]);
    //   console.log("dataDB", dataDB);

    //   if (dataDB !== null) {
    //     Object.values(dataDB.comments).map((comment) => {
    //       setData((oldComment) => [...oldComment, comment]);
          
    //     });
    //   }
      
    // });
  //}

  const fetchData = async() =>{
    try {
 
  // Firestore - načítanie komentárov
  onSnapshot(collection(db, "comments"), (snapshot) => {
   const comments = snapshot.docs.map((comment) => ({
     ...comment.data(),
     id: comment.id,
   }));
   //console.log('comments',comments )
   if (comments !== null) {
     setData(comments);
     }
 });
    }catch (error) {
      console.error("Error opening database:", error);
    }
    
  }

  const AddComments = async (e) => {
    e.preventDefault();
    //const id = uid();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const msg = textInputRef.current.value;

    //Realtime database add
    //set(ref(db, `comments/${id}`), { id, name, email, msg });

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        name,
        email,
        msg,
      });

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      textInputRef.current.value = "";
      console.log("docRef", docRef.id);
    } catch (error) {
      console.error("Chyba pri pridávaní komentára:", error);
    }
  };

  const deleteComment = async (id) => {
    //Realtime database delete
     //remove(ref(db, `comments/${comment.id}`));

     //Firestore
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
  };

  

  return (
    <div className="container">
      
      <h1>Comments from our users.</h1>
      <p>Example for Firebase - Firestore database</p>
      <div className="form-box">
        <h2>Add comments</h2>
        <form>
          <div>
            <label htmlFor="name" className="form-label">
              Name:
              <input type="text" id="name" ref={nameInputRef} />
            </label>
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email:
              <input type="text" id="email" ref={emailInputRef} />
            </label>
          </div>
          <div>
            <label htmlFor="body" className="form-label">
              Message:
              <textarea
                id="body"
                rows="4"
                cols="50"
                ref={textInputRef}
              ></textarea>
            </label>
          </div>
          <button onClick={AddComments}>Add comment</button>
        </form>
      </div>

      <h2>Comments</h2>
      {data.map((comment) => (
        <div className="comment-container" key={comment.id}>
          <div className="avatar-box">
            <img src={Avatar} alt="user-avatar" />
          </div>
          <div className="comment-box">
            <p className="comment-name">
              <b>{comment.name}</b>
            </p>
            <p>
              <b>{comment.email}</b>
            </p>
            <p>{comment.msg}</p>
          </div>
          <div>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;

//https://www.youtube.com/watch?v=azdwN_4IDKA&t=36s
//https://www.youtube.com/watch?v=UYjntA5btvk&list=PLD8nQCAhR3tTXYOhau-RTfZQ4uGvco7XQ&index=16
// https://www.youtube.com/watch?v=uVPtYLGPL80&list=PLqFvlDFoiZ-2SAX7YXCYtb28K4IooCIlS&index=4

/*** Pre konfiguraciu Firebase - realtime database do useffect****/
// onValue(ref(db), (snapshot) => {
//   const dataDB = snapshot.val();
//   setData([]);
//   console.log("dataDB", dataDB);

//   if (dataDB !== null) {
//     Object.values(dataDB.comments).map((comment) => {
//       setData((oldComment) => [...oldComment, comment]);
//     });
//   }

/**/
//  onSnapshot(collection(dbStore, "comments"), (snapshot) => {
//   const comments = snapshot.docs.map((comment) => {
//     const data = comment.data();
//     const id = comment.id;
//     console.log('id', id);
//     return { ...data, id };
//   });
//   console.log('comments', comments);
//   if (comments !== null) {
//     setData(comments);
//   }
// });

//useEffect(() => {
// const commentsData = onSnapshot(collection(dbStore, "comments"), (snapshot) => {
//   const comments = [];
//   snapshot.forEach((doc) => {
//     comments.push(doc.data());
//   });
//   setData(comments)

// });
// return () => {commentsData()};

/*** Pre konfiguraciu Firebase - realtime database****/
// onValue(ref(db), (snapshot) => {
//   const dataDB = snapshot.val();
//   setData([]);
//   console.log("dataDB", dataDB);

//   if (dataDB !== null) {
//     Object.values(dataDB.comments).map((comment) => {
//       setData((oldComment) => [...oldComment, comment]);
//     });
//   }

//   if(dataDB !== null) {
//     const arrayData = Object.entries(dataDB.comments).map(([key, value])=> ({
//       idKey: key,
//       id: value.id,
//       name: value.name,
//       email: value.email,
//       msg: value.msg,
//       //imgAvatar: value.imgAvatar
//     }));
//     console.log('arrayData',arrayData);
//     setData(arrayData);
//   }
//});

//}, []);

/*Direct Fetch*/
//const [comments, setComments] = useState([]);
//{comments.map(x => {
//  return <p key={x.id}>{x.email}</p>
//})}
// const fetchUrl =
//   "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app/comments.json";

// useEffect(() => {
//   const fetchData = async () => {
//     const result = await fetch(fetchUrl).then((response) => response.json());
//     console.log("result", result);
//     let dataArray = [];
//     for (var key in result) {
//       dataArray.push(result[key]);
//       console.log("dataArray", dataArray);
//     }
//     setComments(dataArray);
//   };
//   fetchData();
// }, []);
