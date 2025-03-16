
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Define interface for component props
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: {
    bgColor: string;
    element: React.ReactNode;
  };
  trend?: boolean;
  percentage?: number;
}

// Stats card component
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, percentage }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-full ${icon.bgColor}`}>
            {icon.element}
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center">
            <span className={`text-xs font-medium ${percentage && percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage && percentage >= 0 ? '↑' : '↓'} {percentage ? Math.abs(percentage) : 0}%
            </span>
            <span className="text-xs text-gray-500 ms-2">مقارنة بالفترة السابقة</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
