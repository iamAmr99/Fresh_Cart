import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery("categorySlider", getCategories);
  return (
    <>
      {data?.data.data ? 
        <div className="py-4">
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <img
                src={category.image}
                height={200}
                key={category._id}
                alt="title"
                className="w-100"
              />
            ))}
          </Slider>
        </div>
      : 
        ""
      }
    </>
  );
}
