
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductsGridProps {
  products: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductsGrid = ({ 
  products, 
  selectedCategory, 
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: ProductsGridProps) => {
  if (products.length > 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 animate-scale-in">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
