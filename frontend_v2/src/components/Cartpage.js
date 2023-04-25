import React, { useContext, useState, useEffect } from "react";
import Bill from "./Bill";
import { CartStore } from "./CartContext";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Cartpage() {
  const navTo = useNavigate();
  const util = useContext(CartStore);
  const { fetch, setFetch } = useContext(CartStore);
  const { rows, setRows, fetchCart } = useContext(CartStore);

  const add = async (e) => {
    // console.log('add')
    setFetch(!fetch);
    const id = e.target.getAttribute("val");
    try {
      let cart = await axios.post(
        "/api/cart/incQty",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        }
      );
      console.log({ cart });
      fetchCart();
    } catch (err) {
      console.log({ err });
    }
  };

  const subtract = async (e) => {
    // console.log('add')
    setFetch(!fetch);

    const id = e.target.getAttribute("val");
    try {
      let cart = await axios.post(
        "/api/cart/decQty",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        }
      );
      console.log({ cart });
      fetchCart();
    } catch (err) {
      console.log({ err });
    }
  };

  const handleCheckoutClick = () => {
      navTo("/checkout");
  };

  const handleViewProduct = (id) => {
    // console.log('handleViewProduct');
    // console.log(data);
    // const data = util.inCartState;
    // // console.log(data)
    // if (data == null || data == {}) return;
    // const id = e.currentTarget.getAttribute("val");
    // // console.log(data[id], id, e.currentTarget);
    // util.setCurrProduct(data[id]);
    // localStorage.setItem("cp", JSON.stringify(data[id]));
    navTo(`/product/${id}`);
  };

  const handleDelete = async (e) => {
    setFetch(!fetch);
    const id = e.currentTarget.getAttribute("val");
    try {
      let cart = await axios.post(
        "/api/cart/delete",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        }
      );
      console.log({ cart });
      fetchCart();
    } catch (err) {
      console.log({ err });
    }
  };
  let total = 0;
  if (rows) {
    total = rows.reduce((acc, d) => {
      // console.log(d);
      return acc + d.product.price * d.quantity;
    }, 0);
  }

  let tax = total * 0.18;

  let cartTable;

  if (rows.length > 0) {
    cartTable = (
      <TableContainer
        sx={{ p: 4, pt: 0, pb: 0, width: "95vw" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Product</b>{" "}
              </TableCell>
              <TableCell align="right">
                <b>Price</b>{" "}
              </TableCell>
              <TableCell align="right">
                <b>Quantity</b>{" "}
              </TableCell>
              <TableCell align="right">
                <b>Remove</b>{" "}
              </TableCell>
              <TableCell align="right">
                <b>Total</b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    val={row.product._id}
                    onClick={() => handleViewProduct(row.product._id)}
                    className="cartImgCont"
                  >
                    <div className="cartImg">
                      <img src={row.product.image} alt="" />
                    </div>
                    <div>{row.product.title}</div>{" "}
                  </div>
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <button val={row.product._id} onClick={subtract}>
                    -
                  </button>
                  &nbsp;{row.quantity} &nbsp;
                  <button val={row.product._id} onClick={add}>
                    +
                  </button>
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} align="right">
                  <div val={row.product._id} onClick={handleDelete}>
                    <DeleteIcon />
                  </div>
                </TableCell>
                <TableCell align="right">
                  {(row.product.price * row.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="bill">
          <Card sx={{ minWidth: 200, ml: "80%" }}>
            <CardContent sx={{ pb: 0, pr: 0 }}>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                Subtotal : {total.toFixed(2)}
                <br />
                Tax : {tax.toFixed(2)}
              </Typography>
              <Typography variant="h5" component="div">
                Total : {(total + tax).toFixed(2)}
              </Typography>
              <Typography sx={{}} color="text.secondary">
                Inclusive of all taxes
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleCheckoutClick} size="small">
                "Checkout"
              </Button>
            </CardActions>
          </Card>
        </div>
      </TableContainer>
    );
  } else {
    cartTable = (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Cart is empty, continue shopping &nbsp;</h1>
          <Button onClick={() => navTo("/")} variant="contained">
            Go to home
          </Button>
        </div>
      </>
    );
  }
  // console.log(util.inCartState);
  return (
    <div>
      <Header></Header>
      {cartTable}
    </div>
  );
}

export default Cartpage;
