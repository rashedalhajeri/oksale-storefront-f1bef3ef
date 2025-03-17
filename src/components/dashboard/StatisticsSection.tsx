
import React from 'react';
import { 
  Package, 
  ShoppingBag,
  ShoppingCart, 
  Banknote
} from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Updated interface to match MainDashboard's Statistic interface
interface StatisticItem {
  name: string;
  value: string | number; // Changed from 'string' to 'string | number'
  icon: string;
  description: string;
  trendUp?: boolean; // Made optional with ?
}

interface StatisticsSectionProps {
  statistics: StatisticItem[];
  loading: boolean;
  timeframe: string;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics, loading, timeframe }) => {
  // Icon mapping
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'products':
        return <Package className="h-5 w-5 text-indigo-500" />;
      case 'sold':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'orders':
        return <ShoppingCart className="h-5 w-5 text-green-500" />;
      case 'revenue':
        return <Banknote className="h-5 w-5 text-purple-500" />;
      default:
        return <Package className="h-5 w-5 text-indigo-500" />;
    }
  };

  // Icon background colors
  const getIconBgColor = (iconName: string) => {
    switch(iconName) {
      case 'products':
        return 'bg-indigo-50';
      case 'sold':
        return 'bg-blue-50';
      case 'orders':
        return 'bg-green-50';
      case 'revenue':
        return 'bg-purple-50';
      default:
        return 'bg-indigo-50';
    }
  };

  // Get time period label based on selected timeframe
  const getTimePeriodLabel = () => {
    switch(timeframe) {
      case 'day':
        return 'اليوم';
      case 'week':
        return 'الأسبوع';
      case 'month':
        return 'الشهر';
      case 'year':
        return 'السنة';
      default:
        return 'الشهر';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <div className="flex justify-between items-start">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <Skeleton className="h-7 w-24 rounded mb-2" />
              <Skeleton className="h-4 w-32 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statistics.map((item, index) => (
        <Card key={index} className="border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-full ${getIconBgColor(item.icon)}`}>
                {getIcon(item.icon)}
              </div>
              <span className="font-medium">{item.name}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-gray-500 text-sm">{getTimePeriodLabel()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsSection;
