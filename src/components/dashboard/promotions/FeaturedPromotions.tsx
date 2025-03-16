
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Featured promotions component
const FeaturedPromotions: React.FC = () => {
  return (
    <Card className="border-none bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">العروض المميزة</h3>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-100">قريباً</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          قم بإنشاء وتخصيص عروض خاصة للعملاء لزيادة المبيعات
        </p>
        
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center dark:text-indigo-400 dark:hover:text-indigo-300">
          معرفة المزيد
          <ArrowUpRight className="h-4 w-4 mr-1" />
        </button>
      </CardContent>
    </Card>
  );
};

export default FeaturedPromotions;
