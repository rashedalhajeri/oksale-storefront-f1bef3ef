
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreCard from '@/components/StoreCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag } from 'lucide-react';

// Mock data for stores
const allStores = [
  {
    id: 1,
    name: 'Fashion Boutique',
    owner: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@fashionboutique',
    category: 'Clothing',
    productCount: 45
  },
  {
    id: 2,
    name: 'Tech Gadgets',
    owner: 'Ahmed Hassan',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@techgadgets',
    category: 'Electronics',
    productCount: 32
  },
  {
    id: 3,
    name: 'Home Decor',
    owner: 'Emily Chen',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@homedecor',
    category: 'Home & Living',
    productCount: 68
  },
  {
    id: 4,
    name: 'Eco Friendly',
    owner: 'Michael Green',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@ecofriendly',
    category: 'Sustainable',
    productCount: 27
  },
  {
    id: 5,
    name: 'Artisan Crafts',
    owner: 'Sofia Rodriguez',
    image: 'https://images.unsplash.com/photo-1534705867302-2a41a7ee1fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@artisancrafts',
    category: 'Handmade',
    productCount: 53
  },
  {
    id: 6,
    name: 'Fitness Gear',
    owner: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    handle: '@fitnessgear',
    category: 'Sports',
    productCount: 41
  }
];

const categories = [
  'All Categories',
  'Clothing',
  'Electronics',
  'Home & Living',
  'Sustainable',
  'Handmade',
  'Sports',
  'Food',
  'Beauty',
  'Art'
];

const StoreDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredStores = allStores.filter(store => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.handle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      store.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6 md:px-10 flex-grow">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Amazing Stores</h1>
            <p className="text-oksale-600 max-w-2xl mx-auto">
              Explore our curated collection of independent online stores. Each one is unique, 
              with its own style and products you won't find anywhere else.
            </p>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search stores by name or handle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-oksale-200 form-input"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-oksale-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`whitespace-nowrap ${selectedCategory === category ? 'bg-oksale-800 text-white' : 'border-oksale-200 text-oksale-700 hover:bg-oksale-50'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-scale-in">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <ShoppingBag className="w-16 h-16 mx-auto text-oksale-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No stores found</h3>
              <p className="text-oksale-600">
                We couldn't find any stores matching your search. Try different keywords or categories.
              </p>
            </div>
          )}
          
          {filteredStores.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-oksale-300 hover:bg-oksale-50">
                Load More Stores
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreDiscovery;
