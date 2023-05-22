import React, {useState, useEffect} from 'react'

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
      <div className="App">
        
          <h1>Comments</h1>
        
        {data.map(comment => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p>{comment.email}</p>
           <p>{comment.body}</p>
          </div>
        ))}
      </div>
    );
  }

export default Comments