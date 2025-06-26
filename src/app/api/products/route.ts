import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';

export async function GET() {
  try {
    const response = await polar.products.list({
      isArchived: false
    });
    
    return NextResponse.json({
      success: true,
      products: response.result?.items || []
    });
    
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products'
    }, { status: 500 });
  }
} 