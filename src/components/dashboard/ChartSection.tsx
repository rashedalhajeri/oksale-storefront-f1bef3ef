
import React from 'react';
import { BarChart4 } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

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
          <ChartContainer config={chartConfig} className="h-64">
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
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="p-2 border border-gray-200"
                          items={payload.map(entry => ({
                            label: chartConfig[entry.dataKey]?.label || entry.dataKey,
                            value: entry.value,
                            color: entry.color,
                          }))}
                          title={payload[0].payload.name}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sales"
                  fill="var(--color-sales)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartSection;
