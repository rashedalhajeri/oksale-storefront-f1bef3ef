
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoreHeader from '@/components/StoreHeader';
import ProductsGrid from '@/components/ProductsGrid';
import StoreSidebar from '@/components/StoreSidebar';
import { 
  Search,
  Filter,
  ShoppingBag,
  Tag,
  Sparkles,
  Clock,
  Bookmark,
  Folder,
  User,
  Edit
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const StorePage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isOwnStore, setIsOwnStore] = useState(false);
  
  // جلب بيانات المستخدم الحالي إذا كان مسجل دخول
  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });
  
  // جلب متجر المستخدم الحالي إذا كان مسجل دخول
  const { data: userStore, isLoading: isLoadingUserStore } = useQuery({
    queryKey: ['user-store', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*, profiles(full_name, email)')
        .eq('owner_id', session.user.id)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('خطأ في جلب بيانات متجر المستخدم:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!session?.user?.id,
  });
  
  // جلب بيانات المتجر من الرابط
  const { data: storeData, isLoading, error } = useQuery({
    queryKey: ['store', handle],
    queryFn: async () => {
      if (!handle) {
        // إذا لم يكن هناك معرف في الرابط وكان المستخدم مسجل دخول ولديه متجر، نستخدم متجره
        if (userStore) {
          return userStore;
        }
        throw new Error('معرف المتجر غير موجود');
      }
      
      // بحث عن المتجر بالمعرف (إضافة @ إذا لم تكن موجودة)
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*, profiles(full_name, email)')
        .eq('handle', cleanHandle)
        .single();
      
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
  
  // التحقق مما إذا كان المتجر الذي نعرضه هو متجر المستخدم الحالي
  useEffect(() => {
    if (userStore && storeData) {
      setIsOwnStore(userStore.id === storeData.id);
    } else if (!handle && userStore) {
      setIsOwnStore(true);
    } else {
      setIsOwnStore(false);
    }
  }, [userStore, storeData, handle]);
  
  // بيانات المنتجات (ثابتة كما طلبت)
  const products = [
    {
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
    },
    {
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
      name: 'Cashmere Sweater',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Luxuriously soft cashmere in a relaxed fit.',
      inStock: false,
      category: 'Women',
      isNew: true,
      discount: null,
      rating: 4.8
    },
    {
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
    },
    {
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
    }
  ];
  
  // تحديد فئات المنتجات (ثابتة)
  const categories = ['Women', 'Men', 'Accessories', 'New Arrivals'];
  
  // الفلترة حسب البحث والفئة
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

  // عرض رسالة تحميل أثناء جلب بيانات المتجر
  if ((isLoading || isLoadingUserStore) && (!storeData && !userStore)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات المتجر...</p>
        </div>
      </div>
    );
  }

  // عرض رسالة خطأ إذا فشل جلب البيانات ولم يكن لدينا بيانات متجر المستخدم
  if (error && !userStore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-red-600 mb-2">تعذر تحميل المتجر</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : "حدث خطأ أثناء محاولة تحميل بيانات المتجر. يرجى المحاولة مرة أخرى."}
          </p>
          <Button className="mt-4" onClick={() => window.location.href = '/'}>
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  // اختيار المتجر المناسب للعرض (إما متجر من الرابط أو متجر المستخدم الحالي)
  const activeStore = storeData || userStore;
  
  if (!activeStore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-red-600 mb-2">لا يوجد متجر</h2>
          <p className="text-gray-600">
            لم يتم العثور على متجر. يرجى التأكد من المعرف أو إنشاء متجر جديد.
          </p>
          <Button className="mt-4" onClick={() => window.location.href = '/'}>
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  // ترتيب بيانات المتجر بالشكل المناسب للكومبوننت
  const store = {
    id: activeStore.id,
    name: activeStore.name,
    owner: activeStore.profiles?.full_name || 'صاحب المتجر',
    coverImage: activeStore.cover_url || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    logo: activeStore.logo_url || 'https://images.unsplash.com/photo-1589985270958-b90dewe1e358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    handle: activeStore.handle,
    description: activeStore.description || 'متجر يقدم منتجات عالية الجودة.',
    categories: categories, // استخدام الفئات الثابتة
    location: activeStore.country || 'غير محدد',
    foundedYear: new Date(activeStore.created_at).getFullYear(),
    rating: 4.8, // قيمة ثابتة
    reviewCount: 256, // قيمة ثابتة
    featured: activeStore.is_active,
    socialLinks: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-grow">
        <StoreHeader store={store} />
        
        {isOwnStore && (
          <div className="max-w-5xl mx-auto px-4 py-2 mt-4">
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 text-indigo-800">
              <User className="w-5 h-5 text-indigo-500" />
              <span className="flex-grow">أنت تشاهد متجرك الخاص. يمكنك تعديل معلومات المتجر من لوحة التحكم.</span>
              <Button 
                variant="default" 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => window.location.href = '/dashboard'}
              >
                <Edit className="mr-1 h-4 w-4" />
                إدارة المتجر
              </Button>
            </div>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <div className="mt-4 md:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-800">Products</h2>
            </div>
            
            <div className="mb-6">
              <div className="mb-6">
                <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <ScrollArea className="w-full">
                    <div className="pb-4">
                      <Carousel className="w-full max-w-screen-lg mx-auto">
                        <CarouselContent className="-ml-1">
                          <TabsList className="h-12 px-3 bg-white border border-neutral-200 rounded-xl inline-flex w-max gap-2 shadow-sm">
                            <CarouselItem className="basis-auto pl-1 min-w-fit">
                              <TabsTrigger 
                                value="All" 
                                className={`h-9 px-5 text-sm font-medium rounded-lg transition-all ${
                                  selectedCategory === 'All' 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                All Products
                              </TabsTrigger>
                            </CarouselItem>
                            
                            {categories.map((category) => (
                              <CarouselItem key={category} className="basis-auto pl-1 min-w-fit">
                                <TabsTrigger 
                                  value={category} 
                                  className={`h-9 px-5 text-sm font-medium rounded-lg transition-all ${
                                    selectedCategory === category 
                                      ? 'bg-indigo-600 text-white' 
                                      : 'text-neutral-600 hover:bg-neutral-100'
                                  }`}
                                >
                                  {getCategoryIcon(category)}
                                  {category}
                                </TabsTrigger>
                              </CarouselItem>
                            ))}
                          </TabsList>
                        </CarouselContent>
                        <CarouselPrevious className="left-0 bg-white/80 border border-neutral-200" />
                        <CarouselNext className="right-0 bg-white/80 border border-neutral-200" />
                      </Carousel>
                    </div>
                  </ScrollArea>
                </Tabs>
              </div>
              
              <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl border border-neutral-200 shadow-sm">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-neutral-200 w-full h-10"
                  />
                </div>
                <Button variant="outline" className="border-neutral-200 text-neutral-700 h-10">
                  <Filter className="w-4 h-4 mr-1.5" />
                  Filters
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="hidden md:block">
                <StoreSidebar 
                  store={store} 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory}
                  productCount={filteredProducts.length}
                />
              </div>
              
              <div className="md:col-span-3">
                <ProductsGrid 
                  products={filteredProducts} 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StorePage;
