import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover'
});

export async function GET() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });

    const formattedProducts = products.data.map(product => ({
      id: product.id,
      name: product.name,
      prices: product.default_price ? [{
        id: (product.default_price as Stripe.Price).id,
        priceAmount: (product.default_price as Stripe.Price).unit_amount || 0,
        priceCurrency: (product.default_price as Stripe.Price).currency
      }] : []
    }));

    return NextResponse.json({
      success: true,
      products: formattedProducts
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products'
    }, { status: 500 });
  }
}