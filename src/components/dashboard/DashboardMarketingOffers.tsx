
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from 'lucide-react';

const DashboardMarketingOffers = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-amber-50 rounded-full">
          <Megaphone className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">التسويق والعروض</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">إدارة الحملات الترويجية والعروض التسويقية</p>
        </div>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">الحملات التسويقية</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <Megaphone className="h-16 w-16 text-amber-500/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">قسم التسويق</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              سيتم إضافة ميزات إدارة الحملات الترويجية والعروض الخاصة قريباً لمساعدتك في زيادة المبيعات وجذب المزيد من العملاء.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMarketingOffers;
