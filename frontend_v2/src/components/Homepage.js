import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import HeaderForHome from "./HeaderForHome";
import axios from "axios";
import { CartStore } from "./CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProductCard from "./Card";
import Alert from "@mui/material/Alert";
import banner from "../media/flipkart-e1619775124176.jpg";
import { auth } from "../auth/firebase";

function Homepage() {
  const navTo = useNavigate();
  const util = useContext(CartStore);
  useEffect(() => {
    if (!localStorage.getItem("flipkartToken")) navTo("/login");
  }, [localStorage.getItem("flipkartToken")]);

  const url = "http://localhost:8080/api/products";

  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("flipkartToken");
    // console.log(token);
    if(token){
      async function fetchData() {
        try {
          let data = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // axios.get()
          // console.log(data.data);
          setData(data.data);
          // console.log(data)
        } catch (err) {
          console.log({ err });
        }
      }
  
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data != null) {
      let home = (
        <>
          {util.text.length == 0 && (
            <>
              {" "}
              <h1 class="heading">New Arrivals</h1>
              <div className="productCont">
                {data.map((d, indx) =>
                  indx > 7 && indx < 16 ? (
                    <ProductCard key={d._id} d={d} />
                  ) : null
                )}
              </div>
            </>
          )}
          <h1 class="heading">All Products</h1>
          <div className="productCont">
            {data.map((d) => (
              <ProductCard key={d._id} d={d} />
            ))}
          </div>
        </>
      );
      util.setHomeCont(home);
    }
  }, [data]);

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Item added to cart!
      </Alert>
    </div>
  );

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );

  return (
    <>
      {localStorage.getItem("flipkartToken") ? (
        <div>
          <HeaderForHome data={data} />
          {util.text.length == 0 && (
            <>
              <div className="banner">
                <img src={banner} alt="" />
              </div>
              <h1 class="heading">Our Collections</h1>
              <div class="category-selector">
                <Link to="/men" style={{ display: "contents" }}>
                  <div class="category-image">
                    <img
                      src="https://bucolic-capybara-004125.netlify.app/assets/shop-men-52c01804.jpg"
                      alt=""
                    />
                  </div>
                </Link>
                <Link to="/women" style={{ display: "contents" }}>
                  <div class="category-image">
                    <img
                      src="https://bucolic-capybara-004125.netlify.app/assets/shop-women-e366dd38.jpg"
                      alt="Female Category"
                    />
                  </div>
                </Link>
                {/* <Link to="/jewelery" style={{ display: "contents" }}>
                <div class="category-image">
                  <img
                    src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2023/4/18/5ceb76a4-f4b8-499f-ad83-3505b0c555361681815057259-Shop-By-Category_23.jpg"
                    alt=""
                  />
                </div>
              </Link>
              <Link to="/electronics" style={{ display: "contents" }}>
                <div class="category-image">
                  <img
                    src="https://n4.sdlcdn.com/imgs/i/1/o/electronics-7e68c.jpg"
                    alt="Female Category"
                  />
                </div>
              </Link> */}
              </div>
            </>
          )}
          {util.success && cartAlert}
          {util.homeCont}
        </div>
      ) : (
        loadCircle
      )}
    </>
  );
}

export default Homepage;
