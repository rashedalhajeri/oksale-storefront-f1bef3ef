
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle, Package } from 'lucide-react';
import { cn } from "@/lib/utils";

interface OrdersStatisticsProps {
  statistics: {
    all: number;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  loading: boolean;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const OrdersStatistics: React.FC<OrdersStatisticsProps> = ({ 
  statistics, 
  loading, 
  currentTab, 
  onTabChange 
}) => {
  const stats = [
    {
      name: 'الكل',
      value: statistics.all,
      icon: <Package className="h-4 w-4 text-gray-600" />,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      id: 'all'
    },
    {
      name: 'قيد الانتظار',
      value: statistics.pending,
      icon: <Clock className="h-4 w-4 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      id: 'pending'
    },
    {
      name: 'قيد التجهيز',
      value: statistics.processing,
      icon: <Clock className="h-4 w-4 text-blue-600" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      id: 'processing'
    },
    {
      name: 'مكتمل',
      value: statistics.completed,
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      id: 'completed'
    },
    {
      name: 'ملغي',
      value: statistics.cancelled,
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      id: 'cancelled'
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-2 mb-6">
      {stats.map((stat) => (
        <Card 
          key={stat.id}
          className={cn(
            "border-none shadow-sm cursor-pointer transition-all",
            currentTab === stat.id ? "ring-2 ring-primary" : "hover:shadow"
          )}
          onClick={() => onTabChange(stat.id)}
        >
          <CardContent className="p-2 text-center flex flex-col items-center justify-center">
            <div className={`rounded-full p-1.5 ${stat.bgColor} mb-1`}>
              {stat.icon}
            </div>
            <span className="font-medium text-xs block">{stat.name}</span>
            <span className={`text-lg font-bold ${stat.textColor}`}>
              {loading ? '...' : stat.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersStatistics;
