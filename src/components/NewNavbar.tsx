
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, ChevronDown, Search, ExternalLink,
  LogIn, Plus, Sparkles, ShoppingBag, UserCircle2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NewNavbar = () => {
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
        ? "bg-white/90 backdrop-blur-md shadow-md py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative flex items-center group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-300"></div>
            <div className="relative rounded-full flex items-center bg-white p-1 pr-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
              <span className="ml-2 font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">OKsale</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <NavigationMenu dir="rtl">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      الرئيسية
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>المميزات</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-[400px] p-4 grid grid-cols-2 gap-3"
                    >
                      <Link to="/features/stores" className="group block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium text-sm">المتاجر</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-700">إنشاء وإدارة متجرك الإلكتروني بسهولة</div>
                      </Link>
                      <Link to="/features/marketing" className="group block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium text-sm">التسويق</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-700">أدوات تسويقية متكاملة لزيادة مبيعاتك</div>
                      </Link>
                      <Link to="/features/dashboard" className="group block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium text-sm">لوحة التحكم</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-700">تحكم بمتجرك مع تحليلات ورؤى متقدمة</div>
                      </Link>
                      <Link to="/features/payments" className="group block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium text-sm">المدفوعات</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-700">حلول دفع آمنة ومتعددة تناسب عملائك</div>
                      </Link>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/explore">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      استكشاف
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/pricing">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      الأسعار
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      المدونة
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Search & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث..."
                className="w-40 py-2 pl-8 pr-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="rounded-full border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    متجري
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-gray-900 rounded-full p-2"
                  onClick={handleLogout}
                >
                  <UserCircle2 className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/signin">
                  <Button variant="ghost" className="hover:bg-gray-100 text-gray-700 rounded-full">
                    <LogIn className="w-4 h-4 ml-1" />
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4 ml-1" />
                    إنشاء متجر
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/90 shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileMenuOpen ? 
              <X className="w-5 h-5 text-gray-700" /> : 
              <Menu className="w-5 h-5 text-gray-700" />
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
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الرئيسية
                </Link>
                
                <div className="px-3 py-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">المميزات</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="pl-4 border-r border-gray-200 space-y-2">
                    <Link to="/features/stores" className="block py-1.5 text-gray-600 hover:text-indigo-600 text-sm">المتاجر</Link>
                    <Link to="/features/marketing" className="block py-1.5 text-gray-600 hover:text-indigo-600 text-sm">التسويق</Link>
                    <Link to="/features/dashboard" className="block py-1.5 text-gray-600 hover:text-indigo-600 text-sm">لوحة التحكم</Link>
                    <Link to="/features/payments" className="block py-1.5 text-gray-600 hover:text-indigo-600 text-sm">المدفوعات</Link>
                  </div>
                </div>
                
                <Link 
                  to="/explore" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  استكشاف
                </Link>
                
                <Link 
                  to="/pricing" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الأسعار
                </Link>
                
                <Link 
                  to="/blog" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  المدونة
                </Link>
                
                {/* Search */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="البحث..."
                      className="w-full py-2 pl-9 pr-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Auth Buttons */}
                <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="block px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingBag className="inline-block w-4 h-4 mr-1" />
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
                        className="block px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Plus className="inline-block w-4 h-4 ml-1" />
                        إنشاء متجر
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

export default NewNavbar;
