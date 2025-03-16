
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, LogIn, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('ar'); // نبدأ باللغة العربية
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10',
        {
          'glass-morphism shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-gradient-to-r from-bluesky-500 to-purple-500 rounded-lg opacity-70 blur-sm"></div>
            <ShoppingBag className="h-8 w-8 text-white relative z-10" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bluesky-600 to-bluesky-950">OK</span>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">sale</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-bluesky-600 transition-colors">
            {language === 'en' ? 'Home' : 'الرئيسية'}
          </Link>
          <Link to="/explore" className="font-medium hover:text-bluesky-600 transition-colors">
            {language === 'en' ? 'Explore Stores' : 'استكشاف المتاجر'}
          </Link>
          <Link to="/how-it-works" className="font-medium hover:text-bluesky-600 transition-colors">
            {language === 'en' ? 'How It Works' : 'كيف يعمل'}
          </Link>
          <Link to="/pricing" className="font-medium hover:text-bluesky-600 transition-colors">
            {language === 'en' ? 'Pricing' : 'الأسعار'}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            onClick={toggleLanguage} 
            variant="ghost" 
            className="px-3 py-2 rounded-md hover:bg-bluesky-100 transition-colors"
          >
            {language === 'en' ? 'ع' : 'EN'}
          </Button>
          
          <Button 
            variant="outline" 
            className="border border-bluesky-200 bg-white/70 backdrop-blur-sm hover:bg-bluesky-50 transition-colors"
            onClick={() => navigate('/signin')}
          >
            <LogIn className="h-4 w-4 ml-2" />
            <span>{language === 'en' ? 'Sign In' : 'تسجيل الدخول'}</span>
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-bluesky-600 to-bluesky-700 hover:from-bluesky-700 hover:to-bluesky-800 text-white transition-all glow-button"
            onClick={() => navigate('/signup')}
          >
            <Sparkles className="h-4 w-4 ml-2" />
            <span>{language === 'en' ? 'Create Store' : 'إنشاء متجر'}</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-10 bg-white dark:bg-gray-900 md:hidden animate-fade-in">
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col gap-6 py-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium hover:text-bluesky-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
                <Link 
                  to="/explore" 
                  className="text-lg font-medium hover:text-bluesky-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Explore Stores' : 'استكشاف المتاجر'}
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="text-lg font-medium hover:text-bluesky-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'How It Works' : 'كيف يعمل'}
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-lg font-medium hover:text-bluesky-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Pricing' : 'الأسعار'}
                </Link>
              </nav>
              
              <div className="mt-auto mb-8 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border border-bluesky-200 bg-white/70 backdrop-blur-sm hover:bg-bluesky-50 transition-colors"
                  onClick={() => {
                    navigate('/signin');
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4 ml-2" />
                  <span>{language === 'en' ? 'Sign In' : 'تسجيل الدخول'}</span>
                </Button>
                
                <Button 
                  className="w-full bg-gradient-to-r from-bluesky-600 to-bluesky-700 hover:from-bluesky-700 hover:to-bluesky-800 text-white transition-all"
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Sparkles className="h-4 w-4 ml-2" />
                  <span>{language === 'en' ? 'Create Store' : 'إنشاء متجر'}</span>
                </Button>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => {
                      toggleLanguage();
                      setMobileMenuOpen(false);
                    }} 
                    variant="ghost" 
                    className="px-3 py-2 rounded-md hover:bg-bluesky-100 transition-colors"
                  >
                    {language === 'en' ? 'ع' : 'EN'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
