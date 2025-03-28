
import React from 'react';
import { BarChart4, TrendingUp, FileBarChart } from 'lucide-react';
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
import { formatCurrencyWithSettings } from '@/utils/dashboard/dashboardUtils';

interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

interface ChartSectionProps {
  salesData: SalesData[];
  loading: boolean;
  timeframe: string;
  currency: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, currency }: TooltipProps<ValueType, NameType> & { currency: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center text-sm py-1" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            <span className="font-medium">{entry.name}: </span>
            <span className="mr-1">
              {entry.name === "الإيرادات" 
                ? formatCurrencyWithSettings(Number(entry.value), currency)
                : entry.value
              }
            </span>
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
  timeframe,
  currency
}) => {
  const chartConfig = {
    sales: { label: "المبيعات", color: "#8B5CF6" }, // Updated to a more vibrant purple
    revenue: { label: "الإيرادات", color: "#10b981" },
  };

  if (loading) {
    return (
      <Card className="col-span-2 border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-full">
              <BarChart4 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">تحليل المبيعات</CardTitle>
              <CardDescription className="text-sm">
                مقارنة المبيعات والإيرادات
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="animate-spin w-6 h-6 border-2 border-purple-700 border-t-transparent rounded-full"></div>
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
    <Card className="col-span-2 border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 rounded-full">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">تحليل المبيعات</CardTitle>
            <CardDescription className="text-sm">
              مقارنة المبيعات والإيرادات حسب {getLabel()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {salesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <FileBarChart className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات للفترة المحددة</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip currency={currency} />} />
                <Legend 
                  iconType="circle" 
                  iconSize={8}
                  formatter={(value) => <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</span>}
                  wrapperStyle={{ paddingTop: 10 }}
                />
                <Bar
                  name={chartConfig.sales.label}
                  dataKey="sales"
                  fill={chartConfig.sales.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  animationDuration={1000}
                />
                <Bar
                  name={chartConfig.revenue.label}
                  dataKey="revenue"
                  fill={chartConfig.revenue.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  animationDuration={1500}
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
