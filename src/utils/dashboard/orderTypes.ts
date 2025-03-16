
import { supabase } from '@/integrations/supabase/client';

// Interface for order filter options
export interface OrderOptions {
  page?: number;
  limit?: number;
  status?: string | null;
  search?: string | null;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Order interface for frontend display
export interface Order {
  id: string;
  rawId?: string;
  customer: string;
  email?: string;
  phone?: string | null;
  date?: string;
  relativeTime: string;
  timeColor: string;
  amount: string;
  rawAmount: number;
  status: string;
  statusText: string;
  statusColors: { bg: string; text: string; icon: string };
  currency: string;
  created_at: string;
  store_id?: string;
  total_amount?: number;
  updated_at?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  payment_method?: string;
  shipping_address?: string;
}

// OrderItem interface
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
}

// Pagination state interface
export interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Order status types
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

// Order status colors interface
export interface OrderStatusColors {
  bg: string;
  text: string;
  icon: string;
}

// Order status mapping interface
export interface OrderStatusMapping {
  [key: string]: {
    text: string;
    colors: OrderStatusColors;
  };
}
