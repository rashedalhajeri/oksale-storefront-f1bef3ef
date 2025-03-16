
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import StatisticsSection from './StatisticsSection';
import ChartSection from './ChartSection';

interface MainDashboardProps {
  statistics: any[];
  salesData: any[];
  timeframe: string;
  setTimeframe: (value: string) => void;
  recentOrders: any[];
  topProducts: any[];
  orderStatusData: any[];
  statsLoading: boolean;
  chartLoading: boolean;
  recentOrdersLoading: boolean;
  topProductsLoading: boolean;
  orderStatusLoading: boolean;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  statistics,
  salesData,
  timeframe,
  setTimeframe,
  recentOrders,
  topProducts,
  orderStatusData,
  statsLoading,
  chartLoading,
  recentOrdersLoading,
  topProductsLoading,
  orderStatusLoading
}) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">مرحباً بك في لوحة التحكم</h1>
        <p className="text-gray-600">هذه نظرة عامة على أداء متجرك</p>
      </div>

      {/* Time Frame Tabs */}
      <Tabs defaultValue="week" className="mb-6" value={timeframe} onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="day">اليوم</TabsTrigger>
          <TabsTrigger value="week">هذا الأسبوع</TabsTrigger>
          <TabsTrigger value="month">هذا الشهر</TabsTrigger>
          <TabsTrigger value="year">هذا العام</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Statistics Section */}
      <StatisticsSection statistics={statistics} loading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <ChartSection 
          salesData={salesData} 
          loading={chartLoading}
          timeframe={timeframe}
        />

        {/* Order Status */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">حالة الطلبات</CardTitle>
            <CardDescription>
              توزيع الطلبات حسب الحالة
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orderStatusLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {orderStatusData.map((item) => (
                  <div key={item.status} className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : item.status === 'cancelled' ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                      <Progress 
                        value={(item.count / orderStatusData.reduce((acc, curr) => acc + curr.count, 0)) * 100} 
                        className={`h-1.5 ${
                          item.status === 'completed' ? 'bg-green-100' : 
                          item.status === 'processing' ? 'bg-blue-100' : 
                          item.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Latest Orders */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">أحدث الطلبات</CardTitle>
            <CardDescription>
              آخر 5 طلبات في متجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrdersLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {
                              order.status === 'completed' ? 'مكتمل' : 
                              order.status === 'processing' ? 'قيد التجهيز' : 
                              order.status === 'pending' ? 'قيد الانتظار' : 'ملغي'
                            }
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">أفضل المنتجات مبيعاً</CardTitle>
            <CardDescription>
              المنتجات الأكثر مبيعاً في متجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topProductsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>عدد المبيعات</TableHead>
                      <TableHead>المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{product.amount} ر.س</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
