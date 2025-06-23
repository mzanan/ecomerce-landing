import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  prices: Array<{
    id: string;
    priceAmount: number;
    priceCurrency: string;
  }>;
}

export const usePolarProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('🔍 Fetching products from API...');
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch products');
        }
        
        console.log('✅ Products loaded:', data.products.length);
        setProducts(data.products || []);
        
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductByName = (name: string) => {
    return products.find(product => 
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductPrice = (product: Product) => {
    return product.prices?.[0]?.id;
  };

  return { 
    products, 
    isLoading, 
    error,
    getProductByName, 
    getProductById, 
    getProductPrice 
  };
}; 