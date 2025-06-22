# Polar.sh Integration

This project integrates Polar.sh for payments and subscriptions following the [official NextJS adapter documentation](https://docs.polar.sh/integrate/sdk/adapters/nextjs). It includes both embedded checkout functionality and dynamic product creation.

## Setup

### 1. Environment Variables

Copy the following variables to your `.env.local` file:

```env
# Polar Configuration
POLAR_ACCESS_TOKEN=polar_pat_your_token_here
POLAR_WEBHOOK_SECRET=your_webhook_secret_here
POLAR_WEBHOOK_URL=https://ltvtyxhdljqlgjfbjbuz.supabase.co/functions/v1/polar-webhooks

# Success URL for checkout
SUCCESS_URL=http://localhost:3000/confirmation?checkout_id={CHECKOUT_ID}

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=https://ltvtyxhdljqlgjfbjbuz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Webhook Configuration in Polar

1. Go to your organization in Polar.sh
2. Navigate to Settings > Webhooks
3. Add a new endpoint: `https://ltvtyxhdljqlgjfbjbuz.supabase.co/functions/v1/polar-webhooks`
4. Select the events you want to receive:
   - `checkout.created`
   - `checkout.updated`
   - `order.created`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.active`
   - `subscription.canceled`
   - `subscription.revoked`
   - `customer.created`
   - `customer.updated`
   - `customer.deleted`
   - `customer.state_changed`
   - `benefit.*`
5. Generate a secret key and add it to `POLAR_WEBHOOK_SECRET`

### 3. Supabase Edge Function Configuration

The `polar-webhooks` edge function is deployed and configured to:
- Verify webhook signatures
- Process different event types
- Handle CORS properly

The source code is available in the sibling directory `../polar-edge-function/polar-webhooks/` for portability.

To configure the environment variable in Supabase:
1. Go to your Supabase project
2. Settings > Edge Functions
3. Add environment variable: `POLAR_WEBHOOK_SECRET`

## Usage

### Embedded Checkout (Recommended)

The pricing section automatically uses embedded checkout for a seamless user experience:

```tsx
import { usePolarEmbedded } from '@/hooks/usePolarEmbedded';

function ProductCard() {
  const { openCheckout } = usePolarEmbedded();
  
  const handleBuy = async () => {
    await openCheckout({
      priceId: 'price_your_product_price_id',
      metadata: { plan: 'Launch Ready' },
      theme: 'light'
    });
  };
  
  return (
    <button onClick={handleBuy}>
      Buy Now
    </button>
  );
}
```

The embedded checkout includes:
- Success/error event handling
- Analytics tracking (Google Analytics)
- Automatic success notifications
- Mobile-optimized experience

### Dynamic Product Creation

Products are automatically created/retrieved using the API:

```tsx
import { usePolarProducts } from '@/hooks/usePolarProducts';

function PricingComponent() {
  const { products, createOrGetProduct, getProductPrice } = usePolarProducts();
  
  // Products are automatically initialized on mount
  const priceId = getProductPrice('launch-ready');
  
  return (
    <div>Price ID: {priceId}</div>
  );
}
```

### Traditional Checkout (Alternative)

```tsx
import PolarCheckout from '@/components/PolarCheckout/PolarCheckout';

function ProductPage() {
  return (
    <PolarCheckout 
      productPriceId="price_your_product_price_id"
      buttonText="Buy Now"
    />
  );
}
```

### Using the custom hook

```tsx
import { usePolar } from '@/hooks/usePolar';

function CustomCheckout() {
  const { createCheckout, isLoading, error } = usePolar();
  
  const handleBuy = () => {
    createCheckout({
      productPriceId: 'price_your_product_price_id',
      metadata: { userId: '123' }
    });
  };
  
  return (
    <button onClick={handleBuy} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Buy'}
    </button>
  );
}
```

### Available Query Parameters for Checkout

The checkout route supports the following query parameters:

- `products` - Product ID: `?products=123`
- `customerId` (optional) - `?products=123&customerId=xxx`
- `customerExternalId` (optional) - `?products=123&customerExternalId=xxx`
- `customerEmail` (optional) - `?products=123&customerEmail=jane@example.com`
- `customerName` (optional) - `?products=123&customerName=Jane`
- `metadata` (optional) - URL-Encoded JSON string

## Available Routes

- `/checkout` - Create checkout session (with query params support)
- `/portal` - Customer portal for managing orders and subscriptions
- `/confirmation` - Payment confirmation page
- `/api/webhook/polar` - Webhook handler (fallback, main handler is Supabase Edge Function)
- `/api/polar/products` - Dynamic product creation and listing

## Pre-configured Products

The system includes two pre-configured products:

1. **Launch Ready** - $1,500
   - Basic Analytics Dashboard
   - Secure Checkout with Stripe
   - Built-in Admin Panel
   - SEO Optimization
   - Email Support
   - Up to 5 Products
   - Branded with Your Name & Logo
   - 5 Visual Tweaks Included

2. **Custom Pro** - $2,000
   - Advanced Analytics & Reports
   - Secure Checkout (Stripe or custom provider)
   - Built-in Admin Panel
   - SEO Tools & Social Media Integration
   - Unlimited Products
   - Priority Support
   - Custom Homepage Layout & Components
   - Fully Custom Design

These products are automatically created in Polar when accessed through the pricing interface.

## Edge Function: polar-webhooks

The edge function handles all Polar webhooks and is deployed at:
`https://ltvtyxhdljqlgjfbjbuz.supabase.co/functions/v1/polar-webhooks`

Supported events:
- `checkout.created` - Checkout created
- `checkout.updated` - Checkout updated  
- `order.created` - Order created
- `subscription.created` - Subscription created
- `subscription.updated` - Subscription updated
- `subscription.active` - Subscription activated
- `subscription.canceled` - Subscription canceled
- `subscription.revoked` - Subscription revoked
- `customer.created` - Customer created
- `customer.updated` - Customer updated
- `customer.deleted` - Customer deleted
- `customer.state_changed` - Customer state changed
- `benefit.*` - All benefit-related events

## Next Steps

1. Configure your products in Polar.sh
2. Get the `product_price_id` of your products
3. Integrate the `PolarCheckout` component in your UI
4. Customize webhook logic in the edge function according to your needs
5. Test the integration using Polar's sandbox environment

## Productos - Crear Manualmente

Crea estos 2 productos en el dashboard de Polar.sh:

### Producto 1: Launch Ready
- **Nombre**: `Launch Ready`
- **Descripción**: `Complete website launch package`
- **Billing Cycle**: `One-time purchase`
- **Pricing Type**: `Fixed price`
- **Precio**: `$1500` (150000 centavos)

### Producto 2: Custom Pro
- **Nombre**: `Custom Pro`
- **Descripción**: `Premium custom development package`
- **Billing Cycle**: `One-time purchase`
- **Pricing Type**: `Fixed price`
- **Precio**: `$2000` (200000 centavos)

## Variables de Entorno

```env
POLAR_ACCESS_TOKEN=your_token_here
```

## Integración

Los productos se buscan automáticamente por nombre en el API de Polar. Si no existen, se devuelve un error 404. 