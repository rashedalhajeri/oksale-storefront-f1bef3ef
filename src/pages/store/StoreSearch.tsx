
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ShoppingBag, Search, Filter, X, Sliders, Tag, ChevronDown, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import ProductCard from '@/components/ProductCard';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Slider
} from "@/components/ui/slider";

// Mock product interface - this should match your database schema
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  category?: string;
  isNew?: boolean;
  discount?: number | null;
  rating?: number;
}

// Define filter state interface
interface FilterState {
  priceRange: [number, number];
  categories: string[];
  availability: string | null;
  sort: string;
}

const StoreSearch: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    availability: null,
    sort: 'featured'
  });
  
  // Mock categories for filtering
  const categories = ['Clothing', 'Electronics', 'Home', 'Beauty', 'Sports'];
  
  // Fetch store data
  const { data: storeData, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store-search', handle],
    queryFn: async () => {
      if (!handle) throw new Error('معرف المتجر غير موجود');
      
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const { data, error } = await supabase
        .from('stores')
        .select('id, name, logo_url, cover_url, handle, currency, custom_color, use_custom_colors')
        .eq('handle', cleanHandle)
        .single();
      
      if (error) throw error;
      return data;
    },
    meta: {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "خطأ في تحميل بيانات المتجر",
          description: error.message
        });
      }
    }
  });
  
  // Mock products data - this would be replaced with actual API calls
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Timeless white cotton shirt with a modern cut.',
      inStock: true,
      category: 'Clothing',
      isNew: true,
      discount: null,
      rating: 4.7
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Classic denim jacket with a vintage wash.',
      inStock: true,
      category: 'Clothing',
      isNew: false,
      discount: 10,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Leather Crossbody Bag',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted leather bag with adjustable strap.',
      inStock: true,
      category: 'Accessories',
      isNew: false,
      discount: null,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Premium noise-cancelling wireless headphones.',
      inStock: true,
      category: 'Electronics',
      isNew: true,
      discount: 5,
      rating: 4.8
    },
    {
      id: 5,
      name: 'Ceramic Plant Pot',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1622444500303-2064495ecad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Modern ceramic pot for small to medium plants.',
      inStock: false,
      category: 'Home',
      isNew: false,
      discount: null,
      rating: 4.3
    },
    {
      id: 6,
      name: 'Fitness Tracker Watch',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Smart fitness watch with heart rate monitoring.',
      inStock: true,
      category: 'Electronics',
      isNew: true,
      discount: null,
      rating: 4.6
    },
  ];
  
  // Apply filters to products
  const filteredProducts = mockProducts.filter(product => {
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && product.category && 
        !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Availability filter
    if (filters.availability === 'in-stock' && !product.inStock) {
      return false;
    }
    if (filters.availability === 'out-of-stock' && product.inStock) {
      return false;
    }
    
    return true;
  });
  
  // Sort products based on the selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default: // featured or any other
        return 0;
    }
  });
  
  const toggleCategory = (category: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
    updateActiveFilters();
  };
  
  const setPriceRange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
    updateActiveFilters();
  };
  
  const setAvailability = (availability: string | null) => {
    setFilters(prev => ({ ...prev, availability }));
    updateActiveFilters();
  };
  
  const setSortOption = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
  };
  
  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      categories: [],
      availability: null,
      sort: 'featured'
    });
    setActiveFilters([]);
  };
  
  const updateActiveFilters = () => {
    const active: string[] = [];
    
    // Add price range if not default
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      active.push(`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`);
    }
    
    // Add categories
    filters.categories.forEach(category => {
      active.push(`Category: ${category}`);
    });
    
    // Add availability
    if (filters.availability) {
      active.push(`Availability: ${filters.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}`);
    }
    
    setActiveFilters(active);
  };
  
  const removeFilter = (filter: string) => {
    // Parse the filter string to determine which filter to remove
    if (filter.startsWith('Category: ')) {
      const category = filter.replace('Category: ', '');
      toggleCategory(category);
    } else if (filter.startsWith('Price: ')) {
      setPriceRange([0, 1000]);
    } else if (filter.startsWith('Availability: ')) {
      setAvailability(null);
    }
  };
  
  useEffect(() => {
    updateActiveFilters();
  }, [filters]);
  
  const getMainColor = () => {
    if (storeData?.use_custom_colors && storeData?.custom_color) {
      return storeData.custom_color;
    }
    return '#4B5563'; // Default color
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: storeData?.currency || 'SAR'
    }).format(amount);
  };
  
  const mainColor = getMainColor();
  
  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Store Header Background */}
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${storeData?.cover_url || DEFAULT_COVER_IMAGE})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <Link 
            to={`/${handle?.replace('@', '')}`} 
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>العودة للمتجر</span>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 z-10 pb-16">
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-3 bg-white flex items-center justify-center">
                {storeData?.logo_url ? (
                  <img 
                    src={storeData.logo_url} 
                    alt={`${storeData.name} logo`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{storeData?.name || 'المتجر'}</CardTitle>
                <p className="text-sm text-gray-500">بحث المنتجات</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="md:hidden flex-grow"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <Sliders className="h-4 w-4 mr-2" />
                      فلترة
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85vw] max-w-sm">
                    <SheetHeader>
                      <SheetTitle>خيارات التصفية</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      {/* Mobile Filters - same as desktop but styled for mobile */}
                      <div className="space-y-6">
                        {/* Sort Options */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">الترتيب حسب</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'featured', label: 'المميزة' },
                              { id: 'newest', label: 'الأحدث' },
                              { id: 'price-low-high', label: 'السعر: الأقل للأعلى' },
                              { id: 'price-high-low', label: 'السعر: الأعلى للأقل' },
                              { id: 'rating', label: 'التقييم' }
                            ].map((option) => (
                              <Button 
                                key={option.id}
                                variant={filters.sort === option.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSortOption(option.id)}
                                className={filters.sort === option.id ? 
                                  `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}
                                style={filters.sort === option.id ? 
                                  { backgroundColor: mainColor, borderColor: mainColor } : {}}
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Price Range */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">نطاق السعر</h3>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 1000]}
                              min={0}
                              max={1000}
                              step={10}
                              value={[filters.priceRange[0], filters.priceRange[1]]}
                              onValueChange={(value) => setPriceRange([value[0], value[1]])}
                              className="mb-6"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>{formatCurrency(filters.priceRange[0])}</span>
                              <span>{formatCurrency(filters.priceRange[1])}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Categories */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">الفئات</h3>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`flex justify-start w-full ${filters.categories.includes(category) ? 'border-2' : 'border'}`}
                                  style={filters.categories.includes(category) ? 
                                    { borderColor: mainColor, color: mainColor } : {}}
                                  onClick={() => toggleCategory(category)}
                                >
                                  <span className="flex-grow text-start">{category}</span>
                                  {filters.categories.includes(category) && (
                                    <X className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Availability */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">التوفر</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={filters.availability === 'in-stock' ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAvailability(filters.availability === 'in-stock' ? null : 'in-stock')}
                              className={filters.availability === 'in-stock' ? 
                                `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}
                              style={filters.availability === 'in-stock' ? 
                                { backgroundColor: mainColor, borderColor: mainColor } : {}}
                            >
                              متوفر
                            </Button>
                            <Button
                              variant={filters.availability === 'out-of-stock' ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAvailability(filters.availability === 'out-of-stock' ? null : 'out-of-stock')}
                              className={filters.availability === 'out-of-stock' ? 
                                `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}
                              style={filters.availability === 'out-of-stock' ? 
                                { backgroundColor: mainColor, borderColor: mainColor } : {}}
                            >
                              غير متوفر
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="w-full"
                          onClick={clearAllFilters}
                        >
                          إعادة ضبط الفلاتر
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button 
                  variant="outline" 
                  className="hidden md:flex items-center"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  الفلاتر
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center md:min-w-[140px]"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {filters.sort === 'featured' && 'المميزة'}
                  {filters.sort === 'newest' && 'الأحدث'}
                  {filters.sort === 'price-low-high' && 'السعر: تصاعدي'}
                  {filters.sort === 'price-high-low' && 'السعر: تنازلي'}
                  {filters.sort === 'rating' && 'التقييم'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-1 text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700 px-2 h-7"
                  onClick={clearAllFilters}
                >
                  مسح الكل
                </Button>
              </div>
            )}
            
            {/* Desktop filters panel */}
            {isFilterOpen && (
              <div className="hidden md:block mb-8 p-4 bg-gray-50 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">نطاق السعر</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 1000]}
                        min={0}
                        max={1000}
                        step={10}
                        value={[filters.priceRange[0], filters.priceRange[1]]}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        className="mb-6"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{formatCurrency(filters.priceRange[0])}</span>
                        <span>{formatCurrency(filters.priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">الفئات</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`flex justify-start w-full ${filters.categories.includes(category) ? 'border-2' : 'border'}`}
                            style={filters.categories.includes(category) ? 
                              { borderColor: mainColor, color: mainColor } : {}}
                            onClick={() => toggleCategory(category)}
                          >
                            <span className="flex-grow text-start">{category}</span>
                            {filters.categories.includes(category) && (
                              <X className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">التوفر</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={filters.availability === 'in-stock' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAvailability(filters.availability === 'in-stock' ? null : 'in-stock')}
                        className={filters.availability === 'in-stock' ? 
                          `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}
                        style={filters.availability === 'in-stock' ? 
                          { backgroundColor: mainColor, borderColor: mainColor } : {}}
                      >
                        متوفر
                      </Button>
                      <Button
                        variant={filters.availability === 'out-of-stock' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAvailability(filters.availability === 'out-of-stock' ? null : 'out-of-stock')}
                        className={filters.availability === 'out-of-stock' ? 
                          `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}
                        style={filters.availability === 'out-of-stock' ? 
                          { backgroundColor: mainColor, borderColor: mainColor } : {}}
                      >
                        غير متوفر
                      </Button>
                    </div>
                  </div>
                  
                  {/* Sort Options */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">الترتيب حسب</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'featured', label: 'المميزة' },
                        { id: 'newest', label: 'الأحدث' },
                        { id: 'price-low-high', label: 'السعر: الأقل للأعلى' },
                        { id: 'price-high-low', label: 'السعر: الأعلى للأقل' },
                        { id: 'rating', label: 'التقييم' }
                      ].map((option) => (
                        <Button 
                          key={option.id}
                          variant={filters.sort === option.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortOption(option.id)}
                          className={`justify-start w-full ${filters.sort === option.id ? 
                            `bg-[${mainColor}] hover:bg-[${mainColor}]/90` : ""}`}
                          style={filters.sort === option.id ? 
                            { backgroundColor: mainColor, borderColor: mainColor } : {}}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </div>
              </div>
            )}
            
            {/* Products grid */}
            {sortedProducts.length > 0 ? (
              <div>
                <div className="text-sm text-gray-500 mb-4">
                  <span>{sortedProducts.length} منتج</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      currency={storeData?.currency || 'SAR'}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد منتجات</h3>
                <p className="text-gray-500 mb-6">لم نتمكن من العثور على منتجات تطابق معايير البحث الخاصة بك.</p>
                <Button 
                  onClick={clearAllFilters}
                  style={{ 
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                  }}
                >
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreSearch;
