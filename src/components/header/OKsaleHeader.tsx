import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Search, 
  LogIn, Plus, ShoppingBag, Globe, UserCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

// Language context for managing app-wide language state
const OKsaleHeader = () => {
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { language, setLanguage, isRTL } = useLanguage();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkAuth();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
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
  
  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'تم تسجيل الخروج بنجاح',
        description: 'نتمنى أن نراك مرة أخرى قريباً',
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="relative flex items-center group">
            <div className="relative rounded-full flex items-center">
              <div className="w-10 h-10 rounded-full bg-oksale-600 flex items-center justify-center shadow-md group-hover:shadow-oksale-300/50 transition-all duration-300">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
              <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} font-bold text-2xl bg-gradient-to-r from-oksale-700 to-oksale-500 bg-clip-text text-transparent`}>OKsale</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          </div>
          
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <button 
              onClick={toggleLanguage}
              className="flex items-center border border-gray-200 rounded-full py-1 px-2 mr-2 hover:border-oksale-200 transition-all duration-200"
              aria-label={language === 'ar' ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm mx-1 font-medium text-gray-700">
                {language === 'ar' ? 'E' : 'ع'}
              </span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="rounded-full border-oksale-200 hover:border-oksale-300 hover:bg-oksale-50 transition-all duration-300">
                    <ShoppingBag className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'متجري' : 'My Store'}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-oksale-800 rounded-full p-2 hover:bg-oksale-50 transition-all duration-300"
                  onClick={handleLogout}
                >
                  <UserCircle2 className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/signin">
                  <Button variant="ghost" className="hover:bg-oksale-50 text-gray-700 hover:text-oksale-700 rounded-full transition-all duration-300">
                    <LogIn className="w-4 h-4 ml-1" />
                    {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-oksale-600 hover:bg-oksale-700 text-white rounded-full shadow-sm hover:shadow-oksale-200/50 transition-all duration-300">
                    <Plus className="w-4 h-4 ml-1" />
                    {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full bg-white/90 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? (language === 'ar' ? "إغلاق القائمة" : "Close Menu") : (language === 'ar' ? "فتح القائمة" : "Open Menu")}
          >
            {mobileMenuOpen ? 
              <X className="w-5 h-5 text-oksale-700" /> : 
              <Menu className="w-5 h-5 text-oksale-700" />
            }
          </button>
        </nav>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-center border border-gray-200 rounded-lg py-2 hover:bg-gray-50"
                >
                  <Globe className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'Switch to English (E)' : 'التبديل إلى العربية (ع)'}
                  </span>
                </button>
                
                <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="block px-3 py-2 bg-oksale-50 text-oksale-700 rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingBag className="inline-block w-4 h-4 ml-1" />
                        {language === 'ar' ? 'الذهاب إلى متجري' : 'Go to My Store'}
                      </Link>
                      <button 
                        className="w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-center"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <UserCircle2 className="inline-block w-4 h-4 ml-1" />
                        {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/signin" 
                        className="block px-3 py-2 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="inline-block w-4 h-4 ml-1" />
                        {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                      </Link>
                      <Link 
                        to="/signup" 
                        className="block px-3 py-2 bg-oksale-600 text-white rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Plus className="inline-block w-4 h-4 ml-1" />
                        {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default OKsaleHeader;
