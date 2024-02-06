// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// // import "./App.css";

// const ProductDisplay = () => {
//   // todo
//   const makePayment = async () => { 
//     // const { cartItems } = useSelector((state) => state.cart);

//     // // const stripe = await loadStripe("your-publishable-key"); 
//     // const body = { cartItems }; 
//     // const headers = { 
//     //   "Content-Type": "application/json", 
//     // }; 
 
//     const response = await fetch( 
//       "http://localhost:4545/api/create-checkout-session", 
//       { 
//         method: "POST", 
//         headers: headers, 
//         body: JSON.stringify(body), 
//       } 
//     ); 
 
//     const session = await response.json(); 
 
//     const result = stripe.redirectToCheckout({ 
//       sessionId: session.id, 
//     }); 
 
//     if (result.error) { 
//       console.log(result.error); 
//     } 
//   }; 
//   return (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// )};

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

export default function Checkout() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     setMessage("Order placed! You will receive an email confirmation.");
  //   }

  //   if (query.get("canceled")) {
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // // }, []);

  // return message ? (
  //   <Message message={message} />
  // ) : (
  //   <ProductDisplay />
  // );
}