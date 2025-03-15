
import React from 'react';
import { Package, CreditCard, User, ShoppingBag, Star } from 'lucide-react';

const StoreHighlights = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-neutral-800">Store Highlights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">Fast Shipping</h3>
            <p className="text-sm text-neutral-500">2-3 business days</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">Secure Payment</h3>
            <p className="text-sm text-neutral-500">Multiple payment options</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">Quality Products</h3>
            <p className="text-sm text-neutral-500">Curated selection</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">Customer Support</h3>
            <p className="text-sm text-neutral-500">24/7 assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHighlights;
