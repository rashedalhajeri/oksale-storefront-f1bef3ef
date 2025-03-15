
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import StoreCard from './StoreCard';

// Mock data for featured stores
const featuredStores = [
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
  }
];

const FeaturedStores = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.text-reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.text-reveal');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-10 bg-oksale-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-oksale-700 font-medium text-reveal">Discover</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-reveal" style={{ transitionDelay: '0.1s' }}>
              Featured Stores
            </h2>
            <p className="text-oksale-600 mt-4 max-w-xl text-reveal" style={{ transitionDelay: '0.2s' }}>
              Explore some of the most popular stores on OKsale and get inspired to create your own unique online store.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-6 md:mt-0 border-oksale-300 hover:bg-oksale-100 transition-colors text-reveal self-start md:self-auto"
            style={{ transitionDelay: '0.3s' }}
          >
            View All Stores
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStores.map((store, index) => (
            <div key={store.id} className="text-reveal" style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
              <StoreCard store={store} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStores;
