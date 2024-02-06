import React, { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyCheckoutForm } from "./MyCheckoutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51NyZchSAHB14zYcAy11A84jm2naKWpqqaPCezsyD5Chi0L6kHq30eLRoSh9NtT1vP7nrS1nAeSlGIMtE56mr9HcB00fWuz7wWL"
);
const URL = "http://localhost:4242";

function StripePayment() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCheckout = () => {
    axios.post(`http://localhost:4242/create-checkout-session`, {
        cartItems,
        userId: 1,
      })
      .then((response) => {
        if (response?.data?.url) {
          console.log(response);
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
    {/* <Elements stripe={stripePromise}> */}
      {/* <form onSubmit={() => handleCheckout()}>
        <button type="submit">Checkout</button>
      </form> */}
      <button onClick={() => handleCheckout()}>Check out</button>

        {/* working */}
      {/* <form action="http://localhost:4242/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form> */}
      {/* <MyCheckoutForm />  */}
    {/* </Elements> */}

    </>
  );  
}

export default StripePayment;
