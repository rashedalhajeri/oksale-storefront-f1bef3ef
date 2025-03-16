
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Search, ShoppingBag, Filter, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  category: string;
  isNew: boolean;
  discount: number | null;
  rating: number;
}

const StoreSearch: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'relevant');
  const [showFilters, setShowFilters] = useState(false);
  
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

  // Demo products data (in a real application, this would come from the database)
  const demoProducts: Product[] = [
    {
      id: '1',
      name: 'قميص كلاسيكي أبيض',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'قميص قطني أبيض كلاسيكي بقصة عصرية.',
      inStock: true,
      category: 'ملابس نسائية',
      isNew: true,
      discount: null,
      rating: 4.7
    },
    {
      id: '2',
      name: 'جاكيت جينز',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'جاكيت جينز كلاسيكي بغسيل قديم.',
      inStock: true,
      category: 'ملابس رجالية',
      isNew: false,
      discount: 10,
      rating: 4.5
    },
    {
      id: '3',
      name: 'حقيبة جلدية',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'حقيبة جلدية مصنوعة يدويًا مع حزام قابل للتعديل.',
      inStock: true,
      category: 'إكسسوارات',
      isNew: false,
      discount: null,
      rating: 4.9
    },
    {
      id: '4',
      name: 'سترة كشمير',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'سترة كشمير ناعمة بشكل فاخر وقصة مريحة.',
      inStock: false,
      category: 'ملابس نسائية',
      isNew: true,
      discount: null,
      rating: 4.8
    },
    {
      id: '5',
      name: 'وشاح حريري',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'وشاح حريري أنيق بنقشة فريدة.',
      inStock: true,
      category: 'إكسسوارات',
      isNew: false,
      discount: 15,
      rating: 4.6
    },
    {
      id: '6',
      name: 'محفظة جلدية',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'محفظة جلدية بتصميم بسيط مع فتحات للبطاقات.',
      inStock: true,
      category: 'إكسسوارات',
      isNew: true,
      discount: null,
      rating: 4.4
    }
  ];
  
  const categories = [
    'ملابس نسائية',
    'ملابس رجالية',
    'إكسسوارات',
    'أحذية',
    'حقائب',
    'مجوهرات'
  ];
  
  useEffect(() => {
    // Update search params when filters change
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== 'relevant') params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [searchQuery, selectedCategory, sortBy, setSearchParams]);
  
  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPriceRange;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        // Default to relevance sorting (most relevant first)
        // In this example, we'll use a simple rating-based relevance
        return b.rating - a.rating;
    }
  });
  
  const getMainColor = () => {
    if (storeData?.use_custom_colors && storeData?.custom_color) {
      return storeData.custom_color;
    }
    return '#4B5563'; // Default color
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search params are already being updated via the useEffect
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('relevant');
    setPriceRange([0, 1000]);
    setSearchParams(new URLSearchParams());
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: storeData?.currency || 'SAR'
    }).format(amount);
  };
  
  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const mainColor = getMainColor();
  
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
        <Card className="max-w-6xl mx-auto mb-8 shadow-lg overflow-hidden">
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
                <p className="text-sm text-gray-500">البحث في المنتجات</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Mobile Search */}
              <div className="md:col-span-4">
                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="ابحث عن منتجات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    type="submit"
                    style={{ 
                      backgroundColor: mainColor,
                      borderColor: mainColor,
                      '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                    } as React.CSSProperties}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </form>
                
                {/* Active Filters */}
                {(searchQuery || selectedCategory !== 'all' || sortBy !== 'relevant') && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {searchQuery && (
                      <Badge className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200">
                        بحث: {searchQuery}
                        <button onClick={() => setSearchQuery('')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedCategory !== 'all' && (
                      <Badge className="flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-200">
                        التصنيف: {selectedCategory}
                        <button onClick={() => setSelectedCategory('all')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {sortBy !== 'relevant' && (
                      <Badge className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200">
                        الترتيب: {
                          sortBy === 'price-asc' ? 'السعر (الأقل إلى الأعلى)' :
                          sortBy === 'price-desc' ? 'السعر (الأعلى إلى الأقل)' :
                          sortBy === 'name-asc' ? 'الاسم (أ-ي)' :
                          'الاسم (ي-أ)'
                        }
                        <button onClick={() => setSortBy('relevant')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      مسح الكل
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Mobile Filters (Collapsible) */}
              <div className={`md:hidden ${showFilters ? 'block' : 'hidden'} col-span-1 md:col-span-4 mb-4`}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger>التصنيفات</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCategory === 'all' ? 'default' : 'outline'}
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => setSelectedCategory('all')}
                          style={selectedCategory === 'all' ? { 
                            backgroundColor: mainColor,
                            borderColor: mainColor,
                          } as React.CSSProperties : {}}
                        >
                          الكل
                        </Button>
                        
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => setSelectedCategory(category)}
                            style={selectedCategory === category ? { 
                              backgroundColor: mainColor,
                              borderColor: mainColor,
                            } as React.CSSProperties : {}}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger>نطاق السعر</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 pb-2">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={1000}
                          step={10}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>{formatCurrency(priceRange[0])}</span>
                          <span>{formatCurrency(priceRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="sort">
                    <AccordionTrigger>الترتيب حسب</AccordionTrigger>
                    <AccordionContent>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="الترتيب حسب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevant">الأكثر صلة</SelectItem>
                          <SelectItem value="price-asc">السعر (الأقل إلى الأعلى)</SelectItem>
                          <SelectItem value="price-desc">السعر (الأعلى إلى الأقل)</SelectItem>
                          <SelectItem value="name-asc">الاسم (أ-ي)</SelectItem>
                          <SelectItem value="name-desc">الاسم (ي-أ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Desktop Filters (Sidebar) */}
              <div className="hidden md:block md:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">التصنيفات</h3>
                    <div className="space-y-2">
                      <div 
                        className={`cursor-pointer px-3 py-2 rounded-md ${selectedCategory === 'all' ? 'text-white' : 'hover:bg-gray-100'}`}
                        style={selectedCategory === 'all' ? { backgroundColor: mainColor } : {}}
                        onClick={() => setSelectedCategory('all')}
                      >
                        الكل
                      </div>
                      
                      {categories.map((category) => (
                        <div 
                          key={category}
                          className={`cursor-pointer px-3 py-2 rounded-md ${selectedCategory === category ? 'text-white' : 'hover:bg-gray-100'}`}
                          style={selectedCategory === category ? { backgroundColor: mainColor } : {}}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">نطاق السعر</h3>
                    <div className="px-3 pt-2 pb-1">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{formatCurrency(priceRange[0])}</span>
                        <span>{formatCurrency(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">الترتيب حسب</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="الترتيب حسب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevant">الأكثر صلة</SelectItem>
                        <SelectItem value="price-asc">السعر (الأقل إلى الأعلى)</SelectItem>
                        <SelectItem value="price-desc">السعر (الأعلى إلى الأقل)</SelectItem>
                        <SelectItem value="name-asc">الاسم (أ-ي)</SelectItem>
                        <SelectItem value="name-desc">الاسم (ي-أ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="md:col-span-3">
                {sortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">لم يتم العثور على نتائج</h3>
                    <p className="text-gray-500 mb-6">
                      لم نتمكن من العثور على أي منتجات تطابق معايير البحث الخاصة بك.
                    </p>
                    <Button 
                      onClick={clearFilters}
                      style={{ 
                        backgroundColor: mainColor,
                        borderColor: mainColor,
                      } as React.CSSProperties}
                    >
                      مسح المرشحات
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-500">
                        عرض {sortedProducts.length} من المنتجات
                      </p>
                      
                      <div className="hidden md:block">
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="الترتيب حسب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevant">الأكثر صلة</SelectItem>
                            <SelectItem value="price-asc">السعر (الأقل إلى الأعلى)</SelectItem>
                            <SelectItem value="price-desc">السعر (الأعلى إلى الأقل)</SelectItem>
                            <SelectItem value="name-asc">الاسم (أ-ي)</SelectItem>
                            <SelectItem value="name-desc">الاسم (ي-أ)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            description: product.description,
                            inStock: product.inStock,
                            category: product.category,
                            isNew: product.isNew,
                            discount: product.discount,
                            rating: product.rating
                          }}
                          currency={storeData?.currency || 'SAR'}
                          onClick={() => navigate(`/${handle?.replace('@', '')}/product/${product.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreSearch;
