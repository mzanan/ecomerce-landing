import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      shippingAddress,
      items,
      totalAmount,
      paymentIntentId,
      shippingPrice
    } = await request.json();

    // Por ahora guardamos en memoria (para demo)
    // En producción usarías una base de datos
    const order = {
      id: `order_${Date.now()}`,
      shippingAddress,
      items,
      totalAmount,
      paymentIntentId,
      shippingPrice,
      status: 'completed' as const,
      createdAt: new Date().toISOString(),
    };

    console.log('Order created:', order);

    return NextResponse.json({
      orderId: order.id,
      success: true,
    });
  } catch (error: unknown) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    );
  }
}
