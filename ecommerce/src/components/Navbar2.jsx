import React from "react";
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
import { fetchQueryProducts } from "../redux/product/productsSlice";
import { setUser } from "../redux/user/userSlice";
import { setNavActiveLink } from "../redux/navigation/navigationSlice";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
// const navigation = [
//   { name: "Home", href: "/", current: true },
//   { name: "Products", href: "/product", current: false },
//   { name: "About", href: "/user", current: false },
//   { name: "Contact Us", href: "#", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { user, status, error } = useSelector((state) => state.user);
  const { navActiveLink } = useSelector((state) => state.navigation);
  console.log(user, "user");
  const [opencart, setOpencart] = React.useState(false);
  const [openWish, setOpenWish] = React.useState(false);


  const navigation = [
    { name: 'Home', href: '/', current: navActiveLink === 'Home' },
    { name: 'Product', href: '/product', current: navActiveLink === 'Product' },
    { name: 'About', href: '/about', current: navActiveLink === 'About' },
    { name: 'Contact Us', href: '/contact', current: navActiveLink === 'Contact Us' },
  ];

  const handleSetActiveLink = (name) => {
    dispatch(setNavActiveLink(name));
  };

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
  const { wishListItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(wishListItems);

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
                  <div className="flex justify-center  space-x-4 w-full">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleSetActiveLink(item.name)}
                        className={classNames(
                          item.current
                            ? "bg-teal-500 text-white"
                            : "text-gray-900 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* search  */}
                    {/* <div className="pt-2 relative mx-auto my-auto text-gray-600 w-3/4">
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
                          className="absolute right-0 top-0 mt-5 mr-4"
                        >
                          <img src={search} alt="" className="h-5" />
                        </button>
                      </form>
                    </div> */}
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
                      {user && <Menu.Item>
                        {({ active }) => (
                          <Link to="/account">
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
                      </Menu.Item>}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
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
                            {user ? (
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
