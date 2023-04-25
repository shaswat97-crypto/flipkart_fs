import React, { useContext, useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Checkout from "./product/Checkout";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Productpage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const util = useContext(CartStore);
  const [success, setSuccess] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProduct() {
      try {
        let p = await axios.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        });
        // console.log(p.data);
        setProduct(p.data);

        let cart = await axios.get("/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        });
        // console.log(cart.data);
        cart = cart.data
        if (cart && cart.length > 0) {
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].product._id == id) {
              // console.log('incart')
              util.setIncart(true);
              break;
            }
          }
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getProduct();
  }, []);
 
  const handleBuyNow = () => {
    if (localStorage.getItem("flipkartToken")) {
      util.setCheckoutFrom("page");
      navTo("/checkout");
    }
    else{
      navTo('/login');
    }
  };

  const handleAddCartClick = async () => {
    setSuccess(true);
    if (!product || product == {}) return;
    console.log("handleAddCartClick");
    util.setFetch(!util.fetch);
    try{
      let cart = await axios.post(
        "/cart",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        }
      );
      console.log({ cart });
    }
    catch(err){
      console.log({err})
    }
    setTimeout(() => {
      setSuccess(false);
      console.log("setted");
    }, 2000);
   
  };

  const handleViewCartClick = () => {
    navTo("/cart");
  };

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
                xs={12}
                md={6}
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
                
                    <Button
                      variant="contained"
                      onClick={() => handleAddCartClick(product)}
                    >
                      <ShoppingCartIcon></ShoppingCartIcon> &nbsp; add to cart
                    </Button>
            
                  <Button
                    onClick={handleBuyNow}
                    color="success"
                    variant="contained"
                  >
                    <ElectricBoltIcon /> &nbsp; {localStorage.getItem("flipkartToken")?'buy now':'login to buy'}
                  </Button>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="dataCont">
                  <h3 style={{"marginBottom": "60px"}}>{product.title}</h3>
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
                        product.price * (5 * 0.01)
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
