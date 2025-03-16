
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StoreDiscovery from "./pages/StoreDiscovery";
import StorePage from "./pages/StorePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StoreSetup from "./pages/StoreSetup"; 
import Dashboard from "./pages/Dashboard";
import StoreCart from "./pages/store/StoreCart";
import StoreCheckout from "./pages/store/StoreCheckout";
import StoreAuth from "./pages/store/StoreAuth";
import StoreProductDetails from "./pages/store/StoreProductDetails";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

// مكوّن لحماية المسارات التي تتطلب تسجيل الدخول
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };
    
    checkAuth();
    
    // الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-oksale-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
};

// Component to conditionally render navbar based on route
const AppRoutes = () => {
  const location = useLocation();
  // لا نعرض القائمة العلوية في هذه المسارات
  const hideNavbarRoutes = [
    '/signin',
    '/signup',
    '/store-setup',
    '/dashboard'
  ];
  
  // التحقق ما إذا كان المسار الحالي بدون "store/" هو مسار متجر
  // عن طريق التحقق من عدم وجود slash إضافي في المسار بخلاف الأول
  const isStorePath = 
    !location.pathname.startsWith('/signin') && 
    !location.pathname.startsWith('/signup') && 
    !location.pathname.startsWith('/store-setup') && 
    !location.pathname.startsWith('/dashboard') && 
    !location.pathname.startsWith('/explore') && 
    location.pathname !== '/' && 
    !location.pathname.includes('/', 1); // لا يحتوي على / بعد الحرف الأول
  
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route)) || isStorePath;
  
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<StoreDiscovery />} />
        <Route path="/:handle" element={<StorePage />} />
        <Route path="/:handle/product/:productId" element={<StoreProductDetails />} />
        <Route path="/:handle/cart" element={<StoreCart />} />
        <Route path="/:handle/checkout" element={<StoreCheckout />} />
        <Route path="/:handle/login" element={<StoreAuth mode="login" />} />
        <Route path="/:handle/register" element={<StoreAuth mode="register" />} />
        <Route path="/:handle/forgot-password" element={<StoreAuth mode="forgot-password" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/store-setup" element={
          <ProtectedRoute>
            <StoreSetup />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
