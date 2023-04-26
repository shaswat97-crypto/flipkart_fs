import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import "./productlist.css";
import { Alert } from "@mui/material";

const ProductsList = ({ loading, setLoading }) => {
  const [products, setProducts] = useState(null);
  const [del, setDel] = useState(false);
  useEffect(() => {
    // Fetch products data from server
    // Set products state
    if (!loading || !del) {
      const fetchData = async () => {
        const res = await axios.get("http://localhost:8080/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "flipkartAdminToken"
            )}`,
          },
        });
        const d = await res.data.reverse();
        console.log({d})
        setProducts(d);
      };
      fetchData();
    }
  }, [loading, del]);

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Product deleted successfully!
      </Alert>
    </div>
  );

  return (
    <>
      {products ? (
        <div className="pl">
          <h2>All Products</h2>
          {del && cartAlert}
          {products.length > 0 ? (
            products.map((product) => (
              <Product
                key={product._id}
                product={product}
                del={del}
                setDel={setDel}
                loading={loading}
                setLoading={setLoading}
              />
            ))
          ) : (
            <h2>No products found!</h2>
          )}
        </div>
      ) : (
        loadCircle
      )}
    </>
  );
};

export default ProductsList;
