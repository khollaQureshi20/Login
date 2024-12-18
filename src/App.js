import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import BasicTable from "./components/BasicTable";
import FilteringTable from "./components/FilteringTable";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   <Route path="/Dashboard" element={<Dashboard/>}/>
      
    //   </Routes>
    // </Router>
 
    <div style={{backgroundColor:'white'}}>
      <FilteringTable />
    </div>
  );
}

export default App;
