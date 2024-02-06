// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NyZchSAHB14zYcAO7L0vtC3swkkdXL6hxFA1NFhAXueoSoqjYitd4HsEc9l3TizVkNYxgsEpn8ntbzMppkdmA5M00imUUMhWf')

app.post('/create-checkout-session', async (req, res) => {
    
  const response = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2055,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Book',
          },
          unit_amount: 30000,
        },
        quantity: 2,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  });

  res.redirect(303, response.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));