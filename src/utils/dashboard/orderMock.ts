
// This file is kept for backwards compatibility but no longer generates mock data
import { Order } from './orderTypes';

// Return empty array instead of generating mock data
export const generateMockOrders = (storeId: string): Order[] => {
  return [];
};
