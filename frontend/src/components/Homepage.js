import React, { useState, useEffect, useContext } from "react";
import HeaderForHome from "./HeaderForHome";
import axios from "axios";
import { CartStore } from "./CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import ProductCard from "./Card";
import Alert from "@mui/material/Alert";
import banner from "../media/flipkart-e1619775124176.jpg";
import { auth } from "../auth/firebase";
function Homepage() {
  const navTo = useNavigate();
  const util = useContext(CartStore);

  console.log(util.isLoggedIn);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user);
        util.setLoggedIn(user);
    });
  }, []);

  const inCart = JSON.parse(localStorage.getItem("cart"));
  const url =
    "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products";
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let data = await (await axios.get(url)).data;
      // console.log(data);
      setData(data);
      // console.log(data)

      if (data != null) {
        let home = (
          <div className="productCont">
            {data.map((d) => (
              <ProductCard key={d.id} d={d} data={data} homeFunc={homeFunc} />
            ))}
          </div>
        );
        util.setHomeCont(home);
      }
    }
    fetchData();
  }, []);
  const handleAddCartClick = (data) => {
    setSuccess(true);
    console.log("handleAddCartClick");

    let cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(localStorage.getItem("cart"))
    if (cart == undefined) {
      cart = {};
    }
    data = { ...data, qty: 1 };
    // console.log(data);
    cart[data.id] = data;
    localStorage.setItem("cart", JSON.stringify(cart));
    util.setIncartState(cart);
    setTimeout(() => {
      setSuccess(false);
      console.log("setted");
    }, 2000);
  };
  const handleViewCartClick = () => {
    console.log("handleViewCartClick");

    navTo("/cart");
  };
  const handleViewProduct = (e, data) => {
    // console.log('handleViewProduct');
    // console.log(data);
    if (data == null) return;
    const id = e.target.getAttribute("val");
    util.setCurrProduct(data[id - 1]);
    localStorage.setItem("cp", JSON.stringify(data[id - 1]));
    navTo(`/product`);
  };
  const homeFunc = {
    handleAddCartClick,
    handleViewProduct,
    handleViewCartClick,
    inCart,
  };

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Item added to cart!
      </Alert>
    </div>
  );

  return (
    <>
      {/* {util.isLoggedIn ? ( */}
        <div>
          <HeaderForHome data={data} homeFunc={homeFunc} />
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          {success && cartAlert}
          {util.homeCont}
        </div>
      {/* ) : (
        <div className="productCont">
          <span className="loader"></span>
        </div>
      )} */}
    </>
  );
}

export default Homepage;
