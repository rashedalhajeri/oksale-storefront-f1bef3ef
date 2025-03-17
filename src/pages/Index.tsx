
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBanner from '@/components/TopBanner';
import TechLogos from '@/components/TechLogos';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Top Banner */}
      <TopBanner />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-10 h-10 bg-gradient-to-r from-bluesky-500 to-purple-500 rounded-lg opacity-70 blur-sm"></div>
                  <ShoppingBag className="h-8 w-8 text-white relative z-10" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bluesky-600 to-bluesky-950">OK</span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">sale</span>
                </div>
              </Link>
              <p className="text-gray-500 mt-2 text-sm">© 2023 OKsale. جميع الحقوق محفوظة.</p>
            </div>
            
            <div className="flex space-x-8 space-x-reverse">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">من نحن</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">تواصل معنا</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900">سياسة الخصوصية</Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">شروط الاستخدام</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
