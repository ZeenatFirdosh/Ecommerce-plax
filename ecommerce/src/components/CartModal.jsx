import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/product/productsSlice";
import { Link } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
// More products...
// ];

// eslint-disable-next-line react/prop-types
export default function CartModal({ opencart, handleClose, setOpencart }) {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  const handleRemove = (product) => {
    console.log(product, "product");
    dispatch(removeFromCart(product));

    // Show a success toast message
    toast.success("Item removed from cart successfully!");
    // setShowToast(true);

    // // Hide the toast after a few seconds (adjust the timeout as needed)
    // setTimeout(() => {
    //   setShowToast(false);
    // }, 3000);
  };

  const handleDecrement = (product) => {
    console.log(product, "product");
    dispatch(decrementQuantity(product));
    // setShowToast(true);

    // // Hide the toast after a few seconds (adjust the timeout as needed)
    // setTimeout(() => {
    //   setShowToast(false);
    // }, 3000);
  };

  const handleIncrement = (product) => {
    console.log(product, "product");
    dispatch(incrementQuantity(product));
    // setShowToast(true);

    // // Hide the toast after a few seconds (adjust the timeout as needed)
    // setTimeout(() => {
    //   setShowToast(false);
    // }, 3000);
  };
  // // Calculate the total price
  // const totalPrice = cartItems.reduce((total, item) => {
  //   console.log(total,item, "item",item.price,item.quantity,item.discountPercentage);
  //   return parseFloat(total + item.price * item.quantity * (1 - item.discountPercentage / 100)).toFixed(2)
  // }, 0);

  // Function to calculate discounted price for a single product
  const calculateDiscountedPrice = (price, quantity, discountPercentage) => {
    const discountedPrice = (
      price *
      quantity *
      (1 - discountPercentage / 100)
    ).toFixed(2);
    return parseFloat(discountedPrice);
  };

  // Calculate the total price considering discounted prices
  const totalDiscountedPrice = cartItems.reduce((total, item) => {
    const discountedPrice = calculateDiscountedPrice(
      item.price,
      item.quantity,
      item.discountPercentage
    );
    return total + discountedPrice;
  }, 0);

  console.log("Total Price:", totalDiscountedPrice);

  return (
    <>
    {/* <ToastContainer /> */}
    <Transition.Root show={opencart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpencart(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {/* Toast container */}
                        <ToastContainer />
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems &&
                              cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.thumbnail}
                                      alt="img"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="">{item.title}</a>
                                        </h3>
                                        <p className="ml-4">
                                          $
                                          {parseFloat(
                                            item?.price *
                                              (1 -
                                                item?.discountPercentage / 100)
                                          ).toFixed(2)}
                                        </p>
                                      </div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="mt-1 text-sm text-gray-500 line-through ">
                                          ${item.price}
                                        </p>
                                        {/* + - */}
                                        <div className="custom-number-input h-6 w-16">
                                          <div className="flex flex-row h-6 w-full rounded-lg relative bg-transparent mt-1">
                                            <button
                                              onClick={() =>
                                                handleDecrement(item)
                                              }
                                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                            >
                                              <span className="m-auto text-2xl font-thin">
                                                −
                                              </span>
                                            </button>
                                            {/* <input type="number" max={100} className=" focus:outline-none text-center w-full bg-gray-50 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={item.quantity}></input> */}
                                            <div className="px-1">
                                              {item?.quantity}
                                            </div>
                                            <button
                                              onClick={() =>
                                                handleIncrement(item)
                                              }
                                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                            >
                                              <span className="m-auto text-2xl font-thin">
                                                +
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {item.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          onClick={() => handleRemove(item)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${parseFloat(totalDiscountedPrice).toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => setOpencart(false)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpencart(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
}
