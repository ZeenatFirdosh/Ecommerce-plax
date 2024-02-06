import React, { useEffect } from "react";
import heart from "../assets/icons/e-commerce.png";
import user from "../assets/icons/user.png";
import hamburger from "../assets/icons/hamburger.png";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cart from "../assets/icons/cart.svg";
import CartModal from "./CartModal";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import logo from "../assets/images/shopping.jpg";
import WishListModal from "./WishListModal";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import search from "../assets/icons/search.svg";
import {
  fetchProductCategories,
  fetchProducts,
  fetchProductsByCategory,
  fetchQueryProducts,
  setShowResults,
} from "../redux/product/productsSlice";
import { setActiveComponent, setUser } from "../redux/user/userSlice";
import { Popover } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Product", href: "/product", current: false },
  { name: "About", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { user, status, error } = useSelector((state) => state.user);
  console.log(user, "user");
  const [opencart, setOpencart] = React.useState(false);
  const [openWish, setOpenWish] = React.useState(false);

  // search
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateSearchQuery(query));
    dispatch(fetchQueryProducts(query));
    setQuery("");
  };
  // const cartItems = JSON.parse(localStorage.getItem("cart"));
  // const wishlistItems = JSON.parse(localStorage.getItem("wishList"));
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { categories, showResults, searchResults, searchStatus } = useSelector(
    (state) => state.product
  );
  console.log(wishListItems);
  console.log(cartItems, "cartItems");

  const handleOpen = () => setOpencart(!opencart);
  const handleClose = () => setOpencart(false);

  const handleOpenWish = () => setOpenWish(!openWish);
  const handleCloseWish = () => setOpenWish(false);

  const token = localStorage.getItem("token");
  // console.log(token);

  const Navigate = useNavigate();

  // Calculate total count of products in the cart
  // let totalCartCount = 0;
  // cartItems.forEach((item) => {
  //   totalCartCount += item.quantity;
  // });
  const totalCartCount = cartItems.length;
  // Calculate total count of items in the wishlist
  const totalItemsInWishlist = wishListItems.length;

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signOut(auth);
      console.log(userCredentials);

      // Dispatch action to save user data
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      Navigate("/"); // Redirect to login page after signup
    } catch (error) {
      console.error(error);
    }
    // dispatch(loginUser(formData));
  };
  // to do useeffect to get
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  let timeoutId = null;
  useEffect(() => {
    if (query.trim() !== "") {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout
      timeoutId = setTimeout(() => {
        dispatch(fetchQueryProducts(query));
        dispatch(setShowResults(true));
      }, 500);
    } else {
      dispatch(setShowResults(false));
    }
    // Clear timeout on component unmount or when query changes
    return () => clearTimeout(timeoutId);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    dispatch(fetchQueryProducts(null)); // Dispatch null to clear search results
    dispatch(setShowResults(false));
  };

  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  const handleClick = (component) => {
    dispatch(setActiveComponent(component));
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-10 bg-white shadow shadow-gray-200 "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between  ">
              <div className="flex  flex-shrink-0 items-center ">
                <a href="/">
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </a>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch w-full">
                <div className="hidden sm:ml-6 sm:block w-full ">
                  <div className="flex items-center justify-evenly  space-x-4 w-full">
                    {/* search  */}
                    <div className=" relative  my-auto text-gray-600 w-1/2">
                      <form onSubmit={handleSubmit}>
                        <input
                          className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                          type="search"
                          name="search"
                          placeholder="Search"
                          value={query}
                          onChange={handleChange}
                        />
                        <button
                          type="submit"
                          className="absolute right-0 top-0 mt-3 mr-4"
                        >
                          <img src={search} alt="" className="h-5" />
                        </button>
                      </form>

                      {/* search Results */}
                      {showResults && searchStatus === "loading" ? (
                        <div className="border p-2 border-gray-300 bg-white rounded-md mt-12 absolute top-0 w-full max-h-48 overflow-y-auto">
                          Loading...
                        </div>
                      ) : (
                        showResults && (
                          <div className="mt-12 absolute top-0 w-full max-h-48 overflow-y-auto border border-gray-300 rounded-md bg-white">
                            {searchResults?.products &&
                            searchResults.products.length > 0 ? (
                              searchResults.products.map((product) => (
                                <div
                                  key={product.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    Navigate(`/product/${product.id}`);
                                    console.log(
                                      `/product/${product.id}`,
                                      "navigation clicked"
                                    );
                                  }}
                                  className="p-2  hover:bg-gray-100  flex items-center gap-5 z-2 cursor-pointer"
                                >
                                  <div className=" ">
                                    <img
                                      src={product.thumbnail}
                                      alt=""
                                      className="h-6 w-6"
                                    />
                                  </div>
                                  <div>{product.title}</div>
                                </div>
                              ))
                            ) : (
                              <div className="p-2">No items to show.</div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    {/* category */}
                    <Popover className="relative">
                      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                        <span>Category</span>
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/3 px-4">
                          <div className="w-screen max-w-xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                              {/* {solutions.map((item) => (
                                <div
                                  key={item.name}
                                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                                >
                                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon
                                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <a
                                      href={item.href}
                                      className="font-semibold text-gray-900"
                                    >
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </a>
                                   
                                  </div>
                                </div>
                              ))} */}
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-gray-900/5 bg-gray-50">
                              {/* {callsToAction.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                >
                                  <item.icon
                                    className="h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              ))} */}
                              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                {/* <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon
                                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                      aria-hidden="true"
                                    />
                                  </div> */}
                                <div>
                                  <button
                                    onClick={() => dispatch(fetchProducts(1))}
                                    className="font-semibold text-gray-900"
                                  >
                                    All
                                  </button>
                                  {/* <p className="mt-1 text-gray-600">
                                      {item.description}
                                    </p> */}
                                </div>
                              </div>
                              {categories &&
                                categories.map((item) => (
                                  <div
                                    key={item}
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    {/* <div className="mt-1 flex h-8 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon
                                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                      aria-hidden="true"
                                    />
                                  </div> */}
                                    <div>
                                      <button
                                        onClick={() =>
                                          handleCategoryClick(item)
                                        }
                                        className="font-semibold text-gray-900"
                                      >
                                        {item}
                                        <span className="absolute inset-0" />
                                      </button>
                                      {/* <p className="mt-1 text-gray-600">
                                      {item.description}
                                    </p> */}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr- gap-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* wishlist */}
                <button
                  type="button"
                  onClick={handleOpenWish}
                  className="relative rounded-full bg-gray-100 p-1 text-gray-800  hover:text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  {totalItemsInWishlist > 0 && (
                    <span className="inline-flex absolute -top-1 -end-1  items-center rounded bg-red-500 px-1  text-[10px] font-medium text-white ring-1 ring-inset ring-green-600/20">
                      {totalItemsInWishlist}
                    </span>
                  )}
                </button>
                <WishListModal
                  openWish={openWish}
                  setOpenWish={setOpenWish}
                  handleOpenWish={handleOpenWish}
                  handleCloseWish={handleCloseWish}
                />

                {/* cart */}
                <button
                  type="button"
                  onClick={handleOpen}
                  className="relative rounded-full bg-gray-100 p-1 text-gray-800  hover:text-white hover:bg-teal-500 focus:outline-none "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {totalCartCount > 0 && (
                    <span className="inline-flex absolute -top-1 -end-1  items-center rounded bg-red-500 px-1  text-[10px] font-medium text-white ring-1 ring-inset ring-green-600/20">
                      {totalCartCount}
                    </span>
                  )}
                </button>

                {/* Modal */}

                <CartModal
                  opencart={opencart}
                  handleClose={handleClose}
                  handleOpen={handleOpen}
                  setOpencart={setOpencart}
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/user">
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {`Hi ${user?.displayName}`}
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Account
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          onClick={() => handleClick('orders')}
                            to="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Orders
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {token ? (
                              <button
                                onClick={handleSignout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign Out{" "}
                              </button>
                            ) : (
                              <Link
                                to="/login"
                                // onClick={}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign in{" "}
                              </Link>
                            )}
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
