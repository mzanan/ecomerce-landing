import { NextResponse } from 'next/server';
import { polar } from '@/lib/polar';

export async function GET() {
  try {
    console.log('🔍 Fetching products from Polar API...');
    
    const response = await polar.products.list({
      isArchived: false
    });
    
    console.log('✅ Products fetched successfully:', response.result?.items?.length || 0);
    
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