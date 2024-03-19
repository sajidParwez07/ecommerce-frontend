import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MyCart from "./user/cart";
import MyHome from "./user/home";
import MyLogin from "./user/login";
import Register from "./user/register";

function UserApp() {
  return (
    <HashRouter>
        <Routes>
            <Route exact path="/" element={<MyHome/>} />
            <Route exact path="/cart" element={<MyCart/>} />
            <Route exact path="/login" element={<MyLogin/>} />
            <Route exact path="/register" element={<Register/>} />
        </Routes>
    </HashRouter>
      
      ); 
}

export default UserApp;
