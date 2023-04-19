import React, { useContext, useState } from "react";
import { CartStore } from "./CartContext";
import Homepage from "./Homepage";
import Productpage from "./Productpage";
import Cartpage from "./Cartpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginProvider";
import Checkout from "./product/Checkout";

function CartProvider() {
  const inCart = localStorage.getItem("cart")!=undefined? JSON.parse(localStorage.getItem("cart")) :{};
  console.log(localStorage.getItem("cp"));
  let cp = localStorage.getItem("cp")!='undefined' ? JSON.parse(localStorage.getItem("cp")) : {};
  // const cp = {};
  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  const [inCartState, setIncartState] = useState(inCart);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [currProduct, setCurrProduct] = useState(cp);
  const [homeCont, setHomeCont] = useState(loadCircle);
  const [checkoutFrom, setCheckoutFrom] = useState('cart');
  const [clicked, setClick] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const cartUtil = {
    inCartState,
    setIncartState,
    checkoutModal,
    setCheckoutModal,
    currProduct,
    setCurrProduct,
    homeCont,
    setHomeCont,
    checkoutFrom,
    setCheckoutFrom,
    clicked,
    setClick,
    isLoggedIn,
    setLoggedIn,
  };
  return (
    <CartStore.Provider value={cartUtil}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/product" element={<Productpage />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </Router>
    </CartStore.Provider>
  );
}

export default CartProvider;
