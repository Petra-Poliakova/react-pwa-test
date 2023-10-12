import React from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Comments"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Comments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/PushNotification"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Notification
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
