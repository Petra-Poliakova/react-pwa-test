import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Comments from "./pages/Comments";
import Filter from "./pages/Filter";
import TableFilter from "./pages/TableFilter";
import Nav from "./Nav";

function App() {

  if(!('Notification' in window)) {
    //do something
    return;
  }
  return (
    <>
      <header>
        <Nav />
      </header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Comments" element={<Comments />}></Route>
        <Route path="/Filter" element={<Filter />}></Route>
        <Route path="/TableFilter" element={<TableFilter />}></Route>
      </Routes>
    </>
  );
}

export default App;
