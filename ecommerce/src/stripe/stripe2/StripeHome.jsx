import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { RingLoader } from "react-spinners";
import { addAddress } from "../../redux/user/userSlice";
import { removeFromCart, setQuantity } from "../../redux/cart/cartSlice";
import { saveCurrentOrder } from "../../redux/order/orderSlice";

// working
export default function StripeHome() {
  const Navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { currentOrder } = useSelector((state) => state.order);
  console.log(currentOrder,"currentOrder");
  const { user, status, error, addresses } = useSelector((state) => state.user);
  
  const generateRandomAddressId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let orderId = "";
    for (let i = 0; i < length; i++) {
      orderId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return orderId;
  };
  const [addressDetails, setAddressDetails] = useState({
    id: generateRandomAddressId(),
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });
  const dispatch = useDispatch();

  console.log(user, "user");
  console.log(addresses, "addresses");
  console.log(cartItems);

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
  const totalAmount = cartItems.reduce((total, item) => {
    const discountedPrice = calculateDiscountedPrice(
      item.price,
      item.quantity,
      item.discountPercentage
    );
    return total + discountedPrice;
  }, 0);

  console.log("Total Price:", totalAmount);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  console.log(paymentMethod,"paymentMethod");
  console.log(selectedAddress,"selectedAddress");
  const handleQuantity = (e, item) => {
    dispatch(setQuantity({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, item) => {
    dispatch(removeFromCart(item));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };
  // Calculate total count of products in the cart
  let totalItems = 0;
  cartItems.forEach((item) => {
    totalItems += item.quantity;
  });
  const generateRandomOrderId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let orderId = "";
    for (let i = 0; i < length; i++) {
      orderId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return orderId;
  };

  // const handleOrder = (e) => {
  //   if (selectedAddress && paymentMethod) {
  //     const order = {
  //       id: generateRandomOrderId(),
  //       items: cartItems,
  //       totalAmount,
  //       totalItems,
  //       user: user,
  //       paymentMethod,
  //       selectedAddress,
  //       status: "pending", // other status can be delivered, received.
  //     };
  //     dispatch(saveOrder(order));
  //     // need to redirect from here to a new page of order success.
  //   } else {
  //     alert("Enter Address and Payment method");
  //   }
  // };
  const handleCheckout = async () => {
    console.log("handleCheckout");
    let currentOrder;
    // Check if cart is empty
    if (!cartItems.length) {
      Navigate('/');
    }
    // Run handleOrder function first
    if (selectedAddress && paymentMethod) {
       currentOrder = {
        id: generateRandomOrderId(),
        items: cartItems,
        totalAmount,
        totalItems,
        user: user,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(saveCurrentOrder(currentOrder));
      console.log("dispatch(saveCurrentOrder(currentOrder))",currentOrder );
      // need to redirect from here to a new page of order success.
    } else {
      alert("Enter Address and Payment method");
    }
    console.log("currentOrder", currentOrder,currentOrder?.paymentMethod,currentOrder?.id);
    console.log("cash condition",currentOrder &&  currentOrder.paymentMethod === "cash" &&    currentOrder.id);
    // Check payment method and currentOrder
    if (
      currentOrder &&
      currentOrder.paymentMethod === "cash" &&
      currentOrder.id
    ) {
      
      console.log("inside cash",currentOrder &&      currentOrder.paymentMethod === "cash" &&      currentOrder.id);
      Navigate('/success');
      // dispatch(saveOrder(currentOrder));
      // <Navigate to={`/success`} replace={true}></Navigate>     
    }

    if (
      currentOrder &&
      currentOrder.paymentMethod === "card" &&
      currentOrder.id
    ) {
      try {
        const res = await axios({
          url: "http://localhost:4242/checkout",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },

          data: JSON.stringify({
            items: cartItems,
            // items:[
            //     {
            //         id:1,
            //         quantity:2,
            //         price:1000,
            //         name:"product"
            //     },
            // ]
          }),
        });
        const data = await res.data;
        console.log(res);
        window.location = data.url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (status == "loading") {
    return <RingLoader />; // Loader here
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    dispatch(addAddress(addressDetails));
    setAddressDetails({
      id: "",
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    });
  };

  return (
    <div>
      {/* {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate to={`/success/${currentOrder.id}`} replace={true}></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )} */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmitAddress}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          value={addressDetails.name}
                          onChange={handleChange}
                          placeholder="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          value={addressDetails.email}
                          onChange={handleChange}
                          placeholder="email"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          value={addressDetails.phone}
                          onChange={handleChange}
                          placeholder="phone"
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street"
                          value={addressDetails.street}
                          onChange={handleChange}
                          placeholder="Street Address"
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          value={addressDetails.city}
                          onChange={handleChange}
                          placeholder="City"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="state"
                          value={addressDetails.state}
                          onChange={handleChange}
                          placeholder="State"
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          name="pinCode"
                          value={addressDetails.pinCode}
                          onChange={handleChange}
                          placeholder="pinCode"
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    // onClick={e=>reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>
              <ul>
                {addresses &&
                  addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        onChange={handlePayment}
                        name="payments"
                        checked={paymentMethod === "card"}
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems &&
                      cartItems.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item?.thumbnail}
                              alt="alt"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.id}>{item.title}</a>
                                </h3>
                                <p className="ml-4">
                                  $
                                  {parseFloat(
                                    item.price *
                                      (1 - item.discountPercentage / 100)
                                  ).toFixed(2)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item?.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item)}
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

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{cartItems.length} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={() => handleCheckout()}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => handleCheckout()}>Check out</button>
    </div>
  );
}
