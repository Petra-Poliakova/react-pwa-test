import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {uid} from 'uid';
import { set, ref, onValue } from "firebase/database";

import Avatar from "../images/avatar.png";
import "../index.css";

function Comments() {
  const [comments, setComments] = useState('');
  const [data, setData] = useState([]);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const textInputRef = useRef();

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
          //imgAvatar: value.imgAvatar
        }));
        console.log('arrayData',arrayData);
        setData(arrayData);
      }
   });
  }, []);

  console.log('arrayData-data',data)

   const AddComments = (e) => {
    e.preventDefault();
    const id = uid();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const msg = textInputRef.current.value;

    set(ref(db, `/${id}`), {
     id, name, email, msg 
    });

    nameInputRef.current.value = '';
    emailInputRef.current.value = '';
    textInputRef.current.value = '';

    // if (comments.trim() !== '') {
    //   const newComment = {
    //     id, name, email, msg
    //   }
    // }
   }

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
      <h2>Add comments</h2>
      <form>
        <div>
          <label for="name">Name: </label>
          <input type="text" id="name" ref={nameInputRef} placeholder="Your fullname" />
        </div>
        <div>
          <label for="email">Email: </label>
          <input type="text" id="email" ref={emailInputRef} placeholder="Your Email" />
        </div>
        <div>
        <label for="body">Message: </label>
        <textarea id="body" rows="4" cols="50" ref={textInputRef} ></textarea>
        </div>
        <button onClick={AddComments}>Add comments</button>
      </form>
      <h2>Comments</h2>
      {data.map((comment) => (
        <div className="comment-container" key={comment.id}>
          <div className="avatar-box">
            <img src={Avatar} alt="user-avatar" />
          </div>
          <div className="comment-box">
            <p className="comment-name"><b>{comment.name}</b></p>
            <p><b>{comment.email}</b></p>
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;

//https://www.youtube.com/watch?v=azdwN_4IDKA&t=36s
//https://www.youtube.com/watch?v=UYjntA5btvk&list=PLD8nQCAhR3tTXYOhau-RTfZQ4uGvco7XQ&index=16

// import React, { useRef, useState } from 'react';

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const todoInputRef = useRef();
//   const priorityInputRef = useRef();

//   const addTodo = (event) => {
//     event.preventDefault();
//     const todo = todoInputRef.current.value;
//     const priority = priorityInputRef.current.value;
//     if (todo.trim() !== '') {
//       const newTodo = {
//         id: Date.now(),
//         todo,
//         priority
//       };
//       setTodos((prevTodos) => [...prevTodos, newTodo]);
//       todoInputRef.current.value = '';
//       priorityInputRef.current.value = '';
//     }
//   };

//   const deleteTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <form onSubmit={addTodo}>
//         <input type="text" placeholder="Todo" ref={todoInputRef} />
//         <input type="text" placeholder="Priority" ref={priorityInputRef} />
//         <button type="submit">Add Todo</button>
//       </form>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {todo.todo} - {todo.priority}
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;
