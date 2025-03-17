
// This is the same file that was previously at src/pages/public/StoreDiscovery.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StoreCard } from '@/components/StoreCard';
import Footer from '@/components/Footer';

const StoreDiscovery = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .eq('is_active', true);
        
        if (error) throw error;
        
        setStores(data || []);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.description && store.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">اكتشف المتاجر</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ابحث عن أفضل المتاجر واستمتع بتجربة تسوق فريدة مع أفضل المنتجات والعروض الحصرية.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto mb-8">
          <Input
            type="text"
            placeholder="ابحث عن متجر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oksale-600"></div>
          </div>
        ) : (
          <>
            {filteredStores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">لا توجد متاجر مطابقة</h3>
                <p className="text-gray-500">جرب البحث بكلمات مختلفة</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StoreDiscovery;
