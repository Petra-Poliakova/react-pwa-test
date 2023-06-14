import React, { useEffect, useState } from "react";

import "../index.css";

const Filter = () => {
  const [data, setData] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  //console.log(data);

  useEffect(() => {
    // Aktualizácia filtrovaných dát pri zmene pôvodných dát
    const filteredData = data.filter((item) => {
      const nameMatch = item.title
        .toLowerCase()
        .includes(filterTitle.toLowerCase());
      const brandMatch = item.brand
        .toLowerCase()
        .includes(filterBrand.toLowerCase());
      const categoryMatch = item.category
        .toLowerCase()
        .includes(filterCategory.toLowerCase());
      const priceMatch = item.price.toString().includes(filterPrice);

      return nameMatch && categoryMatch && priceMatch && brandMatch;
    });

    setFilteredData(filteredData);
  }, [data, filterTitle, filterBrand, filterCategory, filterPrice]);

  const handleClearFilterTitle = () => {
    setFilterTitle("");
  };
  const handleClearFilterBrand = () => {
    setFilterBrand("");
  };
  const handleClearFilterCategory = () => {
    setFilterCategory("");
  };
  const handleClearFilterPrice = () => {
    setFilterPrice("");
  };

  const handleClearAllFilter = () => {
    setFilterTitle("");
    setFilterBrand("");
    setFilterCategory("");
    setFilterPrice("");
    setFilteredData(data);
  };

  return (
    <div>
      <h1>Filter product</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          margin: "0 50px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <button onClick={handleClearFilterTitle}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by brand"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          />
          <button onClick={handleClearFilterBrand}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <button onClick={handleClearFilterCategory}>clear</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
        >
          <input
            type="text"
            placeholder="Filter by price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
          <button onClick={handleClearFilterPrice}>clear</button>
        </div>

        {/* <button onClick={handleFilter}>Filter</button> */}
        <button style={{ margin: "10px 0" }} onClick={handleClearAllFilter}>
          Clear All
        </button>
      </div>
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
          {filteredData.map((item, index) => (
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
