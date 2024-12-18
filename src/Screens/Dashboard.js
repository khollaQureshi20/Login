import React, { useState, useEffect } from "react";
import "../Style/dashboard.css";

const Dashboard = () => {
  const [searchCategory, setSearchCategory] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState([]);

  const categories = ["name", "email", "phone", "landline", "city", "address"];

  const handleSearch = () => {
    const filtered = userData.filter((item) =>
      item[searchCategory]?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const loadData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/getuser`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []); 

  const resultsToDisplay = filteredData.length > 0 ? filteredData : userData;

  return (
    <div className="filter-container">
      <h3>Search Data</h3>
      <div className="filter-options">
        <div className="filter-group">
          <label>Select Category:</label>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder={`Enter ${searchCategory}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="filter-group" style={{ marginTop: "24px" }}>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      <div className="selected-filters">
        <h4>Search Results:</h4>
        {resultsToDisplay.length > 0 ? (
          <ul>
            {resultsToDisplay.map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.name}, <strong>Email:</strong>{" "}
                {item.email}, <strong>Number:</strong> {item.number},{" "}
                <strong>Landline:</strong> {item.landline}, <strong>City:</strong>{" "}
                {item.city}, <strong>Address:</strong> {item.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
