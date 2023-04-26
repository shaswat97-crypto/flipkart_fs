import React, { useState } from "react";
import axios from "axios";
import "./addproduct.css";
import { Alert } from "@mui/material";

const AddProduct = ({ loading, setLoading }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log({ name }, { value });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // TODO: Submit form data to the backend
    const response = await axios.post(
      "/api/products",
      {
        ...formValues,
        rating: {
          rate: 0,
          count: 0,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
        },
      }
    );
    const data = await response.data;
    console.log({data});

    // Reset form after successful submission
    setFormValues({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Product added successfully!
      </Alert>
    </div>
  );

  return (
    <div className="ap">
      {loading && cartAlert}
      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              required='true'
            />
          </div>
          <div className="label">
            <label htmlFor="price">Price:</label>
            <input
              name="price"
              type="number"
              id="price"
              value={formValues.price}
              onChange={handleInputChange}
              required='true'
            />
          </div>
          <div className="label">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formValues.description}
              onChange={handleInputChange}
              required='true'
            />
          </div>
          <div className="label">
            <label htmlFor="category">Category:</label>
            <input
              name="category"
              type="text"
              id="category"
              value={formValues.category}
              onChange={handleInputChange}
              required='true'
            />
          </div>
          <div className="label">
            <label htmlFor="image">Image URL:</label>
            <input
              name="image"
              type="text"
              id="image"
              value={formValues.image}
              onChange={handleInputChange}
              required='true'
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
