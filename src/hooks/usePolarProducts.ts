import { useState, useCallback, useEffect } from "react";
import { PolarProduct } from "@/types";

export function usePolarProducts() {
  const [products, setProducts] = useState<PolarProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/polar/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
      
      return data.products || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductById = useCallback((productId: string) => {
    return products.find(product => product.id === productId);
  }, [products]);

  const getProductByName = useCallback((name: string) => {
    return products.find(product => product.name === name);
  }, [products]);

  const getProductPrice = useCallback((product: PolarProduct) => {
    return product?.prices?.[0]?.id;
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProductById,
    getProductByName,
    getProductPrice,
  };
} 