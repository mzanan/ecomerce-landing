import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});

const POLAR_PRODUCTS_CONFIG = {
  "launch-ready": {
    name: "Launch Ready",
    description: "Complete website launch package",
    price: 150000,
  },
  "custom-pro": {
    name: "Custom Pro",
    description: "Premium custom development package",
    price: 200000,
  }
} as const;

async function getExistingProduct(productKey: string): Promise<string | null> {
  const config = POLAR_PRODUCTS_CONFIG[productKey as keyof typeof POLAR_PRODUCTS_CONFIG];
  if (!config) {
    throw new Error('Invalid product key');
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

export async function POST(request: NextRequest) {
  try {
    const { productKey } = await request.json();
    
    if (!productKey || !(productKey in POLAR_PRODUCTS_CONFIG)) {
      return NextResponse.json(
        { error: "Invalid product key" },
        { status: 400 }
      );
    }

    const productId = await getExistingProduct(productKey);
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product not found. Please create the product manually in the Polar dashboard first." },
        { status: 404 }
      );
    }
    
    const config = POLAR_PRODUCTS_CONFIG[productKey as keyof typeof POLAR_PRODUCTS_CONFIG];

    return NextResponse.json({
      productId,
      priceId: `price_${productKey}`,
      product: {
        id: productId,
        name: config.name,
        description: config.description
      },
      price: {
        id: `price_${productKey}`,
        amount: config.price,
        currency: 'usd'
      },
      success: true
    });

  } catch (error) {
    console.error("Error handling product request:", error);
    
    return NextResponse.json({
      error: "Failed to process product request"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      products: Object.entries(POLAR_PRODUCTS_CONFIG).map(([key, config]) => ({
        id: `prod_${key}`,
        name: config.name,
        description: config.description,
        priceId: `price_${key}`,
        amount: config.price,
        currency: 'usd'
      }))
    });
  } catch (error) {
    console.error("Error listing products:", error);
    
    return NextResponse.json({
      error: "Failed to list products"
    }, { status: 500 });
  }
} 