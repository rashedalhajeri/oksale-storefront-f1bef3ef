import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { AuthProvider } from './features/authentication/providers/AuthProvider';
import { LanguageProvider } from './context/LanguageContext';

// Import pages from the correct locations based on the new structure
import MatajerLayout from "./components/MatajerLayout"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StorePage from "./pages/StorePage";
import StoreSetup from "./pages/StoreSetup"; 

// Import dashboard component wrappers
import {
  MainDashboardWithContext,
  DashboardProductsWithContext,
  DashboardOrdersWithContext,
  DashboardCustomersWithContext,
  DashboardCategoriesWithContext,
  DashboardOffersWithContext,
  DashboardSettingsGeneralWithContext,
  DashboardSettingsAppearanceWithContext,
  DashboardSettingsPaymentWithContext,
  DashboardSettingsShippingWithContext,
  DashboardSettingsNotificationsWithContext,
  DashboardSettingsWhatsAppWithContext,
  DashboardSettingsUsersWithContext
} from './components/dashboard/wrappers/DashboardComponentWrappers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // prevent refetching when window regains focus
      staleTime: 1000 * 60 * 5, // data remains fresh for 5 minutes
    },
  },
});

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
        <div className="animate-spin w-6 h-6 border-2 border-indigo-700 border-t-transparent rounded-full"></div>
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
    '/forgot-password',
    '/reset-password',
    '/store-setup',
    '/dashboard'
  ];
  
  // التحقق ما إذا كان المسار الحالي بدون "store/" هو مسار متجر
  // عن طريق التحقق من عدم وجود slash إضافي في المسار بخلاف الأول
  const isStorePath = 
    !location.pathname.startsWith('/signin') && 
    !location.pathname.startsWith('/signup') && 
    !location.pathname.startsWith('/forgot-password') && 
    !location.pathname.startsWith('/reset-password') && 
    !location.pathname.startsWith('/store-setup') && 
    !location.pathname.startsWith('/dashboard') && 
    location.pathname !== '/' && 
    !location.pathname.includes('/', 1); // لا يحتوي على / بعد الحرف الأول
  
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route)) || isStorePath;
  
  return (
    <>
      <Routes>
        <Route path="/" element={<MatajerLayout />} />
        <Route path="/:handle" element={<StorePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/store-setup" element={
          <ProtectedRoute>
            <StoreSetup />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<MainDashboardWithContext />} />
          <Route path="products" element={<DashboardProductsWithContext />} />
          <Route path="orders" element={<DashboardOrdersWithContext />} />
          <Route path="customers" element={<DashboardCustomersWithContext />} />
          <Route path="categories" element={<DashboardCategoriesWithContext />} />
          <Route path="marketing" element={<DashboardOffersWithContext />} />
          <Route path="settings/general" element={<DashboardSettingsGeneralWithContext />} />
          <Route path="settings/appearance" element={<DashboardSettingsAppearanceWithContext />} />
          <Route path="settings/payment" element={<DashboardSettingsPaymentWithContext />} />
          <Route path="settings/shipping" element={<DashboardSettingsShippingWithContext />} />
          <Route path="settings/notifications" element={<DashboardSettingsNotificationsWithContext />} />
          <Route path="settings/whatsapp" element={<DashboardSettingsWhatsAppWithContext />} />
          <Route path="settings/users" element={<DashboardSettingsUsersWithContext />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
