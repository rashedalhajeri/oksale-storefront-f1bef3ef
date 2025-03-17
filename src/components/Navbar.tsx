
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, LogIn, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Detect scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        {
          'bg-white shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70 blur-sm"></div>
            <span className="relative z-10 text-white font-bold text-xl">OK</span>
          </div>
          <span className="mr-2 font-bold text-2xl">OKsale</span>
          <span className="mr-2 px-2 py-1 bg-gray-100 text-xs rounded-full font-semibold">Pro</span>
        </Link>

        {/* Search */}
        <div className="relative hidden sm:block flex-grow max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث في المتاجر..."
              className="w-full py-2 pr-10 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluesky-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 h-4 w-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <div className="absolute right-3 top-2 text-xs text-gray-400 border border-gray-200 px-1 rounded">⌘K</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" className="text-gray-700 hidden sm:flex">
            تسجيل الدخول
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 hidden sm:flex">
            الوصول المطلق <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 sm:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
