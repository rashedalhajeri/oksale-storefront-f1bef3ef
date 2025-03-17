
import React from 'react';
import { Package, ShoppingBag, ShoppingCart, Banknote } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatisticItem {
  name: string;
  value: string | number;
  icon: string;
  description: string;
  trendUp?: boolean;
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
        return <Package className="h-5 w-5 text-white" />;
      case 'sold':
        return <ShoppingBag className="h-5 w-5 text-white" />;
      case 'orders':
        return <ShoppingCart className="h-5 w-5 text-white" />;
      case 'revenue':
        return <Banknote className="h-5 w-5 text-white" />;
      default:
        return <Package className="h-5 w-5 text-white" />;
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="stats-card">
            <div className="flex justify-between items-start">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-6 w-16 rounded mb-1" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {statistics.map((item, index) => (
        <Card key={index} className="stats-card">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-medium text-sm truncate">{item.name}</span>
            <div className={cn(
              "stats-card-icon flex items-center justify-center w-10 h-10 rounded-full shadow-sm relative overflow-hidden",
              "bg-gradient-to-br from-bluesky-800 to-bluesky-700",
              "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-white/20 before:rounded-t-full"
            )}>
              {getIcon(item.icon)}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold" dir="ltr">{item.value}</div>
            <p className="text-gray-500 text-xs mt-1">{getTimePeriodLabel()}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default React.memo(StatisticsSection);
