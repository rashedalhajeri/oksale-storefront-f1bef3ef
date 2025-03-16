
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const DashboardMarketingOffers = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">التسويق والعروض</h1>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">قسم التسويق</h2>
            <p className="text-gray-500">
              سيتم إضافة ميزات التسويق والعروض الترويجية قريباً
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMarketingOffers;
