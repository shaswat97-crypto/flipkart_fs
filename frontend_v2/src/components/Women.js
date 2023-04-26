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
  if(!localStorage.getItem("flipkartToken")) navTo('/login');

  const url = "http://localhost:8080/api/products";
  
  const [data, setData] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("flipkartToken");
    // console.log(token);
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
  }, []);

  useEffect(() => {
    if (data != null) {
      let home = (
        <div className="productCont">
          {data.map((d) => (
           d.category == "women's clothing" ? 
           <ProductCard key={d._id} d={d} /> : null
         ))}
        </div>
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

  return (
    <>
      {/* {util.isLoggedIn ? ( */}
      <div>
        <HeaderForHome data={data} />
        <div className="banner">
        <img src="https://i.pinimg.com/originals/ae/8b/a7/ae8ba78b7be130e1afdf659947735128.jpg" alt="" />
        </div>
        {util.success && cartAlert}
        {util.homeCont}
      </div>
    </>
  );
}

export default Homepage;

