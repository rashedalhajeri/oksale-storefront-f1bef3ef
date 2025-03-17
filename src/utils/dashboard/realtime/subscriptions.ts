
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeConfig {
  onNewOrder?: (payload: any) => void;
  onOrderUpdate?: (payload: any) => void;
  onOrderDelete?: (payload: any) => void;
}

export const setupRealtimeSubscriptions = (storeId: string, config: RealtimeConfig) => {
  if (!storeId) {
    console.error('[Realtime] No storeId provided for realtime subscriptions');
    return () => {};
  }

  console.log('[Realtime] Setting up realtime subscriptions for store:', storeId);

  // Enable REPLICA IDENTITY FULL for the orders table to get old record values in updates
  supabase.rpc('dblab_enable_replica_identity', {
    table_name: 'orders'
  }).then(({ error }) => {
    if (error) {
      console.error('[Realtime] Failed to enable REPLICA IDENTITY:', error);
    } else {
      console.log('[Realtime] REPLICA IDENTITY enabled for orders table');
    }
  });

  // Set up the realtime channel for orders-related events
  const channel = supabase
    .channel(`store-orders-${storeId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'orders',
      filter: `store_id=eq.${storeId}`
    }, (payload) => {
      console.log('[Realtime] New order received:', payload);
      if (config.onNewOrder) {
        config.onNewOrder(payload);
      }
    })
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'orders',
      filter: `store_id=eq.${storeId}`
    }, (payload) => {
      console.log('[Realtime] Order updated:', payload);
      if (config.onOrderUpdate) {
        config.onOrderUpdate(payload);
      }
    })
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'orders',
      filter: `store_id=eq.${storeId}`
    }, (payload) => {
      console.log('[Realtime] Order deleted:', payload);
      if (config.onOrderDelete) {
        config.onOrderDelete(payload);
      }
    })
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('[Realtime] Successfully subscribed to orders changes');
      } else if (status === 'CHANNEL_ERROR') {
        console.error('[Realtime] Channel error:', err);
      } else if (status === 'TIMED_OUT') {
        console.error('[Realtime] Subscription timed out');
      } else {
        console.log('[Realtime] Subscription status:', status);
      }
    });

  // Return a cleanup function
  return () => {
    console.log('[Realtime] Cleaning up subscriptions');
    supabase.removeChannel(channel);
  };
};

export const setupRealtime = async (storeId: string) => {
  try {
    const { error } = await supabase
      .from('pgrst_watch')
      .insert([{ table_name: 'orders' }]);

    if (error) {
      console.error('[Realtime Setup] Error setting up realtime:', error);
      return false;
    }

    console.log('[Realtime Setup] Successfully set up realtime for orders');
    return true;
  } catch (err) {
    console.error('[Realtime Setup] Exception setting up realtime:', err);
    return false;
  }
};
