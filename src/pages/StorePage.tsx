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
  Folder
} from 'lucide-react';

const StorePage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const store = {
    id: 1,
    name: 'Fashion Boutique',
    owner: 'Sarah Johnson',
    coverImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1589985270958-b90dewe1e358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    handle: '@fashionboutique',
    description: 'Curated collection of modern, sustainable fashion for the conscious consumer. We focus on quality, ethical production, and timeless style.',
    categories: ['Women', 'Men', 'Accessories', 'New Arrivals'],
    location: 'New York, USA',
    foundedYear: 2018,
    rating: 4.8,
    reviewCount: 256,
    featured: true,
    socialLinks: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com'
    }
  };
  
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
    
    console.log(`Loading store data for handle: @${handle}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-grow">
        <StoreHeader store={store} />
        
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
                            
                            {store.categories.map((category) => (
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
