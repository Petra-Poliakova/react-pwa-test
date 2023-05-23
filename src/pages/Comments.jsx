import React, {useState, useEffect} from 'react'

import Avatar from '../images/avatar.png'
import '../index.css';


function Comments() {
    const [data, setData] = useState([]);

    useEffect(()=>{
      const fetchData = async() => {
        const result = await fetch("https://jsonplaceholder.typicode.com/comments").then(
          response => response.json()
        )
        setData(result);
      }
      fetchData();
    }, [])
    return (
      <div>
          <h1>Comments from our users.</h1>
        {data.map(comment => (
          <div className='comment-container' key={comment.id}>
            <div className='avatar-box'><img src={Avatar} alt="user-avatar" /></div>
            <div className='comment-box'>
            <h2 className='comment-name'>{comment.name}</h2>
            <p>{comment.email}</p>
           <p>{comment.body}</p>
           </div>
          </div>
        ))}
      </div>
    );
  }

export default Comments