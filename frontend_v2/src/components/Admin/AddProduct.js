import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
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
    <div>
      <h2>Add Product</h2>
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
  );
};

export default AddProduct;
