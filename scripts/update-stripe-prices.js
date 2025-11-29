const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover'
});

async function updatePrices() {
  try {
    const products = await stripe.products.list({ active: true, expand: ['data.default_price'] });

    for (const product of products.data) {
      let newPrice = 0;

      if (product.name === 'Launch Ready') {
        newPrice = 150000; // $1,500
      } else if (product.name === 'Custom Pro') {
        newPrice = 200000; // $2,000
      } else {
        continue;
      }

      const newPriceObj = await stripe.prices.create({
        product: product.id,
        unit_amount: newPrice,
        currency: 'usd',
      });

      await stripe.products.update(product.id, {
        default_price: newPriceObj.id,
      });

      console.log(`${product.name} updated to $${newPrice / 100}`);
    }

    console.log('Prices updated successfully!');
  } catch (error) {
    console.error('Error updating prices:', error.message);
  }
}

updatePrices();
