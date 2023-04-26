import React, { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./product.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import UpdateProduct from './UpdateProduct'

const Product = ({ product, loading, setLoading, del, setDel }) => {
  const navto = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    // Handle delete functionality
    setDel(true);
    await axios.delete(`/api/products/${product._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
      },
    });
    setTimeout(() => {
      setDel(false);
    }, 1000);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  
  return (
    <div className="p">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price : {product.price}</p>
      <p>Category : {product.category}</p>
      <button onClick={handleOpen}>Edit</button>
      <button disabled={del} onClick={handleDelete}>
        Delete
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateProduct product={product} loading={loading} setLoading={setLoading} handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
};

export default Product;
