const stripe = require('stripe')('sk_test_51HYbVRElfrSODCqLBTLZnK4OQPHX12zkrwxPGAAedBiFPc7SY23tvHRss2OWqNIkpZhEULDI126d4AePJD3RTHII00ECz1M58d');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'https://localhost:5500';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 20000,
        },
        quantity: 1,
      },
      {
        price_data:{
          currency: 'usd',
          product_data: {
            name: 'Intel i7 Core',
            
          },
          unit_amount: 11750,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/builder.html`,
  });

  res.json({ id: session.id });
});
app.listen(5500, () => console.log('Running on port 5500'));