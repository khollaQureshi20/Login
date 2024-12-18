import React, { useState } from "react";
import "./table.css";

export const GlobalFilter = ({ filter, setFilter, columns }) => {
  const [selectedColumn, setSelectedColumn] = useState("id");

  
  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  
  const handleSearchChange = (e) => {
 
    const value = e.target.value;
    setFilter(value || "");  
  };

  return (
    <div className="search-container">
      <label htmlFor="column-select">Search Column:</label>
      <select id="column-select" value={selectedColumn} onChange={handleColumnChange}>
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.Header}
          </option>
        ))}
      </select>

      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        value={filter || ""}
        onChange={handleSearchChange}
        placeholder={`Search ${selectedColumn}`}
      />
    </div>
  );
};
