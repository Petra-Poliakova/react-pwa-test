import React, { useState, useEffect, useRef } from "react";
import db from "../firebase/firestore";
//import {db} from "../firebase/firebase";
import { uid } from "uid";
//import { set, ref, onValue, remove } from "firebase/database";

import {getCommentsFromDB, saveCommentToDB, deleteCommentFromDB} from '../helper/indexedDB'
//import { openDB } from "idb";

import Avatar from "../images/avatar.png";
import "../index.css";
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";

// const dbPromise = openDB('my-database', 1, {
//   upgrade(db) {
//     db.createObjectStore('comments', { keyPath: 'id' });
//     //const store = db.createObjectStore('comments', { keyPath: 'id' });
//     //store.createIndex('by_id', 'id', { unique: true });
//   },
// });

function Comments() {
  
  const [data, setData] = useState([]);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const textInputRef = useRef();

 
  useEffect(() => {
    async function fetchDataFromIndexedDB() {
      const indexedDBData = await getCommentsFromDB();
      setData(indexedDBData);
    }
  
    fetchDataFromIndexedDB();
    fetchFirestoreData();
    //fetchData();
  }, []);



  //const fetchFirebaseData = () => {
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

//   const fetchData = async() =>{
  
//   // Firestore - načítanie komentárov
//   onSnapshot(collection(db, "comments"), (snapshot) => {
//    const comments = snapshot.docs.map((comment) => ({
//      ...comment.data(),
//      id: comment.id,
//    }));
//    //console.log('comments',comments )
//    if (comments !== null) {
//      setData(comments);
//      }
//  });
//   }

// const fetchData = async () => {
//   try {
//     const db = await dbPromise;
//     const transaction = db.transaction('comments', 'readonly');
//     const store = transaction.objectStore('comments');
//     //const index = store.index('by_id');
//     //const comments = await index.getAll();
//     const comments = await store.getAll();

//     if (comments && comments.length > 0) {
//       setData(comments);
//     } else {
//       fetchFirestoreData();
//     }
//   } catch (error) {
//     console.error('Chyba pri načítaní dát z IndexedDB:', error);
//     fetchFirestoreData();
//   }
// };

const fetchFirestoreData = () => {
  onSnapshot(collection(db, 'comments'), (snapshot) => {
    const comments = snapshot.docs.map((comment) => ({
      ...comment.data(),
      id: comment.id,
    }));
    setData(comments);
    saveCommentToDB(comments);
    //saveDataToIndexedDB(comments);
  });
};

// const saveDataToIndexedDB = async (data) => {
//   const db = await dbPromise;
//   const tx = db.transaction('comments', 'readwrite');
//   const store = tx.objectStore('comments');
//   await store.clear();
//   data.forEach((comment) => store.add(comment));
//   await tx.done;
// };

  const AddComments = async (e) => {
    e.preventDefault();
    const id = uid();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const msg = textInputRef.current.value;

    //Realtime database add
    //set(ref(db, `comments/${id}`), { id, name, email, msg });

    try {
      await addDoc(collection(db, "comments"), { name, email, msg , id});
       //const docRef = await addDoc(collection(db, "comments"), { name, email, msg, id });

      const comments = { id, name, email, msg };

      saveCommentToDB(comments);
      
      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      textInputRef.current.value = "";

      //console.log("docRef", docRef.id);
    } catch (error) {
      console.error("Chyba pri pridávaní komentára:", error);
    }
    
    
  };
  
  // const AddComments = async (e) => {
  //   e.preventDefault();
  //   const name = nameInputRef.current.value;
  //   const email = emailInputRef.current.value;
  //   const msg = textInputRef.current.value;
  
  //   try {
  //     const docRef = await addDoc(collection(db, 'comments'), { name, email, msg, });

  //     //saveCommentToIndexedDB(docRef);
  
  //     nameInputRef.current.value = '';
  //     emailInputRef.current.value = '';
  //     textInputRef.current.value = '';
  //     //console.log('docRef', docRef.id);
  //   } catch (error) {
  //     console.error('Chyba pri pridávaní komentára:', error);
  //   }
  // };
  

  // const saveCommentToIndexedDB = async (comment) => {
  //   try {
  //   const db = await dbPromise;
  //   const tx = db.transaction('comments', 'readwrite');
  //   const store = tx.objectStore('comments');
  //   await store.add(comment);
  //   await tx.done;
  // } catch (error) {
  //   console.error('Chyba pri ukladaní komentára do IndexedDB:', error);
  // }
  // };

  const deleteComment = async (id) => {
    //Realtime database delete
     //remove(ref(db, `comments/${comment.id}`));

     //Firestore
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);

    deleteCommentFromDB(id);
  };

  // const deleteComment = async (id) => {
  //   try {
  //     //const db = await dbPromise;
  //     // Firestore
  //     const docRef = doc(db, 'comments', id);
  //     await deleteDoc(docRef);
  
  //     // IndexedDB
  //     const dbS = await dbPromise;
  //     const tx = dbS.transaction('comments', 'readwrite');
  //     const store = tx.objectStore('comments');
  //     await store.delete(id);
  //     await tx.done;
  //   } catch (error) {
  //     console.error('Chyba pri mazaní komentára:', error);
  //   }
  // };

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
