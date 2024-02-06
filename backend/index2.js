// This is your test secret API key.
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require("cors"); 
// const stripePage = require("./routes/stripePage");
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.static('public'));
const stripe = require('stripe')('sk_test_51NyZchSAHB14zYcAO7L0vtC3swkkdXL6hxFA1NFhAXueoSoqjYitd4HsEc9l3TizVkNYxgsEpn8ntbzMppkdmA5M00imUUMhWf');

const YOUR_DOMAIN = 'http://localhost:4242';

// app.use("/api/stripe", stripePage);

// Create a Payment Intent (returns the client with a temporary secret)
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
 
// to do
// app.post("/create-checkout-session", async (req, res) => {
//   console.log("back", req.body.cartItems);
//   console.log("/create-checkout-session");
//     const customer = await stripe.customers.create({
//       metadata: {
//         userId: req.body.userId,
//         cart: JSON.stringify(req.body.cartItems),
//       },
//     });

//   const line_items = req.body.cartItems.map((item) => {
//     return {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item?.title,
//           images: [item?.image],
//           description: item?.desc,
//           metadata: {
//             id: item?.id,
//           },
//         },
//         unit_amount: item?.price * 100,
//       },
//       quantity: item?.cartQuantity,
//     };
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     shipping_address_collection: {
//       allowed_countries: ["US", "CA", "KE"],
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 0,
//             currency: "usd",
//           },
//           display_name: "Free shipping",
//           // Delivers between 5-7 business days
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 5,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 7,
//             },
//           },
//         },
//       },
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 1500,
//             currency: "usd",
//           },
//           display_name: "Next day air",
//           // Delivers in exactly 1 business day
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 1,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 1,
//             },
//           },
//         },
//       },
//     ],
//     phone_number_collection: {
//       enabled: true,
//     },
//     line_items,
//     mode: "payment",
//     customer: customer.id,
//     success_url: `${process.env.CLIENT_URL}/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/cart`,
//   });

//   // res.redirect(303, session.url);
//   res.send({ url: session.url });
// });
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//   const paymentIntent = await stripe.paymentIntents.create({
//   amount: req.body.amount,
//   currency: 'usd',
//   });
//   res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//   res.status(500).json({ error: error.message });
//   }
//  });
//  app.listen(3001, () => {
//   console.log('Server is listening on port 3001');
//  });

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  });

  res.redirect(303, session.url);  
});

app.listen(4242, () => console.log('Running on port 4242'));