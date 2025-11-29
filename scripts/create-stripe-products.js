const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover'
});

async function createProducts() {
  try {
    const launchReady = await stripe.products.create({
      name: 'Launch Ready',
      default_price_data: {
        unit_amount: 9900,
        currency: 'usd',
      },
    });

    const customPro = await stripe.products.create({
      name: 'Custom Pro',
      default_price_data: {
        unit_amount: 29900,
        currency: 'usd',
      },
    });

    console.log('Launch Ready product created:', launchReady.id);
    console.log('Custom Pro product created:', customPro.id);
    console.log('Products created successfully!');
  } catch (error) {
    console.error('Error creating products:', error.message);
  }
}

createProducts();
