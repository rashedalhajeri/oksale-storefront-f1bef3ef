
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, User, Package, CreditCard } from 'lucide-react';

// Mock store data
const storeData = {
  id: 1,
  name: 'Fashion Boutique',
  owner: 'Sarah Johnson',
  coverImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
  logo: 'https://images.unsplash.com/photo-1589985270958-b90dewe1e358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
  handle: '@fashionboutique',
  description: 'Curated collection of modern, sustainable fashion for the conscious consumer. We focus on quality, ethical production, and timeless style.',
  categories: ['Women', 'Men', 'Accessories', 'New Arrivals'],
  socialLinks: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com'
  }
};

// Mock products data
const products = [
  {
    id: 1,
    name: 'Classic White Shirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Timeless white cotton shirt with a modern cut.',
    inStock: true
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Classic denim jacket with a vintage wash.',
    inStock: true
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted leather bag with adjustable strap.',
    inStock: true
  },
  {
    id: 4,
    name: 'Cashmere Sweater',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Luxuriously soft cashmere in a relaxed fit.',
    inStock: false
  },
  {
    id: 5,
    name: 'Silk Scarf',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant silk scarf with a unique print.',
    inStock: true
  },
  {
    id: 6,
    name: 'Leather Wallet',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist leather wallet with card slots.',
    inStock: true
  }
];

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // In a real app, you would fetch the store data based on the id
  const store = storeData;
  
  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'New Arrivals'; // Mock filter
    
    return matchesSearch && matchesCategory;
  });
  
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="pt-16 flex-grow">
        {/* Store header with cover image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={store.coverImage}
            alt={`${store.name} cover`}
            className={`w-full h-full object-cover transition-opacity duration-700 ${coverLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setCoverLoaded(true)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Store info section */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative -mt-16 md:-mt-20 mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end animate-slide-up">
            {/* Store logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
              <div className="w-full h-full bg-oksale-100 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-oksale-500" />
              </div>
            </div>
            
            {/* Store details */}
            <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold">{store.name}</h1>
              <p className="text-oksale-600 mt-1">{store.handle} · By {store.owner}</p>
            </div>
            
            {/* Social links */}
            <div className="mt-4 md:mt-0 flex space-x-2">
              {Object.entries(store.socialLinks).map(([platform, url]) => (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-oksale-600 hover:text-oksale-800 transition-colors"
                >
                  <span className="sr-only">{platform}</span>
                  {platform === 'instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {platform === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  )}
                  {platform === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Store description and highlights */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-3">About the Store</h2>
              <p className="text-oksale-600">{store.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Store Highlights</h2>
              <div className="space-y-3">
                {[
                  { icon: Package, text: 'Fast shipping worldwide' },
                  { icon: CreditCard, text: 'Secure payment options' },
                  { icon: User, text: 'Excellent customer service' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-oksale-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-oksale-700" />
                    </div>
                    <span className="text-oksale-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product filtering and search */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center animate-fade-in">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === 'All' ? "default" : "outline"}
                className={`whitespace-nowrap ${selectedCategory === 'All' ? 'bg-oksale-800 text-white' : 'border-oksale-200 text-oksale-700 hover:bg-oksale-50'}`}
                onClick={() => setSelectedCategory('All')}
              >
                All Products
              </Button>
              
              {store.categories.map((category, index) => (
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
            
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-oksale-200 form-input"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-oksale-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StorePage;
