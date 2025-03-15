
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('en');

  // Detect scroll to add shadow to navbar
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

  // Toggle language between English and Arabic
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    // In a real app, you'd update the content language here
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10',
        {
          'glass shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <ShoppingBag className="h-8 w-8" />
          <span className="text-2xl font-bold">OKsale</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-oksale-500 transition-colors">
            {language === 'en' ? 'Home' : 'الرئيسية'}
          </Link>
          <Link to="/explore" className="font-medium hover:text-oksale-500 transition-colors">
            {language === 'en' ? 'Explore Stores' : 'استكشاف المتاجر'}
          </Link>
          <Link to="/how-it-works" className="font-medium hover:text-oksale-500 transition-colors">
            {language === 'en' ? 'How It Works' : 'كيف يعمل'}
          </Link>
          <Link to="/pricing" className="font-medium hover:text-oksale-500 transition-colors">
            {language === 'en' ? 'Pricing' : 'الأسعار'}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            onClick={toggleLanguage} 
            variant="ghost" 
            className="px-3 py-2 rounded-md hover:bg-oksale-100 transition-colors"
          >
            {language === 'en' ? 'ع' : 'EN'}
          </Button>
          
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center space-x-2 border border-oksale-300 bg-transparent hover:bg-oksale-50 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>{language === 'en' ? 'Sign In' : 'تسجيل الدخول'}</span>
          </Button>
          
          <Button 
            className="bg-oksale-800 hover:bg-oksale-900 text-white flex items-center space-x-2 transition-all btn-animation"
          >
            <span>{language === 'en' ? 'Create Store' : 'إنشاء متجر'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
