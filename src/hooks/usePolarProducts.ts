import { useState, useCallback, useEffect } from "react";
import { PolarProduct } from "@/types";

type PolarProductKey = 'launch-ready' | 'custom-pro';

export function usePolarProducts() {
  const [products, setProducts] = useState<Record<string, PolarProduct>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrGetProduct = useCallback(async (productKey: PolarProductKey) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/polar/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productKey })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Producto "${productKey}" no encontrado. Crear manualmente en Polar dashboard.`);
        }
        throw new Error('Failed to get product');
      }

      const data = await response.json();
      
      const product: PolarProduct = {
        id: data.productId,
        name: data.product.name,
        description: data.product.description,
        prices: [{
          id: data.priceId,
          amount: data.price.amount,
          currency: data.price.currency,
          type: 'one_time'
        }]
      };

      setProducts(prev => ({
        ...prev,
        [productKey]: product
      }));

      return product;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get product";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductPrice = useCallback(async (productKey: PolarProductKey) => {
    let product = products[productKey];
    
    if (!product) {
      product = await createOrGetProduct(productKey);
    }
    
    return product?.prices[0]?.id;
  }, [products, createOrGetProduct]);

  // Initialize products on mount
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        await Promise.all([
          createOrGetProduct("launch-ready"),
          createOrGetProduct("custom-pro")
        ]);
      } catch (error) {
        console.error("Failed to initialize products:", error);
      }
    };

    initializeProducts();
  }, [createOrGetProduct]);

  return {
    products,
    isLoading,
    error,
    createOrGetProduct,
    getProductPrice,
  };
} 