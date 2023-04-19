import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartStore } from "./CartContext";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ data, d, homeFunc }) {
  const util = React.useContext(CartStore);
  const navTo = useNavigate();
  // console.log(d)
  // console.log(util.inCartState)
  return (
    <Card
      sx={{
        width: 345,
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia val={d.id} onClick={(e)=>homeFunc.handleViewProduct(e, data)}
        component="img"
        alt="green iguana"
        height="240"
        image={d.image}
        sx={{objectFit:'contain'}}
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
          {util.inCartState != undefined &&
          util.inCartState[d.id] ? (
            <Button size="small" onClick={homeFunc.handleViewCartClick}>
              View cart
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => homeFunc.handleAddCartClick(d)}
            >
              Add to cart
            </Button>
          )}
          <Button
            size="small"
            val={d.id}
            onClick={(e)=>homeFunc.handleViewProduct(e, data)}
          >
            View product
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
