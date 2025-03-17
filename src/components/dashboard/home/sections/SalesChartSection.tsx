
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatCurrency } from '@/utils/dashboard/currencyUtils';

interface SalesChartSectionProps {
  salesData: any[];
  loading: boolean;
  timeframe: string;
  currency: string;
}

const SalesChartSection: React.FC<SalesChartSectionProps> = ({ 
  salesData, 
  loading, 
  timeframe,
  currency 
}) => {
  const isMobile = useIsMobile();
  
  const formatChartTitle = () => {
    switch(timeframe) {
      case 'day':
        return 'مبيعات اليوم';
      case 'week':
        return 'مبيعات الأسبوع';
      case 'month':
        return 'مبيعات الشهر';
      case 'year':
        return 'مبيعات السنة';
      default:
        return 'المبيعات والإيرادات';
    }
  };

  // Modified to always return a string to match the expected type
  const formatYAxisTick = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString(); // Convert number to string
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-blue-600">
            <span className="font-medium">المبيعات:</span> {payload[0].value}
          </p>
          <p className="text-purple-600">
            <span className="font-medium">الإيرادات:</span> {formatCurrency(payload[1].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="dashboard-card col-span-2 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">المبيعات والإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] md:h-[300px] w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card col-span-2 md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-full">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-lg font-semibold">{formatChartTitle()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {salesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] md:h-[300px]">
            <TrendingUp className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-center">لا توجد بيانات كافية لعرض الرسم البياني</p>
          </div>
        ) : (
          <div className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ 
                  top: 10, 
                  right: isMobile ? 5 : 10, 
                  left: isMobile ? 0 : 0, 
                  bottom: isMobile ? 15 : 20 
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickFormatter={formatYAxisTick}
                  dx={isMobile ? -5 : -10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: isMobile ? 2 : 3 }}
                  activeDot={{ r: isMobile ? 4 : 5 }}
                  name="المبيعات"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: isMobile ? 2 : 3 }}
                  activeDot={{ r: isMobile ? 4 : 5 }}
                  name="الإيرادات"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(SalesChartSection);
