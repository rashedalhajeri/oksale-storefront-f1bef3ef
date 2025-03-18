
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Store } from 'lucide-react';

export type StoreExampleType = {
  id: string;
  name: string;
  logo: string;
  hasWebsite: boolean;
  hasApp: boolean;
}

interface StoreExampleProps {
  store: StoreExampleType;
  index: number;
}

const StoreExample = ({ store, index }: StoreExampleProps) => {
  return (
    <motion.div
      key={store.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <Store className="w-12 h-12 text-matajer-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">{store.name}</h3>
        <div className="flex space-x-3 space-x-reverse mt-auto">
          {store.hasWebsite && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Globe className="w-4 h-4 text-gray-600" />
            </div>
          )}
          {store.hasApp && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StoreExample;
