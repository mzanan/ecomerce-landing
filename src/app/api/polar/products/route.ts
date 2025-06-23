import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

export async function GET() {
  try {
    console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
    console.log('🔧 POLAR_ACCESS_TOKEN_PROD exists:', !!process.env.POLAR_ACCESS_TOKEN_PROD);
    console.log('🔧 POLAR_ACCESS_TOKEN_SANDBOX exists:', !!process.env.POLAR_ACCESS_TOKEN_SANDBOX);
    
    const response = await polar.products.list({});
    
    return NextResponse.json({
      products: response.result?.items || [],
      success: true
    });
  } catch (error) {
    console.error("❌ Error listing products:", error);
    console.error("❌ Error message:", error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json({
      error: "Failed to list products",
      details: error instanceof Error ? error.message : 'Unknown error',
      env: process.env.NODE_ENV,
      hasToken: process.env.NODE_ENV === "production" 
        ? !!process.env.POLAR_ACCESS_TOKEN_PROD 
        : !!process.env.POLAR_ACCESS_TOKEN_SANDBOX
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await polar.products.get({ id: productId });

    return NextResponse.json({
      product,
      success: true
    });

  } catch (error) {
    console.error("Error handling product request:", error);
    
    return NextResponse.json({
      error: "Failed to process product request"
    }, { status: 500 });
  }
} 