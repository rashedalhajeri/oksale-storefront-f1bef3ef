
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Search } from 'lucide-react';

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 animate-scale-in">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="text-center py-12 md:py-16 bg-white rounded-xl animate-fade-in border border-neutral-100 shadow-sm">
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-neutral-50 mx-auto mb-4 border border-neutral-100">
        <ShoppingBag className="w-8 h-8 text-neutral-300" />
      </div>
      <h3 className="text-lg font-medium text-neutral-800 mb-2">لا توجد منتجات</h3>
      <p className="text-neutral-500 mb-4 px-4">حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.</p>
      <Button 
        variant="default" 
        className="bg-indigo-600 hover:bg-indigo-700"
        onClick={() => {
          setSelectedCategory('All');
          setSearchQuery('');
        }}
      >
        مسح التصفية
      </Button>
    </div>
  );
};

export default ProductsGrid;
