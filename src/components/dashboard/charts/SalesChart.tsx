
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { formatCurrencyWithSettings } from '@/utils/dashboard/dashboardUtils';

// Interface for SalesChart props
interface SalesChartProps {
  salesData: any[];
  timeframe: string;
  currency: string;
  isLoading: boolean;
}

// Sales chart component
const SalesChart: React.FC<SalesChartProps> = ({ salesData, timeframe, currency, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-72 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salesData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `${value}`}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'revenue' 
                ? formatCurrencyWithSettings(Number(value), currency)
                : value,
              name === 'revenue' ? 'الإيرادات' : 'المبيعات'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              padding: '0.5rem'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8884d8" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
