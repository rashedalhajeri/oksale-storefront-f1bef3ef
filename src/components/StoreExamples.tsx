
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Globe, ShoppingBag, Store } from 'lucide-react';

type StoreExample = {
  id: string;
  name: string;
  logo: string;
  hasWebsite: boolean;
  hasApp: boolean;
}

const StoreExamples = () => {
  const storeExamples: StoreExample[] = [
    {
      id: "store1",
      name: "عطر الفنادق",
      logo: "/placeholder.svg",
      hasWebsite: true,
      hasApp: false
    },
    {
      id: "store2",
      name: "سولار فري | Solar Free",
      logo: "/placeholder.svg",
      hasWebsite: true,
      hasApp: true
    },
    {
      id: "store3",
      name: "شهد فيت",
      logo: "/placeholder.svg",
      hasWebsite: true,
      hasApp: true
    },
    {
      id: "store4",
      name: "مدارس تالت",
      logo: "/placeholder.svg",
      hasWebsite: true,
      hasApp: true
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">أمثلة المتاجر</h2>
            <div className="w-24 h-1 bg-matajer-600 mx-auto mb-6"></div>
          </motion.div>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto py-8 space-x-6 space-x-reverse hide-scrollbar">
            {storeExamples.map((store, index) => (
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
            ))}
          </div>
          
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          
          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            <div className="w-2 h-2 rounded-full bg-matajer-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreExamples;
