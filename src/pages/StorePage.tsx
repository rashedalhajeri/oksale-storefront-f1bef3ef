import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  Filter,
  Home,
  ExternalLink,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

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
  
  const store = storeData;
  
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Back to OKsale</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Heart className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="relative h-[45vh] overflow-hidden">
          <img
            src={store.coverImage}
            alt={`${store.name} cover`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-700",
              coverLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setCoverLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 text-white p-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white">
                  {store.logo ? (
                    <img
                      src={store.logo}
                      alt={`${store.name} logo`}
                      className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        logoLoaded ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => setLogoLoaded(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
                    {store.featured && (
                      <Badge className="bg-purple-500 text-white">Featured</Badge>
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
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 bg-white shadow-sm rounded-xl p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-gray-50 h-11 p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                  <TabsTrigger value="products" className="data-[state=active]:bg-white">Products</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white">Reviews</TabsTrigger>
                  <TabsTrigger value="shipping" className="data-[state=active]:bg-white">Shipping</TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-white">Contact</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex md:hidden gap-2">
                <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                  <Heart className="w-4 h-4 mr-1" />
                  Follow
                </Button>
                <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  About the Store
                </h2>
                <p className="text-gray-600 leading-relaxed">{store.description}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Connect with us</h3>
                  <div className="flex gap-3">
                    {Object.entries(store.socialLinks).map(([platform, url]) => (
                      <a 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                      >
                        <span className="sr-only">{platform}</span>
                        {platform === 'instagram' && <Instagram className="w-5 h-5" />}
                        {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                        {platform === 'facebook' && <Facebook className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-purple-600" />
                  Store Highlights
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Package, text: 'Fast shipping worldwide', description: 'Get your order delivered in 3-5 business days' },
                    { icon: CreditCard, text: 'Secure payment options', description: 'Multiple payment methods supported' },
                    { icon: User, text: 'Excellent customer service', description: '24/7 support for all your needs' },
                    { icon: ShoppingBag, text: 'Quality guaranteed', description: '30-day money-back guarantee' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-purple-700" />
                        </div>
                        <span className="font-medium text-gray-800">{item.text}</span>
                      </div>
                      <p className="text-sm text-gray-600 pl-13">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
                
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === 'All' ? "default" : "outline"}
                    className={`w-full justify-start ${selectedCategory === 'All' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setSelectedCategory('All')}
                  >
                    All Products
                    <Badge className="ml-auto bg-white/20 text-white">{products.length}</Badge>
                  </Button>
                  
                  {store.categories.map((category, index) => {
                    const count = products.filter(p => p.category === category).length;
                    return (
                      <Button
                        key={index}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`w-full justify-start ${selectedCategory === category ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <Badge className={`ml-auto ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>{count}</Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Tags</h2>
                
                <div className="flex flex-wrap gap-2">
                  {['Summer', 'Sustainable', 'Handmade', 'Organic', 'Vintage', 'Limited Edition', 'Sale'].map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline"
                      className="bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors border-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-6 rounded-xl shadow-sm text-white">
                <h2 className="text-xl font-semibold mb-3">Join Our Newsletter</h2>
                <p className="text-white/80 text-sm mb-4">Stay updated with our latest products and offers.</p>
                
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                  />
                  <Button className="w-full bg-white text-purple-800 hover:bg-white/90">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 w-full"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-gray-200" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="mb-6 p-4 bg-white rounded-xl shadow-sm animate-fade-in border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3">Filters</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                    Price: Low to High
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                    Price: High to Low
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                    Newest First
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                    Most Popular
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
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
              <div className="text-center py-16 bg-white rounded-xl animate-fade-in border border-gray-100">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                <Button 
                  variant="outline" 
                  className="border-gray-200"
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
