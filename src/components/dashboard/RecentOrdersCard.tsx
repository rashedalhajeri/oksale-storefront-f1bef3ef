
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight, Clock3 } from 'lucide-react';
import { formatRelativeTime, getOrderStatusColor } from '@/utils/dashboard/dashboardUtils';

interface RecentOrdersCardProps {
  recentOrders: any[];
  loading: boolean;
  currency: string;
}

const RecentOrdersCard = ({ recentOrders, loading, currency }: RecentOrdersCardProps) => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRelativeTimeWithColor = (dateString: string) => {
    const relativeTime = formatRelativeTime(dateString);
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
    
    let color = "text-gray-500"; // default color
    
    if (diffHours < 1) {
      color = "text-red-500 font-medium"; // less than an hour
    } else if (diffHours < 2) {
      color = "text-orange-500"; // less than 2 hours
    } else if (diffHours < 24) {
      color = "text-yellow-600"; // less than a day
    } else if (diffHours < 48) {
      color = "text-blue-500"; // less than 2 days
    }
    
    return { text: relativeTime, color };
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">أحدث الطلبات</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/orders')}>
            كل الطلبات
            <ArrowUpRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          // حالة التحميل
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-muted/60 last:border-0 last:pb-0">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-5 w-14" />
              </div>
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          // لا توجد طلبات
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">لا توجد طلبات حديثة</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              ستظهر هنا الطلبات الجديدة عندما يقوم العملاء بالشراء.
            </p>
            <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/products')}>
              إدارة المنتجات
            </Button>
          </div>
        ) : (
          // قائمة الطلبات
          <div className="space-y-4 relative">
            {recentOrders.map((order, index) => {
              const statusColors = order.statusColors;
              const { text: relativeTime, color: timeColor } = getRelativeTimeWithColor(order.created_at);
              
              return (
                <div key={index} className="flex items-center gap-3 pb-3 border-b border-muted/60 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors.bg}`}>
                    <Clock className={`h-5 w-5 ${statusColors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate" dir="ltr">
                          #{order.id}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {order.customer}
                        </p>
                      </div>
                      <Badge variant="outline" className={`${statusColors.bg} ${statusColors.text} text-xs border-0`}>
                        {order.statusText}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className={`flex items-center text-xs gap-1 ${timeColor}`}>
                        <Clock3 className="h-3 w-3" />
                        <span className="rtl">{relativeTime}</span>
                      </div>
                      <span className="text-sm font-medium" dir="ltr">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrdersCard;
