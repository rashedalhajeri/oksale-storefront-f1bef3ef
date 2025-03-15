
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Tag } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold mb-3 text-neutral-800 flex items-center">
          <Tag className="w-4 h-4 mr-2 text-indigo-600" />
          Categories
        </h2>
        
        <div className="space-y-1.5">
          <Button
            variant={selectedCategory === 'All' ? "default" : "outline"}
            className={`w-full justify-start h-8 text-xs ${selectedCategory === 'All' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Products
            <Badge className="ml-auto bg-white/20 text-white text-[10px] h-5">{productCount}</Badge>
          </Button>
          
          {store.categories.map((category, index) => {
            return (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`w-full justify-start h-8 text-xs ${selectedCategory === category ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <Badge className={`ml-auto text-[10px] h-5 ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                  {/* Count would be dynamic in a real app */}
                  {Math.floor(Math.random() * 20) + 1}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold mb-3 text-neutral-800">Popular Tags</h2>
        
        <div className="flex flex-wrap gap-1.5">
          {['Summer', 'Sustainable', 'Handmade', 'Organic', 'Vintage', 'Limited Edition', 'Sale'].map((tag, i) => (
            <Badge 
              key={i} 
              variant="outline"
              className="bg-neutral-50 text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors border-neutral-200 text-xs py-0.5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-xl shadow-sm text-white">
        <h2 className="text-lg font-semibold mb-2">Join Our Newsletter</h2>
        <p className="text-white/80 text-xs mb-3">Stay updated with our latest products and offers.</p>
        
        <div className="space-y-2">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white h-8 text-xs"
          />
          <Button className="w-full bg-white text-indigo-800 hover:bg-white/90 h-8 text-xs">
            Subscribe
            <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreSidebar;
