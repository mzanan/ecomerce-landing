import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const priceId = searchParams.get('price_id');
    const metadata = searchParams.get('metadata');

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const productId = await getExistingProduct(priceId);
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product not found. Please create the product manually in the Polar dashboard first." },
        { status: 404 }
      );
    }

    // Obtener el origen desde los headers de la request
    const origin = request.headers.get('origin') || request.headers.get('referer')?.split('/').slice(0, 3).join('/');
    
    const checkout = await polar.checkouts.create({
      products: [productId],
      metadata: metadata ? JSON.parse(decodeURIComponent(metadata)) : undefined,
      embedOrigin: origin, // Crucial para que funcione el botón de cerrar
    });
    
    return NextResponse.json({ 
      url: checkout.url,
      id: checkout.id 
    });
  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

async function getExistingProduct(priceId: string): Promise<string | null> {
  const productConfigs = {
    'price_launch-ready': {
      name: 'Launch Ready',
      description: 'Complete website launch package',
      price: 150000,
    },
    'price_custom-pro': {
      name: 'Custom Pro',
      description: 'Premium custom development package',
      price: 200000,
    }
  };

  const config = productConfigs[priceId as keyof typeof productConfigs];
  if (!config) {
    throw new Error('Invalid price ID');
  }

  try {
    const existingProducts = await polar.products.list({});
    const existingProduct = existingProducts.result?.items?.find((product: { name: string; id: string }) => product.name === config.name);
    
    if (existingProduct) {
      return existingProduct.id;
    }
    
    return null;
  } catch (error) {
    console.error('Error listing products:', error);
    throw error;
  }
} 