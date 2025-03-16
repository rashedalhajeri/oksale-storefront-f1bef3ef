
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface OrderLoadingStateProps {
  isMobile: boolean;
  count?: number;
}

const OrderLoadingState: React.FC<OrderLoadingStateProps> = ({ isMobile, count = 6 }) => {
  if (isMobile) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse border-none shadow-sm">
            <CardContent className="p-3">
              <div className="h-4 bg-gray-200 rounded mb-3 w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded mb-3 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mt-3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse border-none shadow-sm">
          <CardContent className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderLoadingState;
