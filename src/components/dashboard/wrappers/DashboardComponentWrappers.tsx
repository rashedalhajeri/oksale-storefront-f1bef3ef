
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { useDashboardContext } from '@/context/DashboardContext';

// Lazy load dashboard components
import MainDashboard from '@/components/dashboard/MainDashboard';
import DashboardProducts from '@/components/dashboard/DashboardProducts';
import DashboardOrders from '@/components/dashboard/DashboardOrders';
import DashboardCustomers from '@/components/dashboard/DashboardCustomers';
import DashboardCategories from '@/components/dashboard/DashboardCategories';
import DashboardOffers from '@/components/dashboard/DashboardOffers';
import DashboardSettingsGeneral from '@/components/dashboard/settings/DashboardSettingsGeneral';
import DashboardSettingsAppearance from '@/components/dashboard/settings/DashboardSettingsAppearance';
import DashboardSettingsPayment from '@/components/dashboard/settings/DashboardSettingsPayment';
import DashboardSettingsShipping from '@/components/dashboard/settings/DashboardSettingsShipping';
import DashboardSettingsNotifications from '@/components/dashboard/settings/DashboardSettingsNotifications';
import DashboardSettingsWhatsApp from '@/components/dashboard/settings/DashboardSettingsWhatsApp';
import DashboardSettingsUsers from '@/components/dashboard/settings/DashboardSettingsUsers';

// Loading component for dashboard pages
export const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center">
      <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-500">جارِ تحميل الصفحة...</p>
    </div>
  </div>
);

// Main Dashboard with context
export const MainDashboardWithContext = () => {
  const context = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <MainDashboard 
        statistics={context.statistics || []}
        salesData={context.salesData || []}
        timeframe={context.timeframe || 'week'}
        setTimeframe={context.setTimeframe || (() => {})}
        recentOrders={context.recentOrders || []}
        topProducts={context.topProducts || []}
        orderStatusData={context.orderStatusData || []}
        statsLoading={context.statsLoading || false}
        chartLoading={context.chartLoading || false}
        recentOrdersLoading={context.recentOrdersLoading || false}
        topProductsLoading={context.topProductsLoading || false}
        orderStatusLoading={context.orderStatusLoading || false}
        currency={context.currency || 'SAR'}
      />
    </Suspense>
  );
};

// Products Dashboard with context
export const DashboardProductsWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardProducts storeData={storeData} />
    </Suspense>
  );
};

// Orders Dashboard with context
export const DashboardOrdersWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardOrders storeData={storeData} />
    </Suspense>
  );
};

// Customers Dashboard with context
export const DashboardCustomersWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardCustomers storeData={storeData} />
    </Suspense>
  );
};

// Categories Dashboard with context
export const DashboardCategoriesWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardCategories storeData={storeData} />
    </Suspense>
  );
};

// Offers Dashboard with context
export const DashboardOffersWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardOffers storeData={storeData} />
    </Suspense>
  );
};

// Settings General with context
export const DashboardSettingsGeneralWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsGeneral storeData={storeData} />
    </Suspense>
  );
};

// Settings Appearance with context
export const DashboardSettingsAppearanceWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsAppearance storeData={storeData} />
    </Suspense>
  );
};

// Settings Payment with context
export const DashboardSettingsPaymentWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsPayment storeData={storeData} />
    </Suspense>
  );
};

// Settings Shipping with context
export const DashboardSettingsShippingWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsShipping storeData={storeData} />
    </Suspense>
  );
};

// Settings Notifications with context
export const DashboardSettingsNotificationsWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsNotifications storeData={storeData} />
    </Suspense>
  );
};

// Settings WhatsApp with context
export const DashboardSettingsWhatsAppWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsWhatsApp storeData={storeData} />
    </Suspense>
  );
};

// Settings Users with context
export const DashboardSettingsUsersWithContext = () => {
  const { storeData } = useDashboardContext();
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardSettingsUsers storeData={storeData} />
    </Suspense>
  );
};
