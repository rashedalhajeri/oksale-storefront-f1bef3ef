
import React from 'react';
import { 
  Package, 
  ShoppingBag,
  ShoppingCart, 
  Banknote,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface StatisticItem {
  name: string;
  value: string;
  icon: string;
  description: string;
  change: string;
  trendUp: boolean;
  progressValue: number;
}

interface StatisticsSectionProps {
  statistics: StatisticItem[];
  loading: boolean;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics, loading }) => {
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
            <CardContent className="pb-2">
              <Skeleton className="h-7 w-24 rounded mb-2" />
              <Skeleton className="h-4 w-32 rounded" />
            </CardContent>
            <CardFooter className="pt-0 pb-4">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
              </div>
            </CardFooter>
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
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-full ${getIconBgColor(item.icon)}`}>
                {getIcon(item.icon)}
              </div>
              <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                item.trendUp 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-red-700 bg-red-50'
              }`}>
                {item.trendUp 
                  ? <TrendingUp className="h-3 w-3 mr-1" /> 
                  : <TrendingDown className="h-3 w-3 mr-1" />
                }
                {item.change}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </CardContent>
          <CardFooter className="pt-0 pb-4">
            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span>التقدم</span>
                <span className="font-medium">{item.progressValue}%</span>
              </div>
              <Progress 
                value={item.progressValue} 
                className={`h-1.5 rounded-full ${
                  item.icon === 'products' ? 'bg-indigo-100' : 
                  item.icon === 'sold' ? 'bg-blue-100' : 
                  item.icon === 'orders' ? 'bg-green-100' : 
                  'bg-purple-100'
                }`}
                indicatorClassName={
                  item.icon === 'products' ? 'bg-indigo-500' : 
                  item.icon === 'sold' ? 'bg-blue-500' : 
                  item.icon === 'orders' ? 'bg-green-500' : 
                  'bg-purple-500'
                }
              />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsSection;
