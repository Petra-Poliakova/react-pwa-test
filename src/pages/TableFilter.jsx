import React, { useMemo } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";

// Definícia údajov
const data = [
  {
    name: "John Doe",
    age: 25,
    gender: "Male",
  },
  {
    name: "Jane Smith",
    age: 30,
    gender: "Female",
  },
  // Pridať ďalšie údaje podľa potreby
];

// Definícia stĺpcov
const columns = [
  {
    Header: "Name",
    accessor: "name", // prístup k hodnote v dátach
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  // Pridaj ďalšie stĺpce podľa potreby
];

const TableFilter = () => {
  // Použitie react-table hookov
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  // Renderovanie komponentu
  return (
    <div>
      <input
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
      <table {...getTableProps()} style={{ marginTop: "1rem" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableFilter;
