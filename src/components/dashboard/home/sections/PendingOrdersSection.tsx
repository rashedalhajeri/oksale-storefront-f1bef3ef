
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Order } from '@/utils/dashboard/orderTypes';

interface PendingOrdersSectionProps {
  pendingOrders: Order[];
  loading: boolean;
}

const PendingOrdersSection: React.FC<PendingOrdersSectionProps> = ({ 
  pendingOrders,
  loading
}) => {
  const navigate = useNavigate();

  // Show loading skeleton during data fetch
  if (loading) {
    return (
      <Card className="dashboard-card mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card mb-6 fade-in">
      <CardHeader className="pb-3 pt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 rounded-full">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-lg font-bold">الطلبات قيد الانتظار</CardTitle>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
            {pendingOrders.length} طلب
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {pendingOrders.length === 0 ? (
          <div className="text-center py-6">
            <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">لا يوجد طلبات قيد الانتظار</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="dashboard-table">
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المبلغ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOrders.map((order) => (
                  <TableRow 
                    key={order.rawId || order.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/dashboard/orders/${order.rawId || order.id}`)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date || new Date(order.created_at).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell dir="ltr">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(PendingOrdersSection);
