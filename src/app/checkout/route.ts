import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const priceId = searchParams.get('price_id');
    const metadata = searchParams.get('metadata');

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const productId = await getProductByPriceId(priceId);
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product not found for the given price ID" },
        { status: 404 }
      );
    }

    const origin = request.headers.get('origin') || request.headers.get('referer')?.split('/').slice(0, 3).join('/');
    
    const checkout = await polar.checkouts.create({
      products: [productId],
      metadata: metadata ? JSON.parse(decodeURIComponent(metadata)) : undefined,
      embedOrigin: origin,
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

async function getProductByPriceId(priceId: string): Promise<string | null> {
  try {
    const productsResponse = await polar.products.list({});
    const products = productsResponse.result?.items || [];
    
    for (const product of products) {
      if (product.prices?.some(price => price.id === priceId)) {
        return product.id;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding product by price ID:', error);
    throw error;
  }
} 