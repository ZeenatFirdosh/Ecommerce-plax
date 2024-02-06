/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductCategories,
  fetchProducts,
  setCurrentPage,
} from "../redux/product/productsSlice";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import cartAdd from "../assets/icons/cart.png";
import { Button } from "@material-tailwind/react";
import { addToCart } from "../redux/cart/cartSlice";
import Toast from "../utils/Toast";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistSlice";
import Loader from "../utils/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "./Pagination";
import RedHeart from "../assets/icons/red-heart-icon.svg";
import RedHeart2 from "../assets/icons/heart.png";

// const products = [
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     {
//       id: 2,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     // More products...
//   ]

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, sortedProducts, sortBy, status, error } = useSelector(
    (state) => state.product
  );
  const currentPage = useSelector((state) => state.product.currentPage);
  const totalPages = useSelector((state) => state.product.totalPages);
  const wishlistMap = useSelector((state) => state.wishlist.wishlistMap);
  console.log(wishlistMap, "wishlistMap");
  console.log(products, status);

  const handleAddToCart = (product) => {
    console.log(product, "product");
    // Dispatch the addToCart action to update the Redux store
    dispatch(addToCart(product));

    // Show a success toast message
    toast.success("Item added to cart successfully!");
  };
  const handleAddToWishList = (product) => {
    console.log(product, "product");
    dispatch(addToWishlist(product));
    toast.success("Item added to wishlist successfully!");
  };

  const toggleWishlist = (product) => {
    console.log(product, "productId");
    if (wishlistMap[product.id]) {
      dispatch(removeFromWishlist(product));
      toast.success("Item removed from wishlist!");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Item added to wishlist successfully!");
    }
  };

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  if (status == "loading") {
    return <Loader />; // Loader here
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const productsToRender = sortBy ? sortedProducts : products.products;
  console.log(productsToRender, "productsToRender");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Toast container */}
        <ToastContainer />
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}
        {/* {showToast && <Toast message="Item added to cart!" />} */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsToRender &&
            productsToRender?.map((product) => (
              <div key={product.id} className=" relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full  hover:scale-110"
                    />
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className=" inset-0" />
                        {product.title.slice(0, 15)}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FFE234"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          // stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      </div>
                      <div>{product.rating}</div>
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-900">
                    $
                          {parseFloat(
                            product.price * (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                    </p>
                    <HeartIcon onClick={() => handleAddToWishList(product)} className="h-6 w-6  bg-red-200 rounded-full" aria-hidden="true" />

                    <button onClick={() => handleAddToCart(product)} className="hover:bg-gray-400 mt-1 h-6 w-6 flex bg-gray-100 justify-center items-center text-[5px]  rounded-lg ">
                      
                      <img src={cartAdd} alt="" className="h-4  " />
                    </button>
                  </div> */}
                  <div className="flex  flex-col ">
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {parseFloat(
                        product.price * (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                    <div className="flex mt-1  gap-2">
                      {/* <HeartIcon
                            className="h-5 w-5 top-2 end-2 text-gray-500 bg-white rounded-full"
                            aria-hidden="true"
                            onClick={() => handleAddToWishList(product)}
                          /> */}
                      <button onClick={() => toggleWishlist(product)} className="outline-none">
                        {wishlistMap[product.id] ? (
                          // <img src={RedHeart2} alt="" className="h-5" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#E53935"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#E53935"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>

                          // <HeartIcon
                          //   className="h-5 w-5 top-2 end-2 text-gray-500 bg-white rounded-full hover:scale-125 hover:bg-yellow-100"
                          //   aria-hidden="true"
                          //   // onClick={() => handleAddToWishList(product)}
                          // />
                        )}
                      </button>
                      <button onClick={() => handleAddToCart(product)} className=" ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 hover:fill-blue-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </button>

                      {/* <ShoppingCartIcon
                        className="h-5 w-5 top-2 end-2 text-gray-500 bg-white rounded-full cursor-pointer hover:bg-yellow-100 hover:scale-125"
                        aria-hidden="true"
                        onClick={() => handleAddToCart(product)}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination active={currentPage} />
      </div>
    </div>
  );
}
