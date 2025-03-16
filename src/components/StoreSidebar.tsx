
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Tag, Package, Sparkles, Clock, ShoppingCart, Filter } from 'lucide-react';

interface StoreSidebarProps {
  store: {
    categories: string[];
  };
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  productCount: number;
}

const StoreSidebar = ({ 
  store, 
  selectedCategory, 
  setSelectedCategory,
  productCount 
}: StoreSidebarProps) => {
  // Different icons for each category
  const getCategoryIcon = (index: number) => {
    const icons = [
      <Sparkles key="sparkles" className="w-4 h-4 ml-2" />,
      <Clock key="clock" className="w-4 h-4 ml-2" />,
      <Tag key="tag" className="w-4 h-4 ml-2" />,
      <Package key="package" className="w-4 h-4 ml-2" />
    ];
    return icons[index % icons.length];
  };

  // Mobile view category dropdown
  const renderMobileCategories = () => (
    <div className="md:hidden bg-white rounded-xl shadow-sm p-3 mb-4 border border-neutral-100">
      <div className="flex items-center mb-3">
        <Filter className="w-4 h-4 ml-2 text-indigo-600" />
        <h2 className="text-sm font-medium text-neutral-800">تصنيف المنتجات</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={selectedCategory === 'All' ? "default" : "outline"}
          size="sm"
          className={`justify-start h-9 text-xs ${
            selectedCategory === 'All' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700'
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          <ShoppingCart className="w-3.5 h-3.5 ml-1.5" />
          كل المنتجات
        </Button>
        
        {store.categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={`justify-start h-9 text-xs ${
              selectedCategory === category ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryIcon(index)}
            <span className="truncate">{category}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  // Desktop view
  return (
    <div className="space-y-4">
      {/* Mobile Categories */}
      {renderMobileCategories()}
      
      {/* Desktop Categories */}
      <div className="hidden md:block bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h2 className="text-sm font-semibold mb-3 text-neutral-800 flex items-center">
          <Tag className="w-4 h-4 ml-2 text-indigo-600" />
          الفئات
        </h2>
        
        <div className="space-y-1.5">
          <Button
            variant={selectedCategory === 'All' ? "default" : "outline"}
            className={`w-full justify-start h-10 text-sm ${
              selectedCategory === 'All' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            كل المنتجات
            <Badge className={`mr-auto ${
              selectedCategory === 'All' 
                ? 'bg-white/20 text-white' 
                : 'bg-neutral-100 text-neutral-700'
            }`}>
              {productCount}
            </Badge>
          </Button>
          
          {store.categories.map((category, index) => {
            return (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`w-full justify-start h-10 text-sm ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(index)}
                <span className="truncate">{category}</span>
                <Badge className={`mr-auto ${
                  selectedCategory === category 
                    ? 'bg-white/20 text-white' 
                    : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {Math.floor(Math.random() * 20) + 1}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Search Box - Desktop Only */}
      <div className="hidden md:block bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h2 className="text-sm font-semibold mb-2 text-neutral-800 flex items-center">
          <Search className="w-4 h-4 ml-2 text-indigo-600" />
          البحث
        </h2>
        
        <div className="relative">
          <Input 
            type="text" 
            placeholder="ابحث عن منتج..." 
            className="pr-10 bg-neutral-50 border-neutral-200"
            dir="rtl"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        </div>
      </div>
      
      {/* Newsletter - Desktop Only */}
      <div className="hidden md:block bg-gradient-to-br from-indigo-600 to-violet-700 p-4 rounded-xl shadow-sm text-white">
        <h2 className="text-sm font-semibold mb-2">انضم إلى نشرتنا الإخبارية</h2>
        <p className="text-white/80 text-xs mb-2">ابق على اطلاع بأحدث منتجاتنا وعروضنا.</p>
        
        <div className="space-y-1.5">
          <Input 
            type="email" 
            placeholder="بريدك الإلكتروني" 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white h-8 text-xs"
            dir="rtl"
          />
          <Button className="w-full bg-white text-indigo-800 hover:bg-white/90 h-8 text-xs font-medium">
            اشتراك
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreSidebar;
