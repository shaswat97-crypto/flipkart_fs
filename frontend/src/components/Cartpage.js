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

function Cartpage() {
  let bull = "a";
  const navTo = useNavigate();
  const util = useContext(CartStore);
  const rows = util.inCartState ? Object.values(util.inCartState) : [];
  const add = (e) => {
    // console.log('add')
    const id = e.target.getAttribute("val");
    // console.log(id);
    const obj = util.inCartState;
    obj[id] = { ...obj[id], qty: obj[id].qty + 1 };
    // console.log(obj);
    util.setIncartState({ ...obj });
    localStorage.setItem("cart", JSON.stringify(obj));
  };
  // console.log(qty)
  const subtract = (e) => {
    const id = e.target.getAttribute("val");
    const obj = util.inCartState;
    if (obj[id].qty == 1) delete obj[id];
    else obj[id] = { ...obj[id], qty: obj[id].qty - 1 };
    util.setIncartState({ ...obj });
    localStorage.setItem("cart", JSON.stringify(obj));
  };
  const handleCheckoutClick = () => {
    if (util.isLoggedIn) {
      util.setCheckoutFrom("cart");
      navTo("/checkout");
    } else {
      navTo("/login");
    }
  };
  const handleViewProduct = (e) => {
    // console.log('handleViewProduct');
    // console.log(data);
    const data = util.inCartState;
    // console.log(data)
    if (data == null || data == {}) return;
    const id = e.currentTarget.getAttribute("val");
    // console.log(data[id], id, e.currentTarget);
    util.setCurrProduct(data[id]);
    localStorage.setItem("cp", JSON.stringify(data[id]));
    navTo(`/product`);
  };
  const handleDelete = (e) => {
    // console.log('delete');
    // console.log(e.currentTarget.getAttribute('val'));
    const id = e.currentTarget.getAttribute("val");
    const obj = util.inCartState;
    delete obj[id];
    util.setIncartState({ ...obj });
    localStorage.setItem("cart", JSON.stringify(obj));
  };
  let total = 0;
  if (rows) {
    total = rows.reduce((acc, d) => {
      return acc + d.price * d.qty;
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
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    val={row.id}
                    onClick={handleViewProduct}
                    className="cartImgCont"
                  >
                    <div className="cartImg">
                      <img src={row.image} alt="" />
                    </div>
                    <div>{row.title}</div>{" "}
                  </div>
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <button val={row.id} onClick={subtract}>
                    -
                  </button>
                  &nbsp;{row.qty} &nbsp;
                  <button val={row.id} onClick={add}>
                    +
                  </button>
                </TableCell>
                <TableCell align="right">
                  <div val={row.id} onClick={handleDelete}>
                    <DeleteIcon />
                  </div>
                </TableCell>
                <TableCell align="right">
                  {(row.price * row.qty).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="bill">
          <Card sx={{ minWidth: 200, ml: "80%" }}>
            <CardContent sx={{ pb: 0, pr: 0 }}>
              {/* <Typography
              sx={{ fontSize: 22 }}
              color="text.secondary"
              gutterBottom
            >
              Final bill
            </Typography> */}
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
                {util.isLoggedIn ? "Checkout" : "Login to checkout"}
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
