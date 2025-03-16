
import React from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Banknote,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatisticItem {
  name: string;
  value: string;
  icon: React.ReactNode;
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
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-none shadow-sm animate-pulse">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-full bg-gray-100"></div>
                <div className="h-4 w-20 bg-gray-100 rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-6 w-16 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="w-full">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>التقدم</span>
                  <span>-</span>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded"></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statistics.map((item, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-gray-50">{item.icon}</div>
              <div className={`flex items-center text-xs font-medium ${item.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
                <ArrowUpRight className={`h-3 w-3 ml-1 ${!item.trendUp && 'rotate-180'}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>التقدم</span>
                <span>{item.progressValue}%</span>
              </div>
              <Progress value={item.progressValue} className="h-1" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsSection;
