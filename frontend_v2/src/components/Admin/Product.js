import React, { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const navto = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Handle delete functionality
    await axios.delete(`/api/products/${product._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
      },
    });
    setLoading(false);
  };

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Deleting product!
      </Alert>
    </div>
  );

  const handleEdit = () => {
    // Handle edit functionality
    navto('/admin/updateproduct')
  };

  return (
    <div>
      {loading && cartAlert}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button disabled={loading} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Product;
