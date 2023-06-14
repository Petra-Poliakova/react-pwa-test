import React, { useEffect, useState } from "react";

import "../index.css";

const Filter = () => {
  const [data, setData] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filteredData, setFilteredData] = useState(data);

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

  const handleFilter = () => {
    const filteredData = data.filter(item => {
      const nameMatch = item.title.toLowerCase().includes(filterTitle.toLowerCase());
      const brandMatch = item.brand.toLowerCase().includes(filterBrand.toLowerCase());
      const categoryMatch = item.category.toLowerCase().includes(filterCategory.toLowerCase());
      const priceMatch = item.price.toString().includes(filterPrice);
      
      return nameMatch && categoryMatch && priceMatch && brandMatch;
    });

    setFilteredData(filteredData);
  };

  const handleClearFilter = () => {
    setFilterTitle('');
    setFilterBrand('');
    setFilterCategory('');
    setFilterPrice('');
    setFilteredData(data);
  };

  return (
    <div>
      <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterTitle}
        onChange={e => setFilterTitle(e.target.value)}
      />
     
     
      <input
        type="text"
        placeholder="Filter by brand"
        value={filterBrand}
        onChange={e => setFilterBrand(e.target.value)}
      />
       <input
        type="text"
        placeholder="Filter by category"
        value={filterCategory}
        onChange={e => setFilterCategory(e.target.value)}
      />
       <input
        type="text"
        placeholder="Filter by price"
        value={filterPrice}
        onChange={e => setFilterPrice(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleClearFilter}>Clear Filter</button>
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
