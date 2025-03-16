
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Interface for TopProductsPreview props
interface TopProductsPreviewProps {
  topProducts: any[];
  loading: boolean;
  currency: string;
}

// Top products preview component
const TopProductsPreview: React.FC<TopProductsPreviewProps> = ({ topProducts, loading, currency }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (topProducts.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات للمنتجات</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topProducts.slice(0, 3).map((product, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <span className="font-medium">{product.name}</span>
          <div>
            <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{product.sales}</span>
            <span className="ml-2 font-medium" dir="ltr">{product.amount} {currency}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProductsPreview;
