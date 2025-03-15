
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StoreHeader from '@/components/StoreHeader';
import ProductsGrid from '@/components/ProductsGrid';
import StoreSidebar from '@/components/StoreSidebar';
import { 
  Search,
  Filter,
  ShoppingBag,
  Tag
} from 'lucide-react';

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-grow">
        <StoreHeader store={store} />
        
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          <div className="mt-4 md:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-800">Products</h2>
              
              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-neutral-200 w-full h-9 md:h-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px] h-9 md:h-10 border-neutral-200 bg-white">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-indigo-600" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Products</SelectItem>
                    {store.categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {showFilters && (
              <div className="mb-5 p-3 md:p-4 bg-white rounded-xl shadow-sm animate-fade-in border border-neutral-100">
                <h3 className="font-medium text-neutral-800 mb-2 md:mb-3 text-sm md:text-base">Filters</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <Button
                    variant={selectedCategory === 'All' ? "default" : "outline"}
                    size="sm"
                    className={`h-7 md:h-8 text-xs ${
                      selectedCategory === 'All'
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "border-neutral-200"
                    }`}
                    onClick={() => setSelectedCategory('All')}
                  >
                    All
                  </Button>
                  {store.categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className={`h-7 md:h-8 text-xs ${
                        selectedCategory === category
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "border-neutral-200"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
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
