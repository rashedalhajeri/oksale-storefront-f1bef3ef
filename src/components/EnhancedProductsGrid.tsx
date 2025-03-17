
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Loader2, 
  Search,
  SlidersHorizontal,
  Star,
  ArrowDownUp,
  PackageCheck,
  PackageX,
  X,
  AlertCircle
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/ProductImageGallery';
import { searchProducts, ProductSearchResult } from '@/utils/productSearchUtils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyDisplay } from '@/utils/dashboard/currencyUtils';
import { useToast } from '@/components/ui/use-toast';
import { useDebounce } from '@/hooks/useDebounce';

interface EnhancedProductsGridProps {
  storeId: string;
  currency?: string;
  showControlsOnMobile?: boolean;
}

// إنشاء hook جديد للتأخير، استخدمه للبحث بكفاءة
const useDebounceHook = () => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [originalValue, setOriginalValue] = useState<string>('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(originalValue);
      setIsDebouncing(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [originalValue]);

  return {
    debouncedValue,
    originalValue,
    setOriginalValue,
    isDebouncing
  };
};

const EnhancedProductsGrid: React.FC<EnhancedProductsGridProps> = ({ 
  storeId,
  currency = 'SAR',
  showControlsOnMobile = true
}) => {
  // حالة مكون البحث والتصفية
  const [products, setProducts] = useState<ProductSearchResult[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // حالة التصفية
  const [showInStock, setShowInStock] = useState<boolean | null>(null);
  const [sortOption, setSortOption] = useState<string>('similarity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // حالة البحث مع التأخير
  const { debouncedValue, originalValue, setOriginalValue, isDebouncing } = useDebounceHook();
  
  const { toast } = useToast();
  
  // تحميل المنتجات عندما يتغير مصطلح البحث
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const results = await searchProducts(debouncedValue, storeId);
        
        setProducts(results);
      } catch (err) {
        console.error('خطأ في البحث عن المنتجات:', err);
        setError('حدث خطأ أثناء البحث عن المنتجات. يرجى المحاولة مرة أخرى.');
        toast({
          variant: "destructive",
          title: "خطأ في البحث",
          description: err instanceof Error ? err.message : "فشل في تحميل المنتجات",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [debouncedValue, storeId, toast]);
  
  // تطبيق التصفية على المنتجات
  useEffect(() => {
    // تطبيق مرشحات متعددة
    let newFilteredProducts = [...products];
    const newActiveFilters: string[] = [];
    
    // تصفية حسب المخزون
    if (showInStock !== null) {
      newFilteredProducts = newFilteredProducts.filter(product => product.in_stock === showInStock);
      newActiveFilters.push(showInStock ? 'متوفر في المخزون' : 'غير متوفر حاليًا');
    }
    
    // تصفية حسب نطاق السعر
    if (priceRange[0] > 0 || priceRange[1] < 10000) {
      newFilteredProducts = newFilteredProducts.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      newActiveFilters.push(`السعر: ${formatCurrencyDisplay(priceRange[0], currency)} - ${formatCurrencyDisplay(priceRange[1], currency)}`);
    }
    
    // تطبيق الترتيب
    if (sortOption !== 'similarity') {
      switch(sortOption) {
        case 'price-asc':
          newFilteredProducts.sort((a, b) => a.price - b.price);
          newActiveFilters.push('الترتيب: السعر (الأقل إلى الأعلى)');
          break;
        case 'price-desc':
          newFilteredProducts.sort((a, b) => b.price - a.price);
          newActiveFilters.push('الترتيب: السعر (الأعلى إلى الأقل)');
          break;
        case 'name-asc':
          newFilteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          newActiveFilters.push('الترتيب: الاسم (أ-ي)');
          break;
        case 'name-desc':
          newFilteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          newActiveFilters.push('الترتيب: الاسم (ي-أ)');
          break;
        default:
          break;
      }
    } else if (debouncedValue) {
      // ترتيب حسب درجة التشابه عندما يكون هناك بحث نصي
      newActiveFilters.push('الترتيب: الأكثر صلة');
    }
    
    setFilteredProducts(newFilteredProducts);
    setActiveFilters(newActiveFilters);
  }, [products, showInStock, sortOption, priceRange, currency, debouncedValue]);
  
  // إعادة تعيين كل المرشحات
  const resetAllFilters = () => {
    setShowInStock(null);
    setSortOption('similarity');
    setPriceRange([0, 10000]);
  };
  
  // إزالة مرشح واحد محدد
  const removeFilter = (filter: string) => {
    if (filter.startsWith('متوفر')) {
      setShowInStock(null);
    } else if (filter.startsWith('السعر:')) {
      setPriceRange([0, 10000]);
    } else if (filter.startsWith('الترتيب:')) {
      setSortOption('similarity');
    }
  };
  
  // تحضير حالة التحميل
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="w-full bg-white p-4 rounded-xl shadow-sm">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="flex gap-2 mt-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <Skeleton className="h-44 w-full rounded-md mb-3" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // معالجة حالة الخطأ
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">حدث خطأ أثناء تحميل المنتجات</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="border-red-300 text-red-700 hover:bg-red-50"
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }
  
  // عرض عندما لا توجد منتجات
  if (filteredProducts.length === 0) {
    return (
      <div className="space-y-4">
        {/* شريط البحث */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
              placeholder="ابحث عن منتجات..." 
              className="pl-10 bg-gray-50"
            />
            
            {isDebouncing && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="animate-spin h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <SlidersHorizontal className="h-4 w-4 ml-2" />
                  التصفية
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowInStock(true)}>
                  <PackageCheck className="h-4 w-4 ml-2 text-green-500" />
                  متوفر في المخزون
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowInStock(false)}>
                  <PackageX className="h-4 w-4 ml-2 text-red-500" />
                  غير متوفر حاليًا
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={resetAllFilters}>
                  <X className="h-4 w-4 ml-2" />
                  إعادة ضبط التصفية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <ArrowDownUp className="h-4 w-4 ml-2" />
                  الترتيب
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setSortOption('similarity')}>
                  <Star className="h-4 w-4 ml-2 text-amber-500" />
                  الأكثر صلة
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('price-asc')}>
                  <ArrowDownUp className="h-4 w-4 ml-2" />
                  السعر: الأقل إلى الأعلى
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('price-desc')}>
                  <ArrowDownUp className="h-4 w-4 ml-2" />
                  السعر: الأعلى إلى الأقل
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* عرض التصفية النشطة */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center gap-1"
                >
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetAllFilters}
                className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                مسح الكل
              </Button>
            </div>
          )}
        </div>
        
        {/* رسالة لا توجد منتجات */}
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد منتجات</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {originalValue 
              ? `لم نتمكن من العثور على منتجات تطابق "${originalValue}". جرب كلمات أخرى أو قم بإعادة ضبط المرشحات.` 
              : 'لا توجد منتجات متاحة حاليًا بناءً على المرشحات المحددة.'
            }
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {originalValue && (
              <Button 
                variant="outline" 
                onClick={() => setOriginalValue('')}
              >
                مسح البحث
              </Button>
            )}
            
            {activeFilters.length > 0 && (
              <Button onClick={resetAllFilters}>
                إعادة ضبط المرشحات
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // العرض الرئيسي للمنتجات
  return (
    <div className="space-y-4">
      {/* شريط البحث */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            value={originalValue}
            onChange={(e) => setOriginalValue(e.target.value)}
            placeholder="ابحث عن منتجات..." 
            className="pl-10 bg-gray-50"
          />
          
          {isDebouncing && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="animate-spin h-4 w-4 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                <SlidersHorizontal className="h-4 w-4 ml-2" />
                التصفية
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setShowInStock(true)}>
                <PackageCheck className="h-4 w-4 ml-2 text-green-500" />
                متوفر في المخزون
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowInStock(false)}>
                <PackageX className="h-4 w-4 ml-2 text-red-500" />
                غير متوفر حاليًا
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={resetAllFilters}>
                <X className="h-4 w-4 ml-2" />
                إعادة ضبط التصفية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                <ArrowDownUp className="h-4 w-4 ml-2" />
                الترتيب
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setSortOption('similarity')}>
                <Star className="h-4 w-4 ml-2 text-amber-500" />
                الأكثر صلة
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('price-asc')}>
                <ArrowDownUp className="h-4 w-4 ml-2" />
                السعر: الأقل إلى الأعلى
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('price-desc')}>
                <ArrowDownUp className="h-4 w-4 ml-2" />
                السعر: الأعلى إلى الأقل
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* عرض التصفية النشطة */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center gap-1"
              >
                {filter}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetAllFilters}
              className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              مسح الكل
            </Button>
          </div>
        )}
      </div>
      
      {/* عدد المنتجات */}
      <div className="flex justify-between items-center px-1">
        <p className="text-sm text-gray-500">عرض {filteredProducts.length} منتج</p>
      </div>
      
      {/* شبكة المنتجات */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ProductImageGallery
              images={product.image_url || ''}
              alt={product.name}
              showControls={showControlsOnMobile}
              fallbackText="لا توجد صورة للمنتج"
            />
            
            <div className="p-4">
              <h3 className="font-medium text-sm md:text-base line-clamp-2 h-10 md:h-12 mb-1">
                {product.name}
              </h3>
              
              {product.description && (
                <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-2 h-9">
                  {product.description}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm md:text-base">
                  {formatCurrencyDisplay(product.price, currency)}
                </span>
                
                <Badge 
                  variant={product.in_stock ? "default" : "secondary"} 
                  className={product.in_stock 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {product.in_stock ? "متوفر" : "نفذت الكمية"}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedProductsGrid;
