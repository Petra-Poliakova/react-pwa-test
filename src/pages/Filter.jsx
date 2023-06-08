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
