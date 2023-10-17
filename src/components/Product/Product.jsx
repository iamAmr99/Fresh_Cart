import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {Helmet} from 'react-helmet'

export default function Product() {
  let param = useParams();
  /* const [productDetails,setProductDetails] =useState(null) */

  /* async */ function getProductDetails(id) {
    /* let {data} = await */ return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    /* setProductDetails(data) */
  }
  let { data } = useQuery("productDetails", () => getProductDetails(param.id));
  /* useEffect(()=>{
    getProductDetails(param.id)
},[])
 */
  return (
    <>
    <Helmet>
      <title>{data?.data.data.title}</title>
      <meta name="description" content=""/>
    </Helmet>
      <div>Product </div>
      {data?.data.data ?
        <div className="row py-2 align-items-center">
          <div className="col-md-4">
            <img
              src={data?.data.data.imageCover}
              alt={data?.data.data.title}
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <h3 className="h5">{data?.data.data.title}</h3>
            <p className="h5">{data?.data.data.description}</p>
            <h6>{data?.data.data.category.name}</h6>
            <h6>Price: {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
                <span>Rating:{data?.data.data.ratingsQuantity}</span>
                <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
            </div>
          <button className="btn bg-main text-white w-100 my-2 ">add to cart</button>
          </div>
        </div>
      : 
        ""
      }
    </>
  );
}
