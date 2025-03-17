
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CustomersRealtimeOptions {
  storeId: string;
  autoRefetch?: () => void;
}

export const useCustomersRealtime = ({
  storeId,
  autoRefetch
}: CustomersRealtimeOptions) => {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  // إعداد اشتراكات في الوقت الحقيقي
  useEffect(() => {
    if (!storeId) return;

    console.log('[Customers Realtime] Setting up realtime subscriptions for store:', storeId);

    // إنشاء قناة للمراقبة
    const channel = supabase
      .channel(`customers-${storeId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'customers',
          filter: `store_id=eq.${storeId}`
        },
        (payload) => {
          console.log('[Customers Realtime] Customer data changed:', payload);
          setLastUpdateTime(new Date());

          // استدعاء وظيفة إعادة التحميل التلقائية إذا تم توفيرها
          if (autoRefetch && typeof autoRefetch === 'function') {
            setTimeout(() => {
              autoRefetch();
            }, 1000);
          }
        }
      )
      .subscribe((status) => {
        console.log(`[Customers Realtime] Subscription status: ${status}`);
      });

    // تنظيف الاشتراكات عند تفكيك المكون
    return () => {
      console.log('[Customers Realtime] Cleaning up subscriptions');
      supabase.removeChannel(channel);
    };
  }, [storeId, autoRefetch]);

  return {
    lastUpdateTime
  };
};
