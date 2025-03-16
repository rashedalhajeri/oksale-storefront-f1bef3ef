import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoreHeader, { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import ProductsGrid from '@/components/ProductsGrid';
import StoreSidebar from '@/components/StoreSidebar';
import { Search, Filter, ShoppingBag, Tag, Sparkles, Clock, Bookmark, Folder, User, Edit, Menu, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const StorePage = () => {
  const {
    handle
  } = useParams<{
    handle: string;
  }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isOwnStore, setIsOwnStore] = useState(false);
  const isMobile = useIsMobile();
  const {
    data: session
  } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const {
        data
      } = await supabase.auth.getSession();
      return data.session;
    }
  });
  const {
    data: userStore,
    isLoading: isLoadingUserStore
  } = useQuery({
    queryKey: ['user-store', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const {
        data,
        error
      } = await supabase.from('stores').select('*, profiles(full_name, email)').eq('owner_id', session.user.id).maybeSingle();
      if (error && error.code !== 'PGRST116') {
        console.error('خطأ في جلب بيانات متجر المستخدم:', error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id
  });
  const {
    data: storeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['store', handle],
    queryFn: async () => {
      if (!handle) {
        if (userStore) {
          return userStore;
        }
        throw new Error('معرف المتجر غير موجود');
      }
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const {
        data,
        error
      } = await supabase.from('stores').select('*, profiles(full_name, email)').eq('handle', cleanHandle).single();
      if (error) {
        console.error('خطأ في جلب بيانات المتجر:', error);
        throw new Error('فشل في جلب بيانات المتجر');
      }
      if (!data) {
        throw new Error('المتجر غير موجود');
      }
      return data;
    },
    enabled: !(!handle && !!userStore),
    meta: {
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "حدث خطأ",
          description: error.message || "فشل في تحميل بيانات المتجر"
        });
      }
    }
  });
  useEffect(() => {
    if (userStore && storeData) {
      setIsOwnStore(userStore.id === storeData.id);
    } else if (!handle && userStore) {
      setIsOwnStore(true);
    } else {
      setIsOwnStore(false);
    }
  }, [userStore, storeData, handle]);
  const products = [{
    id: 1,
    name: 'Classic White Shirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Timeless white cotton shirt with a modern cut.',
    inStock: true,
    category: 'Women',
    isNew: true,
    discount: null,
    rating: 4.7
  }, {
    id: 2,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Classic denim jacket with a vintage wash.',
    inStock: true,
    category: 'Men',
    isNew: false,
    discount: 10,
    rating: 4.5
  }, {
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
  }, {
    id: 4,
    name: 'Cashmere Sweater',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Luxuriously soft cashmere in a relaxed fit.',
    inStock: false,
    category: 'Women',
    isNew: true,
    discount: null,
    rating: 4.8
  }, {
    id: 5,
    name: 'Silk Scarf',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant silk scarf with a unique print.',
    inStock: true,
    category: 'Accessories',
    isNew: false,
    discount: 15,
    rating: 4.6
  }, {
    id: 6,
    name: 'Leather Wallet',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist leather wallet with card slots.',
    inStock: true,
    category: 'Accessories',
    isNew: true,
    discount: null,
    rating: 4.4
  }];
  const categories = ['Women', 'Men', 'Accessories', 'New Arrivals'];
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    console.log(`Loading store data for handle: ${handle || 'current user'}`);
  }, [handle]);
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Women':
        return <Sparkles className="w-4 h-4 mr-2" />;
      case 'Men':
        return <Bookmark className="w-4 h-4 mr-2" />;
      case 'Accessories':
        return <Tag className="w-4 h-4 mr-2" />;
      case 'New Arrivals':
        return <Clock className="w-4 h-4 mr-2" />;
      default:
        return <Folder className="w-4 h-4 mr-2" />;
    }
  };
  const renderMobileCategories = () => {
    return (
      <div className="md:hidden mb-4">
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-2 py-1 px-1">
            <Button
              variant={selectedCategory === 'All' ? "default" : "outline"}
              size="sm"
              className={`shrink-0 ${selectedCategory === 'All' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700'}`}
              onClick={() => setSelectedCategory('All')}
            >
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              All
            </Button>
            
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`shrink-0 ${selectedCategory === category ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'border-neutral-200 text-neutral-700'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(category)}
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };
  if ((isLoading || isLoadingUserStore) && !storeData && !userStore) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات المتجر...</p>
        </div>
      </div>;
  }
  if (error && !userStore) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-red-600 mb-2">تعذر تحميل المتجر</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : "حدث خطأ أثناء محاولة تحميل بيانات المتجر. يرجى المحاولة مرة أخرى."}
          </p>
          <Button className="mt-4" onClick={() => window.location.href = '/'}>
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>;
  }
  const activeStore = storeData || userStore;
  if (!activeStore) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-red-600 mb-2">لا يوجد متجر</h2>
          <p className="text-gray-600">
            لم يتم العثور على متجر. يرجى التأكد من المعرف أو إنشاء متجر جديد.
          </p>
          <Button className="mt-4" onClick={() => window.location.href = '/'}>
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>;
  }
  const storeCurrency = activeStore.currency || 'SAR';
  console.log('Store currency:', storeCurrency);
  const store = {
    id: activeStore.id,
    name: activeStore.name,
    owner: activeStore.profiles?.full_name || 'صاحب المتجر',
    coverImage: activeStore.cover_url || DEFAULT_COVER_IMAGE,
    logo: activeStore.logo_url || '',
    handle: activeStore.handle,
    description: activeStore.description || 'متجر يقدم منتجات عالية الجودة.',
    categories: categories,
    location: activeStore.country || 'غير محدد',
    foundedYear: new Date(activeStore.created_at).getFullYear(),
    rating: 4.8,
    reviewCount: 256,
    featured: activeStore.is_active,
    address: activeStore.address || '',
    socialLinks: {
      instagram: activeStore.instagram || '',
      twitter: activeStore.twitter || '',
      facebook: activeStore.facebook || '',
      website: activeStore.website || '',
      snapchat: activeStore.snapchat || '',
      tiktok: activeStore.tiktok || '',
      whatsapp: activeStore.whatsapp || ''
    }
  };
  return <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-grow">
        <StoreHeader store={store} />
        
        {isOwnStore && (
          <div className="max-w-5xl mx-auto px-4 py-2 mt-4">
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 text-indigo-800">
              <User className="w-5 h-5 text-indigo-500" />
              <span className="flex-grow">أنت تشاهد متجرك الخاص. يمكنك تعديل معلومات المتجر من لوحة التحكم.</span>
              <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.href = '/dashboard'}>
                <Edit className="mr-1 h-4 w-4" />
                إدارة المتجر
              </Button>
            </div>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <div className="mt-4 md:mt-6">
            
            <div className="mb-6 px-0 mx-0 my-0 py-0">
              {renderMobileCategories()}
              
              <div className="hidden md:block mb-6">
                <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <ScrollArea className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none p-0">
                      <TabsTrigger value="All" className="rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2">
                        <ShoppingBag className="mr-1.5 h-4 w-4" />
                        All
                      </TabsTrigger>
                      {categories.map((category, index) => (
                        <TabsTrigger key={index} value={category} className="rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2">
                          {getCategoryIcon(category)}
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>
                </Tabs>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                    className="pl-10 pr-4 py-2 h-10 border-indigo-100 rounded-lg focus:border-indigo-300 focus:ring-indigo-200 bg-white shadow-sm"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 px-4 bg-white border-indigo-100 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-1.5" />
                  Filters
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="hidden md:block">
                <StoreSidebar store={store} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} productCount={filteredProducts.length} />
              </div>
              
              <div className="md:col-span-3">
                <ProductsGrid products={filteredProducts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} currency={storeCurrency} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};

export default StorePage;
