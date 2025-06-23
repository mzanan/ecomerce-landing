import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

export async function GET() {
  try {
    const response = await polar.products.list({});
    
    return NextResponse.json({
      products: response.result?.items || [],
      success: true
    });
  } catch (error) {
    console.error("Error listing products:", error);
    
    return NextResponse.json({
      error: "Failed to list products"
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