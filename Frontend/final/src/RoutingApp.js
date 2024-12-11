import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ShowProducts from "./App";
import CartCheckout from "./CartCheckout";
import PurchaseInfo from "./PurchaseInfo";
import ProductDetail from "./ProductDetail";
import Home from "./Home";
import Author from "./Author";

function RoutingApp() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [cartTotal, setCartTotal] = useState(() => JSON.parse(localStorage.getItem('cartTotal')) || 0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/listproducts");
      const data = await response.json();
      setCatalog(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = () => {
      let totalAmount = 0;
      for (let i = 0; i < cart.length; i++) {
        totalAmount += cart[i].price;
      }
      setCartTotal(totalAmount);
    };
    total();
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
  }, [cart, cartTotal]);

  return (
      <Routes>
        <Route path="/" element={<Home catalog={catalog} />} />
        <Route path="/about" element ={<Author/>} /> 
        <Route path="/product" element={<ShowProducts catalog={catalog} cart={cart} setCart={setCart} cartTotal={cartTotal} />} />
        <Route path="/checkout" element={<CartCheckout />} />
        <Route path="/purchase" element={<PurchaseInfo />} />
        <Route path="/product/:id" element={<ProductDetail catalog={catalog} cart={cart} setCart={setCart} cartTotal={cartTotal} />} />
      </Routes>
  );
}

export default RoutingApp;
