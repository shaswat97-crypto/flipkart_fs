import React, { useContext, useState } from "react";
import banner from "../media/flipkart-big-billion-day-bank &-wallet-offers.jpg";
import { CartStore } from "./CartContext";
import Header from "./Header";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useNavigate } from "react-router-dom";
import Checkout from "./product/Checkout";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Productpage() {
  const navTo = useNavigate();
  const util = useContext(CartStore);
  const product = util.currProduct;
  let incart = false;
  if (util.inCartState && util.inCartState[util.currProduct.id] != undefined) {
    incart = true;
  }
  // console.log(util.inCartState, util.currProduct.id)
  const handleBuyNow = () => {
    if (util.isLoggedIn) {
      util.setCheckoutFrom("page");
      navTo("/checkout");
    }
    else{
      navTo('/login');
    }
  };
  const [success, setSuccess] = useState(false);
  const handleAddCartClick = (product) => {
    setSuccess(true);
    if (!product || product == {}) return;
    console.log("handleAddCartClick");
    const str = localStorage.getItem("cart");
    let c = JSON.parse(new String(str));
    // console.log(c)
    if (c == undefined) {
      c = {};
    }
    product = { ...product, qty: 1 };
    // console.log(data);
    c[product.id] = product;
    localStorage.setItem("cart", JSON.stringify({ ...c }));
    util.setIncartState({ ...c });
    setTimeout(() => {
      setSuccess(false);
      console.log("setted");
    }, 2000);
  };

  const handleViewCartClick = () => {
    navTo("/cart");
  };
  // console.log(util);
  // console.log(product)
  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Item added to cart!
      </Alert>
    </div>
  );

  return (
    <div>
      <Header></Header>
      <div className="bannerProd">
        <img src={banner} alt="" />
      </div>
      {success && cartAlert}
      {/* <Dashboard></Dashboard> */}
      {product && product != "undefined" && Object.keys(product).length ? (
        <>
          <Box
            className="product"
            sx={{ flexGrow: 1, pt: 8, pb: 8, pl: 14, pr: 14 }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  <img src={product.image} alt="" />
                </div>
                <Stack spacing={2} direction="row" sx={{ pt: 4 }}>
                  {incart ? (
                    <Button variant="contained" onClick={handleViewCartClick}>
                      <ShoppingCartIcon></ShoppingCartIcon> &nbsp; view cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleAddCartClick(product)}
                    >
                      <ShoppingCartIcon></ShoppingCartIcon> &nbsp; add to cart
                    </Button>
                  )}
                  <Button
                    onClick={handleBuyNow}
                    color="success"
                    variant="contained"
                  >
                    <ElectricBoltIcon /> &nbsp; {util.isLoggedIn?'buy now':'login to buy'}
                  </Button>
                </Stack>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="dataCont">
                  <h3>{product.title}</h3>
                  <div className="chipCont">
                    <div className="chip">
                      <div>{product.rating.rate}</div>
                      <div>
                        &nbsp; <StarIcon />
                      </div>
                    </div>
                    <div className="chipCount">
                      &nbsp; ({product.rating.count})
                    </div>
                  </div>
                  <div className="price">
                    <h1>
                      {(
                        product.price -
                        product.price * (Number(product.id) * 0.01)
                      ).toFixed(2)}
                    </h1>
                    <h3>
                      <span style={{ textDecoration: "line-through" }}>
                        {product.price}
                      </span>{" "}
                      <span style={{ color: "green" }}>{product.id}% off</span>
                    </h3>
                  </div>
                  <div>{product.description}</div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <h1>Something went wrong...</h1>
      )}
    </div>
  );
}

export default Productpage;
