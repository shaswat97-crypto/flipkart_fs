import React, { useContext } from "react";
import { CartStore } from "./CartContext";

function Bill() {
  const util = useContext(CartStore);
  // console.log(util)
  const cartObj = util.inCartState;
  // console.log(cartObj)
  let subTotal = 0;
  for (let key in cartObj) {
    let qty = cartObj[key].qty;
    let price = cartObj[key].price;
    subTotal += qty * price;
  }
  const total = subTotal + subTotal * 0.05;
  const tax = subTotal * 0.05;
  return (
    <>
      <div>Bill</div>
      <div>Subtotal {subTotal.toFixed(2)}</div>
      <div>Tax {tax.toFixed(2)}</div>
      <div>Total {total.toFixed(2)}</div>
    </>
  );
}

export default Bill;
