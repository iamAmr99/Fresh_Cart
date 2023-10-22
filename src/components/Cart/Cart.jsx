import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  let [errorMessage, setErrorMessage] = useState("");
  let [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    getLoggedUserCart();
  });
  async function getLoggedUserCart() {
    let response = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    if (response) {
      setCartProducts(response?.data.data.products);
    }
  }
  async function removeProductFromCart(productId) {
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    if (res) {
      setCartProducts(res.data.data.products);
    }
  }
  async function clearCart() {
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    if (res) {
      setCartProducts([]);
    }
  }
  async function updateProductCount(productId, count) {
    let res = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    if (res) {
      setCartProducts([]);
    }
  }
  return (
    <>
      {errorMessage ? (
        <h2 className="alert alert-primary text-center my-5">
          {"Cart is empty"}
        </h2>
      ) : (
        <div className="my-3">
          <button
            onClick={() => clearCart()}
            type="button"
            className="btn btn-danger fst-italic w-100 "
          >
            Clear Cart <i className="fas fa-x mx-1"></i>
          </button>
          {cartProducts?.map((product) => {
            return (
              <div key={product._id} className="cart-product shadow my-5 p-2">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-8">
                    <h2>{product.product.title}</h2>
                    <h5>{product.product.category.name}</h5>
                    <p className="d-flex justify-content-between">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color me-1"></i>
                        {product.product.ratingsAverage}
                      </span>
                    </p>
                    <p className="fw-bold fst-italic fs-5">
                      Total price: {product.count * product.price} EGP
                    </p>
                    <button
                      onClick={() => removeProductFromCart(product.product._id)}
                      className="btn btn-outline-danger"
                    >
                      remove item <i className="fas fa-trash mx-1"></i>
                    </button>
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex align-items-center justify-content-around">
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count - 1
                          )
                        }
                        type="button"
                        className="btn btn-secondary"
                      >
                        -
                      </button>
                      <span className=" fw-bold">{product.count}</span>
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count + 1
                          )
                        }
                        type="button"
                        className="btn btn-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
