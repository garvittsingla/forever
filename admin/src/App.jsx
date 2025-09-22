import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route,Navigate } from "react-router-dom";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import List from "./pages/List";
import Login from "./components/Login";

export const backendUrl = "http://localhost:4000";
export const currency = "$"

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-none h-[1px] bg-gray-200" />
          <div className="flex w-full">
            <Sidebar setToken={setToken} />
            <div className="w-[70%] mx-auto ml-[max(5vw,25p)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/add" />} />
                <Route path="/add" element={<Add token = {token} />} />
                <Route
                  path="/orders"
                  element={<Orders token = {token} />}
                />
                <Route path="/list" element={<List token = {token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
