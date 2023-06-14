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
            to="/Filter"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Filter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/CloneDeepTest"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            CloneDeepTest
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/TableFilter"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Table filter
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
