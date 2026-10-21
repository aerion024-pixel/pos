import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Route A: A
import Login from "./pages/Login";

import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import ListUser from "./pages/user/List";
import CategoryPage from "./pages/category/List";
import ProductPage from "./pages/product/List";
import ListTransaction from "./pages/transaction/List";
import FormTransaction from "./pages/transaction/Form";
import PrintTransaction from "./pages/transaction/print"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/user" element={<ListUser />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/transaction" element={<ListTransaction />}></Route>
          <Route path="/transaction/create" element={<FormTransaction />}></Route>
          <Route path="/transaction/print" element={<PrintTransaction />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
