
import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderStatusItem {
  status: string;
  count: number;
  label: string;
}

interface OrderStatusSectionProps {
  orderStatusData: OrderStatusItem[];
  loading: boolean;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({ orderStatusData, loading }) => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">حالة الطلبات</CardTitle>
        <CardDescription>
          توزيع الطلبات حسب الحالة
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full ml-3"></div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orderStatusData.length === 0 ? (
              <div className="text-center py-6">
                <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">لم يتم العثور على بيانات الطلبات</p>
              </div>
            ) : (
              orderStatusData.map((item) => (
                <div key={item.status} className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full ml-3">
                    {item.status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : item.status === 'cancelled' ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                    <Progress 
                      value={(item.count / orderStatusData.reduce((acc, curr) => acc + curr.count, 0)) * 100} 
                      className={`h-1.5 ${
                        item.status === 'completed' ? 'bg-green-100' : 
                        item.status === 'processing' ? 'bg-blue-100' : 
                        item.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(OrderStatusSection);
