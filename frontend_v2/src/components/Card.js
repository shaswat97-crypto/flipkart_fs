import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartStore } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ProductCard({ d }) {
  const util = React.useContext(CartStore);
  const navTo = useNavigate();

  const handleAddCartClick = async (data) => {
    util.setFetch(!util.fetch);
    // console.log(util.fetch, util.setFetch);
    util.setSuccess(true);
    // console.log("handleAddCartClick");
    // console.log("id", data._id);

    try {
      let cart = await axios.post(
        "/api/cart",
        {
          productId: data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("flipkartToken")}`,
          },
        }
      );
      const data = await cart.data;
      console.log({data});
    } catch (err) {
      console.log({ err });
    }
    // console.log(localStorage.getItem("cart"))
    // if (cart == undefined) {
    //   cart = {};
    // }
    // data = { ...data, qty: 1 };
    // // console.log(data);
    // cart[data.id] = data;
    // localStorage.setItem("cart", JSON.stringify(cart));
    // util.setIncartState(cart);
    setTimeout(() => {
      util.setSuccess(false);
      console.log("setted");
    }, 2000);
  };

  const handleViewCartClick = () => {
    console.log("handleViewCartClick");

    navTo("/cart");
  };

  const handleViewProduct = (data) => {
    console.log("handleViewProduct");
    console.log(data);
    if (data == null) return;
    // const id = e.target.getAttribute("val");
    // util.setCurrProduct(data[id - 1]);
    // localStorage.setItem("cp", JSON.stringify(data[id - 1]));
    navTo(`/product/${data._id}`);
  };

  return (
    <Card
      sx={{
        width: 345,
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease-out, transform 0.2s ease-out",
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 2px 10px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",
          transform: "scale(0.98)",
        },
      }}
    >
      <CardMedia
        val={d.id}
        onClick={() => handleViewProduct(d)}
        component="img"
        alt="green iguana"
        height="240"
        image={d.image}
        sx={{ objectFit: "contain" }}
        style={{
          transition: "transform 0.2s ease-out",
          "&:hover": {
            transform: "scale(0.95)",
          },
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          padding: 0,
          pt: 2,
          pl: 2,
          pr: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {d.title}
        </Typography>
        <CardActions sx={{ p: 0, pt: 3 }}>
          <Button
            size="small"
            onClick={() => handleAddCartClick(d)}
            sx={{
              "&:hover": {
                bgcolor: "#2196f3",
                color: "#fff",
              },
            }}
          >
            Add to cart
          </Button>

          <Button
            size="small"
            val={d.id}
            onClick={() => handleViewProduct(d)}
            sx={{
              "&:hover": {
                bgcolor: "#2196f3",
                color: "#fff",
              },
            }}
          >
            View product
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
