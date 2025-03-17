
import React from 'react';
import { useDashboardContext } from '@/context/DashboardContext';

// Import the new dashboard home component
import DashboardHome from '../home/DashboardHome';

// Import existing components (these will be refactored in later steps)
import DashboardProducts from '../DashboardProducts';
import DashboardOrders from '../DashboardOrders';
import DashboardCustomers from '../DashboardCustomers';
import DashboardCategories from '../DashboardCategories';
import DashboardMarketingOffers from '../DashboardMarketingOffers';
import DashboardSettingsGeneral from '../settings/DashboardSettingsGeneral';
import DashboardSettingsAppearance from '../settings/DashboardSettingsAppearance';
import DashboardSettingsPayment from '../settings/DashboardSettingsPayment';
import DashboardSettingsShipping from '../settings/DashboardSettingsShipping';
import DashboardSettingsNotifications from '../settings/DashboardSettingsNotifications';
import DashboardSettingsWhatsApp from '../settings/DashboardSettingsWhatsApp';
import DashboardSettingsUsers from '../settings/DashboardSettingsUsers';

// Wrapper components that provide context to each dashboard section

export const MainDashboardWithContext = () => {
  return <DashboardHome />;
};

export const DashboardProductsWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardProducts storeData={storeData} />;
};

export const DashboardOrdersWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardOrders storeData={storeData} />;
};

export const DashboardCustomersWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardCustomers storeData={storeData} />;
};

export const DashboardCategoriesWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardCategories storeData={storeData} />;
};

export const DashboardOffersWithContext = () => {
  return <DashboardMarketingOffers />;
};

export const DashboardSettingsGeneralWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsGeneral storeData={storeData} />;
};

export const DashboardSettingsAppearanceWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsAppearance storeData={storeData} />;
};

export const DashboardSettingsPaymentWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsPayment storeData={storeData} />;
};

export const DashboardSettingsShippingWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsShipping storeData={storeData} />;
};

export const DashboardSettingsNotificationsWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsNotifications storeData={storeData} />;
};

export const DashboardSettingsWhatsAppWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsWhatsApp storeData={storeData} />;
};

export const DashboardSettingsUsersWithContext = () => {
  const { storeData } = useDashboardContext();
  return <DashboardSettingsUsers storeData={storeData} />;
};
