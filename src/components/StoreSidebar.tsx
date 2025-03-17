
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Tag, Package, Sparkles, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <Input
            type="text"
            placeholder="البحث عن منتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 h-9 text-sm bg-neutral-50 border-neutral-200 focus:ring-1 focus:ring-neutral-300 placeholder:text-neutral-400"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-sm font-semibold mb-3 text-neutral-800 flex items-center">
          <Tag className="w-3.5 h-3.5 mr-2 text-neutral-600" />
          التصنيفات
        </h2>
        
        <div className="space-y-1">
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={selectedCategory === 'All' ? "default" : "outline"}
              className={`w-full justify-start h-8 text-xs ${selectedCategory === 'All' ? 'bg-neutral-900 hover:bg-neutral-800 text-white' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
              onClick={() => setSelectedCategory('All')}
            >
              <Package className="w-3 h-3 mr-1.5" />
              الكل
              <Badge className="ml-auto bg-white/20 text-white text-[10px] h-5">{productCount}</Badge>
            </Button>
          </motion.div>
          
          {store.categories.map((category, index) => {
            // Different icons for each category
            const icons = [
              <Sparkles key="sparkles" className="w-3 h-3 mr-1.5" />,
              <Clock key="clock" className="w-3 h-3 mr-1.5" />,
              <Tag key="tag" className="w-3 h-3 mr-1.5" />,
              <Package key="package" className="w-3 h-3 mr-1.5" />
            ];
            
            const categoryCount = Math.floor(Math.random() * 20) + 1;
            
            return (
              <motion.div key={index} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`w-full justify-start h-8 text-xs ${selectedCategory === category ? 'bg-neutral-900 hover:bg-neutral-800 text-white' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {icons[index % icons.length]}
                  {category}
                  <Badge className={`ml-auto text-[10px] h-5 ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                    {categoryCount}
                  </Badge>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Popular Tags */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-sm font-semibold mb-2 text-neutral-800">الوسوم الشائعة</h2>
        
        <div className="flex flex-wrap gap-1.5">
          {['صيفي', 'مستدام', 'يدوي', 'عضوي', 'تراثي', 'إصدار محدود', 'تخفيضات'].map((tag, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Badge 
                variant="outline"
                className="bg-neutral-50 text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors border-neutral-200 text-xs py-0.5"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-4 rounded-xl shadow-sm text-white"
      >
        <h2 className="text-sm font-semibold mb-2">انضم لنشرتنا البريدية</h2>
        <p className="text-white/80 text-xs mb-2">ابق على اطلاع بأحدث منتجاتنا وعروضنا.</p>
        
        <div className="space-y-1.5">
          <Input 
            type="email" 
            placeholder="عنوان بريدك الإلكتروني" 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white h-8 text-xs"
          />
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-white text-neutral-800 hover:bg-white/90 h-8 text-xs group">
              اشترك
              <ArrowRight className="w-3 h-3 mr-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoreSidebar;
