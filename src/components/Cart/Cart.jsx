import React, { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";

export default function Cart() {
  let { getLoggedUserCart } = useContext(cartContext);
  async function getCart() {
    let response = await getLoggedUserCart();
  }
  useEffect(() => {
    getCart();
  }, []);
  return <div>TTTT</div>;
}
