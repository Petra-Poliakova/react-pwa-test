import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Comments from "./pages/Comments";
import Nav from "./Nav";
import PushNotification from "./pages/PushNotification";

function App() {
  if (!("Notification" in window)) {
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
        <Route path="/PushNotification" element={<PushNotification />}></Route>
      </Routes>
    </>
  );
}

export default App;
