
import React from 'react';
import { BarChart4 } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  TooltipProps 
} from "recharts";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

interface ChartSectionProps {
  salesData: SalesData[];
  loading: boolean;
  timeframe: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartSection: React.FC<ChartSectionProps> = ({ 
  salesData, 
  loading,
  timeframe 
}) => {
  const chartConfig = {
    sales: { label: "المبيعات", color: "#3B82F6" },
    revenue: { label: "الإيرادات", color: "#10B981" },
  };

  if (loading) {
    return (
      <Card className="col-span-2 border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <BarChart4 className="h-5 w-5 mr-2 text-oksale-600" />
            تحليل المبيعات
          </CardTitle>
          <CardDescription>
            مقارنة المبيعات والإيرادات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200">
            <div className="animate-spin w-6 h-6 border-2 border-oksale-700 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getLabel = () => {
    switch(timeframe) {
      case 'day':
        return 'ساعات';
      case 'week':
        return 'أيام';
      case 'month':
        return 'أسابيع';
      case 'year':
        return 'أشهر';
      default:
        return 'أيام';
    }
  };

  return (
    <Card className="col-span-2 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <BarChart4 className="h-5 w-5 mr-2 text-oksale-600" />
          تحليل المبيعات
        </CardTitle>
        <CardDescription>
          مقارنة المبيعات والإيرادات حسب {getLabel()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {salesData.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200">
            <p className="text-gray-500">لا توجد بيانات للفترة المحددة</p>
          </div>
        ) : (
          <div className="h-64" style={{ 
            "--color-sales": chartConfig.sales.color, 
            "--color-revenue": chartConfig.revenue.color 
          } as React.CSSProperties}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  name={chartConfig.sales.label}
                  dataKey="sales"
                  fill={chartConfig.sales.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  name={chartConfig.revenue.label}
                  dataKey="revenue"
                  fill={chartConfig.revenue.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartSection;
