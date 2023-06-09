import React, { useEffect, useState } from "react";

import "../index.css";

const Filter = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products").then((res) =>
      res.json()
    );
    //.then((response) => setData(response.products))
    setData(response.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  //   const handleSearch = (e) => {
  //     setSearch(e.target.value);
  //   };

  //TypeError: value.toLowerCase is not a function

  //   const handleFilter = () => {
  //     const result = data.filter((value) => {
  //       if (typeof value === "string") {
  //         return value.toLowerCase().includes(search.toLowerCase());
  //       }
  //       return false; // Skip non-string values
  //     });
  //     setFilter(result);
  //   };
  //   useEffect(() => {
  //     handleFilter();
  //   }, [search, data]);

  return (
    <div>
      <table
        style={{
          width: "95%",
          borderCollapse: "collapse",
          margin: "25px auto",
        }}
      >
        <thead>
          <tr>
            <th className="tableHeaderStyle">Id</th>
            <th className="tableHeaderStyle">Title</th>
            <th className="tableHeaderStyle">Brand</th>
            <th className="tableHeaderStyle">Category</th>
            <th className="tableHeaderStyle">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="tableCellStyle">{item.id}</td>
              <td className="tableCellStyle">{item.title}</td>
              <td className="tableCellStyle">{item.brand}</td>
              <td className="tableCellStyle">{item.category}</td>
              <td className="tableCellStyle">€ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;

///Filter
// interface User {
//   id: number;
//   name: string;
//   age: number;
//   gender: string;
// }

// const users: User[] = [
//   { id: 1, name: 'John', age: 25, gender: 'male' },
//   { id: 2, name: 'Jane', age: 30, gender: 'female' },
//   { id: 3, name: 'Bob', age: 28, gender: 'male' },
//   { id: 4, name: 'Alice', age: 35, gender: 'female' },
// ];

// const filterUsersByName = (users: User[], name: string): User[] => {
//   return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
// };

// const filterUsersByAge = (users: User[], minAge: number, maxAge: number): User[] => {
//   return users.filter(user => user.age >= minAge && user.age <= maxAge);
// };

// const filterUsersByGender = (users: User[], gender: string): User[] => {
//   return users.filter(user => user.gender === gender);
// };

// const searchByName = 'Jane';
// const filteredUsers = filterUsersByName(users, searchByName);

// console.log(filteredUsers);
