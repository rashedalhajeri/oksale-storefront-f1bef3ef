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

const OKsaleHeader = () => {
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
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
          {/* Logo */}
          <Link to="/" className="relative flex items-center group">
            <div className="relative rounded-full flex items-center">
              <div className="w-10 h-10 rounded-full bg-oksale-600 flex items-center justify-center shadow-md group-hover:shadow-oksale-300/50 transition-all duration-300">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
              <span className="mr-2 font-bold text-2xl bg-gradient-to-r from-oksale-700 to-oksale-500 bg-clip-text text-transparent">OKsale</span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Empty div since we're removing all navigation links */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {/* Navigation links removed */}
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center border border-gray-200 rounded-full py-1 px-2 mr-2 hover:border-oksale-200 transition-all duration-200">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm mr-1 font-medium text-gray-700">العربية</span>
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="rounded-full border-oksale-200 hover:border-oksale-300 hover:bg-oksale-50 transition-all duration-300">
                    <ShoppingBag className="w-4 h-4 ml-2" />
                    متجري
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
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-oksale-600 hover:bg-oksale-700 text-white rounded-full shadow-sm hover:shadow-oksale-200/50 transition-all duration-300">
                    <Plus className="w-4 h-4 ml-1" />
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/90 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileMenuOpen ? 
              <X className="w-5 h-5 text-oksale-700" /> : 
              <Menu className="w-5 h-5 text-oksale-700" />
            }
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
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
                
                
                {/* Auth Buttons */}
                <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="block px-3 py-2 bg-oksale-50 text-oksale-700 rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingBag className="inline-block w-4 h-4 ml-1" />
                        الذهاب إلى متجري
                      </Link>
                      <button 
                        className="w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-center"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <UserCircle2 className="inline-block w-4 h-4 ml-1" />
                        تسجيل الخروج
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
                        تسجيل الدخول
                      </Link>
                      <Link 
                        to="/signup" 
                        className="block px-3 py-2 bg-oksale-600 text-white rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Plus className="inline-block w-4 h-4 ml-1" />
                        ابدأ الآن
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

// Helper component for desktop navigation links
const NavLink = ({ to, label }: { to: string, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative text-gray-700 font-medium py-2 transition-colors",
        isActive ? "text-oksale-700 font-semibold" : "hover:text-oksale-600"
      )}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="navIndicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-oksale-600 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

// Helper component for mobile navigation links
const MobileNavLink = ({ to, label, onClick }: { to: string, label: string, onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg font-medium transition-all duration-200",
        isActive 
          ? "bg-oksale-50 text-oksale-700" 
          : "text-gray-800 hover:bg-gray-50"
      )}
    >
      {label}
    </Link>
  );
};

export default OKsaleHeader;
