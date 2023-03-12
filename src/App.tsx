import React, { useState, useMemo } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import { UserContext } from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 mb-3">
        <ul className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/logout">Save & Exit</Link>
          </li>
        </ul>
      </nav>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
