const express = require('express');
const cors = require("cors"); 
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.static('public'));
const stripe = require('stripe')('sk_test_51NyZchSAHB14zYcAO7L0vtC3swkkdXL6hxFA1NFhAXueoSoqjYitd4HsEc9l3TizVkNYxgsEpn8ntbzMppkdmA5M00imUUMhWf');

// working
// to do
app.post("/checkout", async (req, res) => {
        console.log("/checkout");
    try {
        const line_items = req.body.items.map((item) => {
            let price = parseFloat((item.price * (1 - item.discountPercentage / 100)).toFixed(2));
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: item?.title,
                  description: item.description,
                  images: item.images
                },
                unit_amount: parseInt((price.toFixed(2)) * 100),
              },
              quantity: item?.quantity,
            };
          });
          console.log(line_items,"line_items");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 20000,
                    currency: 'inr',
                  },
                  display_name: 'Delivery charges',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 5,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 7,
                    },
                  },
                },
              }
            ],
            line_items,
            mode: "payment",
            success_url: `http://localhost:5173/success`,
            cancel_url: `http://localhost:5173/return`,
          })
          console.log(session,"session");
          res.json({url:session.url})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
   
    // const customer = await stripe.customers.create({
    //   metadata: {
    //     userId: req.body.userId,
    //     cart: JSON.stringify(req.body.cartItems),
    //   },
    // });

});



app.listen(4242, () => console.log('Running on port 4242'));