import React, { useState, useEffect, useRef, useCallback } from "react";
import db from "../firestore";
//import db from "../firebase";
//import { uid } from "uid";
//import { set, ref, onValue, remove } from "firebase/database";

import Avatar from "../images/avatar.png";
import "../index.css";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  addCommentToDB,
  deleteCommentFromDB,
  getCommentsFromDB,
} from "../helper/indexedDB";

function Comments() {
  const [data, setData] = useState([]);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const textInputRef = useRef();

  // useCallback(() => {
  //   // Načítanie komentárov z Firestore
  //   const loadCommentsFromFirestore = async () => {
  //     // Načítajte komentáre z Firestore
  //     const firestoreComments = await loadCommentsFromFirestore(); // Upravte túto časť podľa vášho kódu

  //     // Uložte komentáre do IndexedDB
  //     for (const comment of firestoreComments) {
  //       await addCommentToDB(comment);
  //     }

  //     // Načítajte komentáre z IndexedDB
  //     const indexedDBComments = await getCommentsFromDB();
  //     console.log("Komentáre z IndexedDB:", indexedDBComments);

  //     // Použite načítané komentáre na potrebné účely
  //     // Napríklad, aktualizujte zobrazenie komentárov vo vašej aplikácii
  //   };
  //   loadCommentsFromFirestore();
  // }, []);

  useEffect(() => {
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
    onSnapshot(collection(db, "comments"), (snapshot) => {
      const comments = snapshot.docs.map((comment) => ({
        ...comment.data(),
        id: comment.id,
      }));
      //console.log('comments',comments )
      console.log("From Firestore");
      if (comments !== null) {
        setData(comments);
      }
    });
  }, []);

  if ("indexedDB" in window) {
    getCommentsFromDB("comments").then((idbData) => {
      if (data == null) {
        console.log("From cache");
        setData(idbData);
      }
    });
  }
  console.log("data", data);
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
    // remove(ref(db, `comments/${comment.id}`));
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="container">
      <h1>Comments from our users.</h1>
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
