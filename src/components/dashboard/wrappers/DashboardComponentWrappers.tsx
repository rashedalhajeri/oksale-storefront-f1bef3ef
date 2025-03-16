
import React from 'react';
import { useDashboardContext } from '@/context/DashboardContext';

// Original components
import MainDashboard from '../MainDashboard';
import DashboardProducts from '../DashboardProducts';
import DashboardOrders from '../DashboardOrders';
import DashboardCustomers from '../DashboardCustomers';
import DashboardCategories from '../DashboardCategories';
import DashboardMarketingOffers from '../DashboardMarketingOffers';

// Settings components
import DashboardSettingsGeneral from '../settings/DashboardSettingsGeneral';
import DashboardSettingsAppearance from '../settings/DashboardSettingsAppearance';
import DashboardSettingsPayment from '../settings/DashboardSettingsPayment';
import DashboardSettingsShipping from '../settings/DashboardSettingsShipping';
import DashboardSettingsNotifications from '../settings/DashboardSettingsNotifications';
import DashboardSettingsWhatsApp from '../settings/DashboardSettingsWhatsApp';
import DashboardSettingsUsers from '../settings/DashboardSettingsUsers';

// Wrapper for MainDashboard
export const MainDashboardWithContext = () => {
  const contextValues = useDashboardContext();
  
  return (
    <MainDashboard 
      statistics={contextValues.statistics || []}
      salesData={contextValues.salesData || []}
      timeframe={contextValues.timeframe || 'week'}
      setTimeframe={contextValues.setTimeframe || (() => {})}
      recentOrders={contextValues.recentOrders || []}
      topProducts={contextValues.topProducts || []}
      orderStatusData={contextValues.orderStatusData || []}
      statsLoading={contextValues.statsLoading || false}
      chartLoading={contextValues.chartLoading || false}
      recentOrdersLoading={contextValues.recentOrdersLoading || false}
      topProductsLoading={contextValues.topProductsLoading || false}
      orderStatusLoading={contextValues.orderStatusLoading || false}
      currency={contextValues.currency || 'KWD'}
    />
  );
};

// Wrapper for DashboardProducts
export const DashboardProductsWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardProducts storeData={contextValues.storeData} />;
};

// Wrapper for DashboardOrders
export const DashboardOrdersWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardOrders storeData={contextValues.storeData} />;
};

// Wrapper for DashboardCustomers
export const DashboardCustomersWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardCustomers storeData={contextValues.storeData} />;
};

// Wrapper for DashboardCategories
export const DashboardCategoriesWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardCategories storeData={contextValues.storeData} />;
};

// Wrapper for DashboardOffers
export const DashboardOffersWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardMarketingOffers />;
};

// Wrapper for DashboardSettingsGeneral
export const DashboardSettingsGeneralWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsGeneral storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsAppearance
export const DashboardSettingsAppearanceWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsAppearance storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsPayment
export const DashboardSettingsPaymentWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsPayment storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsShipping
export const DashboardSettingsShippingWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsShipping storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsNotifications
export const DashboardSettingsNotificationsWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsNotifications storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsWhatsApp
export const DashboardSettingsWhatsAppWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsWhatsApp storeData={contextValues.storeData} />;
};

// Wrapper for DashboardSettingsUsers
export const DashboardSettingsUsersWithContext = () => {
  const contextValues = useDashboardContext();
  return <DashboardSettingsUsers storeData={contextValues.storeData} />;
};
