
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface ProductsGridProps {
  products: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency?: string;
  loading?: boolean;
}

const ProductsGrid = ({ 
  products, 
  selectedCategory, 
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  currency = 'USD',
  loading = false
}: ProductsGridProps) => {
  // Added heading with product count
  const renderHeading = () => {
    const title = selectedCategory === 'All' ? 'All' : selectedCategory;
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-neutral-900 flex items-center">
          {title}
          <span className="ml-2 text-sm font-normal text-neutral-500">
            ({products.length} items)
          </span>
        </h2>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16">
        <Loader2 className="w-10 h-10 text-neutral-300 animate-spin mb-4" />
        <h3 className="text-lg font-medium text-neutral-800 mb-2">Loading products...</h3>
      </div>
    );
  }

  if (products.length > 0) {
    return (
      <div>
        {renderHeading()}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 animate-scale-in">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} currency={currency} />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-center py-12 md:py-16 bg-white rounded-xl animate-fade-in border border-neutral-100">
      <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-neutral-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-neutral-800 mb-2">No products found</h3>
      <p className="text-neutral-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
      <Button 
        variant="outline" 
        className="border-neutral-200"
        onClick={() => {
          setSelectedCategory('All');
          setSearchQuery('');
        }}
      >
        Clear filters
      </Button>
    </div>
  );
};

export default ProductsGrid;
