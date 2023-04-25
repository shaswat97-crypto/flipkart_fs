import React, { useContext, useState, useEffect } from "react";
import { CartStore } from "./CartContext";
import Homepage from "./Homepage";
import Productpage from "./Productpage";
import Cartpage from "./Cartpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginProvider";
import Checkout from "./product/Checkout";
import Footer from "./Footer";
import Women from "./Women";
import Men from "./Men";
import Jewelery from "./Jewelery";
import Electronics from "./Electronics";
import axios from "axios";

function CartProvider() {
  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [homeCont, setHomeCont] = useState(loadCircle);
  const [checkoutFrom, setCheckoutFrom] = useState("cart");
  const [clicked, setClick] = useState(false);
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [success, setSuccess] = useState(false);

  async function fetchCart() {
    try {
      let c = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
        },
      });
      console.log(c.data);
      setRows(c.data);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchCart();
  }, [fetch]);

  const cartUtil = {
    checkoutModal,
    setCheckoutModal,
    homeCont,
    setHomeCont,
    checkoutFrom,
    setCheckoutFrom,
    clicked,
    setClick,
    text,
    setText,
    rows,
    setRows,
    fetch,
    setFetch,
    success,
    setSuccess,
  };
  return (
    <CartStore.Provider value={cartUtil}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewelery" element={<Jewelery />} />
        </Routes>
        <a style={{ textDecoration: "none" }} href="#">
          <Footer />
        </a>
      </Router>
    </CartStore.Provider>
  );
}

export default CartProvider;
