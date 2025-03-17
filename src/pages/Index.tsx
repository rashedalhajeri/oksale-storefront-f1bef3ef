
// This is the same file that was previously at src/pages/public/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FeaturedStores from '@/components/FeaturedStores';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <FeaturedStores />
      <Footer />
    </div>
  );
};

export default Index;
