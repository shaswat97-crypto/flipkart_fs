import React, { useState } from "react";
import axios from "axios";
import "./addproduct.css";
import { Alert } from "@mui/material";

const AddProduct = ({ product, loading, setLoading, handleClose }) => {
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
    event.preventDefault();
    setLoading(true);
    let obj = {};
    if (formValues.title) obj.title = formValues.title;
    if (formValues.price) obj.price = formValues.price;
    if (formValues.description) obj.description = formValues.description;
    if (formValues.image) obj.image = formValues.image;

    // console.log(obj);
    const id=product._id

    // TODO: Submit form data to the backend
    const response = await axios.patch(
      `/api/products/${product._id}`,
      {obj, id},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
        },
      }
    );
    const data = await response.data;
    console.log(data);

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
      handleClose();
    }, 1000);
  };

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Product updated successfully!
      </Alert>
    </div>
  );

  return (
    <div className="ap">
      {loading && cartAlert}
      <div>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="label">
            <label htmlFor="price">Price:</label>
            <input
              name="price"
              type="text"
              id="price"
              value={formValues.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="label">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formValues.description}
              onChange={handleInputChange}
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
            />
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
