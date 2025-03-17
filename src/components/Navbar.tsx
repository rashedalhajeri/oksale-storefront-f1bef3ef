
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  LogIn, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  User,
  Search,
  ChevronDown
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'تم تسجيل الخروج بنجاح',
        description: 'نتمنى أن نراك مرة أخرى قريباً',
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        {
          'bg-white/95 backdrop-blur-md shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-80 blur-[6px]"></div>
            <span className="relative z-10 text-white font-bold text-xl">OK</span>
          </div>
          <span className="mr-2 font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">OKsale</span>
          <span className="mr-2 px-2 py-1 bg-gray-100 text-xs rounded-full font-semibold text-gray-700">Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            الرئيسية
          </Link>
          <Link to="/explore" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            استكشاف
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              المميزات
              <ChevronDown className="h-4 w-4 mr-1 mt-1 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/features/stores" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                المتاجر
              </Link>
              <Link to="/features/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                لوحة التحكم
              </Link>
              <Link to="/features/marketing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                التسويق
              </Link>
            </div>
          </div>
          <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            الأسعار
          </Link>
        </nav>

        {/* Search */}
        <div className="relative hidden lg:block flex-grow max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث في المتاجر..."
              className="w-full py-2 pr-10 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 h-4 w-4 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <div className="absolute right-3 top-2 text-xs text-gray-400 border border-gray-200 px-1 rounded">⌘K</div>
          </div>
        </div>

        {/* Auth Actions */}
        <div className="hidden sm:flex items-center space-x-4 space-x-reverse">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                  لوحة التحكم
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="flex items-center text-gray-700" 
                onClick={handleLogout}
              >
                <User className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                  <LogIn className="h-4 w-4 ml-2" />
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  إنشاء متجر
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="p-2 text-gray-700 rounded-full hover:bg-gray-100 sm:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`sm:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden py-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/explore" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              استكشاف
            </Link>
            <Link 
              to="/features" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              المميزات
            </Link>
            <Link 
              to="/pricing" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              الأسعار
            </Link>
            
            <div className="py-2 border-t border-gray-100 mt-2">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  <button 
                    className="w-full text-right px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 mt-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    إنشاء متجر
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
