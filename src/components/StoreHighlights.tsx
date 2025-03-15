
import React from 'react';
import { 
  Package, 
  CreditCard, 
  User, 
  ShoppingBag,
  Star
} from 'lucide-react';

const StoreHighlights = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800 flex items-center">
        <Star className="w-5 h-5 mr-2 text-indigo-600" />
        Store Highlights
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: Package, text: 'Fast shipping worldwide', description: 'Get your order delivered in 3-5 business days' },
          { icon: CreditCard, text: 'Secure payment options', description: 'Multiple payment methods supported' },
          { icon: User, text: 'Excellent customer service', description: '24/7 support for all your needs' },
          { icon: ShoppingBag, text: 'Quality guaranteed', description: '30-day money-back guarantee' }
        ].map((item, index) => (
          <div key={index} className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-indigo-700" />
              </div>
              <span className="font-medium text-neutral-800">{item.text}</span>
            </div>
            <p className="text-sm text-neutral-600 pl-13">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreHighlights;
