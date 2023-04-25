import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
const ProductsList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // Fetch products data from server
    // Set products state
    const fetchData = async () => {
      const res = axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
        },
      });
      setProducts(res.data);
    };
    fetchData();
  }, []);

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  return (
    <>
      {products ? (
        <div>
          <h2>All Products</h2>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        loadCircle
      )}
    </>
  );
};

export default ProductsList;
