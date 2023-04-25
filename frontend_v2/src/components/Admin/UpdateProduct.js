import React, { useState } from "react";
import axios from "axios";
import Footer from "../Footer";
import Header from "./Header";

const AddProduct = ({ product }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let obj = {};
    if (formValues.title) obj.title = formValues.title;
    if (formValues.price) obj.price = formValues.price;
    if (formValues.description) obj.description = formValues.description;
    if (formValues.image) obj.image = formValues.image;

    // TODO: Submit form data to the backend
    const response = await axios.patch(`/api/products/${product._id}`, obj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
      },
    });
    const data = await response.json();
    console.log(data);

    // Reset form after successful submission
    setFormValues({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  return (
    <>
      <Header />
      <div>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="title"
              value={formValues.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={formValues.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={formValues.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              value={formValues.image}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
