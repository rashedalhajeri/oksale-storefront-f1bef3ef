
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StoreDiscovery from "./pages/StoreDiscovery";
import StorePage from "./pages/StorePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StoreSetup from "./pages/StoreSetup"; 
import Dashboard from "./pages/Dashboard";
import { useEffect, useState, lazy, Suspense } from "react";
import { supabase } from "./integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Lazy load dashboard components
const MainDashboard = lazy(() => import('@/components/dashboard/MainDashboard'));
const DashboardProducts = lazy(() => import('@/components/dashboard/DashboardProducts'));
const DashboardOrders = lazy(() => import('@/components/dashboard/DashboardOrders'));
const DashboardCustomers = lazy(() => import('@/components/dashboard/DashboardCustomers'));
const DashboardCategories = lazy(() => import('@/components/dashboard/DashboardCategories'));
const DashboardOffers = lazy(() => import('@/components/dashboard/DashboardOffers'));
const DashboardSettingsGeneral = lazy(() => import('@/components/dashboard/settings/DashboardSettingsGeneral'));
const DashboardSettingsAppearance = lazy(() => import('@/components/dashboard/settings/DashboardSettingsAppearance'));
const DashboardSettingsPayment = lazy(() => import('@/components/dashboard/settings/DashboardSettingsPayment'));
const DashboardSettingsShipping = lazy(() => import('@/components/dashboard/settings/DashboardSettingsShipping'));
const DashboardSettingsNotifications = lazy(() => import('@/components/dashboard/settings/DashboardSettingsNotifications'));
const DashboardSettingsWhatsApp = lazy(() => import('@/components/dashboard/settings/DashboardSettingsWhatsApp'));
const DashboardSettingsUsers = lazy(() => import('@/components/dashboard/settings/DashboardSettingsUsers'));

// Loading component for dashboard pages
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center">
      <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-500">جارِ تحميل الصفحة...</p>
    </div>
  </div>
);

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
        <div className="animate-spin w-6 h-6 border-2 border-oksale-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
};

// DashboardRoutes component to handle nested dashboard routes
const DashboardRoutes = () => {
  return (
    <ProtectedRoute>
      <Dashboard>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="" element={<MainDashboard />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="customers" element={<DashboardCustomers />} />
            <Route path="categories" element={<DashboardCategories />} />
            <Route path="marketing" element={<DashboardOffers />} />
            <Route path="settings/general" element={<DashboardSettingsGeneral />} />
            <Route path="settings/appearance" element={<DashboardSettingsAppearance />} />
            <Route path="settings/payment" element={<DashboardSettingsPayment />} />
            <Route path="settings/shipping" element={<DashboardSettingsShipping />} />
            <Route path="settings/notifications" element={<DashboardSettingsNotifications />} />
            <Route path="settings/whatsapp" element={<DashboardSettingsWhatsApp />} />
            <Route path="settings/users" element={<DashboardSettingsUsers />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Dashboard>
    </ProtectedRoute>
  );
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/store-setup" element={
          <ProtectedRoute>
            <StoreSetup />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
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
