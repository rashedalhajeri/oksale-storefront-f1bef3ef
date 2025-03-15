
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Star, 
  Calendar, 
  ArrowRight,
  Heart,
  Share2,
  Search,
  Filter
} from 'lucide-react';

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

// Mock products data
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
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist leather wallet with card slots.',
    inStock: true,
    category: 'Accessories',
    isNew: true,
    discount: null,
    rating: 4.4
  }
];

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // In a real app, you would fetch the store data based on the id
  const store = storeData;
  
  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
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
    <div className="min-h-screen flex flex-col bg-oksale-50/30">
      <Navbar />
      
      <main className="flex-grow">
        {/* Store header with cover image */}
        <div className="relative h-[40vh] overflow-hidden">
          <img
            src={store.coverImage}
            alt={`${store.name} cover`}
            className={`w-full h-full object-cover transition-opacity duration-700 ${coverLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setCoverLoaded(true)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Store quick info */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white">
                  {store.logo ? (
                    <img
                      src={store.logo}
                      alt={`${store.name} logo`}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setLogoLoaded(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-oksale-100 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-oksale-500" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
                    {store.featured && (
                      <Badge className="bg-oksale-500 text-white">Featured</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {store.owner}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {store.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {store.rating} ({store.reviewCount} reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Since {store.foundedYear}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30">
                  <Heart className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Store main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Store navigation and quick actions */}
          <div className="mb-8 bg-white shadow-sm rounded-xl p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <Button variant="ghost" className="px-3 py-2 h-9 text-oksale-700 font-medium hover:bg-oksale-50">Overview</Button>
                <Button variant="ghost" className="px-3 py-2 h-9 text-oksale-700 font-medium hover:bg-oksale-50">Products</Button>
                <Button variant="ghost" className="px-3 py-2 h-9 text-oksale-700 font-medium hover:bg-oksale-50">Reviews</Button>
                <Button variant="ghost" className="px-3 py-2 h-9 text-oksale-700 font-medium hover:bg-oksale-50">Shipping</Button>
                <Button variant="ghost" className="px-3 py-2 h-9 text-oksale-700 font-medium hover:bg-oksale-50">Contact</Button>
              </div>
              
              <div className="flex md:hidden gap-2">
                <Button variant="outline" size="sm" className="text-oksale-700 border-oksale-200">
                  <Heart className="w-4 h-4 mr-1" />
                  Follow
                </Button>
                <Button variant="outline" size="sm" className="text-oksale-700 border-oksale-200">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* About and highlights section */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-oksale-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-oksale-600" />
                  About the Store
                </h2>
                <p className="text-oksale-600 leading-relaxed">{store.description}</p>
                
                <div className="mt-6 pt-6 border-t border-oksale-100">
                  <h3 className="text-lg font-medium mb-3 text-oksale-800">Connect with us</h3>
                  <div className="flex gap-3">
                    {Object.entries(store.socialLinks).map(([platform, url]) => (
                      <a 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-oksale-50 flex items-center justify-center text-oksale-600 hover:bg-oksale-100 hover:text-oksale-800 transition-colors"
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
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-oksale-800 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-oksale-600" />
                  Store Highlights
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Package, text: 'Fast shipping worldwide', description: 'Get your order delivered in 3-5 business days' },
                    { icon: CreditCard, text: 'Secure payment options', description: 'Multiple payment methods supported' },
                    { icon: User, text: 'Excellent customer service', description: '24/7 support for all your needs' },
                    { icon: ShoppingBag, text: 'Quality guaranteed', description: '30-day money-back guarantee' }
                  ].map((item, index) => (
                    <div key={index} className="bg-oksale-50/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-oksale-100 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-oksale-700" />
                        </div>
                        <span className="font-medium text-oksale-800">{item.text}</span>
                      </div>
                      <p className="text-sm text-oksale-600 pl-13">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Categories and tags section */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-oksale-800">Categories</h2>
                
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === 'All' ? "default" : "outline"}
                    className={`w-full justify-start ${selectedCategory === 'All' ? 'bg-oksale-800 text-white' : 'border-oksale-200 text-oksale-700 hover:bg-oksale-50'}`}
                    onClick={() => setSelectedCategory('All')}
                  >
                    All Products
                    <Badge className="ml-auto bg-oksale-100 text-oksale-700">{products.length}</Badge>
                  </Button>
                  
                  {store.categories.map((category, index) => {
                    const count = products.filter(p => p.category === category).length;
                    return (
                      <Button
                        key={index}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`w-full justify-start ${selectedCategory === category ? 'bg-oksale-800 text-white' : 'border-oksale-200 text-oksale-700 hover:bg-oksale-50'}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <Badge className={`ml-auto ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-oksale-100 text-oksale-700'}`}>{count}</Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-oksale-800">Popular Tags</h2>
                
                <div className="flex flex-wrap gap-2">
                  {['Summer', 'Sustainable', 'Handmade', 'Organic', 'Vintage', 'Limited Edition', 'Sale'].map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline"
                      className="bg-oksale-50 text-oksale-700 hover:bg-oksale-100 cursor-pointer transition-colors border-oksale-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-oksale-700 to-oksale-900 p-6 rounded-xl shadow-sm text-white">
                <h2 className="text-xl font-semibold mb-3">Join Our Newsletter</h2>
                <p className="text-white/80 text-sm mb-4">Stay updated with our latest products and offers.</p>
                
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                  />
                  <Button className="w-full bg-white text-oksale-800 hover:bg-white/90">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-oksale-800">Products</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-oksale-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-oksale-200 w-full"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-oksale-200" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="mb-6 p-4 bg-white rounded-xl shadow-sm animate-fade-in">
                <h3 className="font-medium text-oksale-800 mb-3">Filters</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-oksale-200">
                    Price: Low to High
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-oksale-200">
                    Price: High to Low
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-oksale-200">
                    Newest First
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-oksale-200">
                    Most Popular
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-oksale-200">
                    On Sale
                  </Button>
                </div>
              </div>
            )}
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl animate-fade-in">
                <ShoppingBag className="w-12 h-12 text-oksale-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-oksale-800 mb-2">No products found</h3>
                <p className="text-oksale-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                <Button 
                  variant="outline" 
                  className="border-oksale-200"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StorePage;
