import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function FeaturedProducts({ products }) {
  let { addToCart } = useContext(cartContext);
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      toast.success('product added')
    } else {
      toast.error('product not available')
    }
  }
  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data } = useQuery("featuredProducts", getFeaturedProducts);

  return (
    <>
      {/* {isLoading ?
        <div className="w-100 py-5 d-flex justify-content-center">
          <i class="fa-solid fa-spinner fa-spin-pulse"></i>loading
        </div> : } */}
      <div className="container py-2 ">
        <h2>All products</h2>
        <div className="row">
          {data?.data.data.map((products) => (
            <div key={products.id} className="col-md-2">
              <Link to={`/product/${products.id}`}>
                <div className="product cursor-pointer py-3 px-2">
                  <img
                    src={products.imageCover}
                    alt={products.title}
                    className="w-100"
                  />
                  <span className="text-main font-sm fw-bolder">
                    {products.category.name}
                  </span>
                  <h3 className="h6">
                    {products.title /* .split("").slice(0, 2).join("") */}
                  </h3>
                  <div className="d-flex justify-content-between mt-3">
                    <span>Price: {products.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color "></i>{" "}
                      {products.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
                  <button onClick={()=>addProduct(products._id)} className="btn bg-main text-white w-100 my-2 ">
                    add to cart{" "}
                  </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
