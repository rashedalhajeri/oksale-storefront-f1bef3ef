
import React, { createContext, useContext } from 'react';
import { Order } from '@/utils/dashboard/orderTypes';

// Define the context type
export interface DashboardContextType {
  storeData: any;
  statistics?: any[];
  salesData?: any[];
  timeframe?: string;
  setTimeframe?: (value: string) => void;
  recentOrders?: Order[]; // Now explicitly typed as Order[] array
  topProducts?: any[];
  orderStatusData?: any[];
  statsLoading?: boolean;
  chartLoading?: boolean;
  recentOrdersLoading?: boolean;
  topProductsLoading?: boolean;
  orderStatusLoading?: boolean;
  currency?: string;
  [key: string]: any;
}

// Create the context with default values
export const DashboardContext = createContext<DashboardContextType>({
  storeData: null,
  recentOrders: [], // Provide empty array as default
});

// Custom hook to use dashboard context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
