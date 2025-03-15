
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Mail, Phone, Calendar, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface DashboardCustomersProps {
  storeData: any;
}

const DashboardCustomers: React.FC<DashboardCustomersProps> = ({ storeData }) => {
  // Mock customers data
  const customers = [
    { 
      id: 1, 
      name: 'أحمد محمد', 
      email: 'ahmed@example.com', 
      phone: '+966 55 123 4567', 
      totalOrders: 8, 
      totalSpent: '2,345.00 ر.س', 
      lastOrder: '12 مايو 2024',
      avatar: null
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      email: 'fatima@example.com', 
      phone: '+966 50 765 4321', 
      totalOrders: 5, 
      totalSpent: '1,250.00 ر.س', 
      lastOrder: '10 مايو 2024',
      avatar: null
    },
    { 
      id: 3, 
      name: 'محمد عبدالله', 
      email: 'mohammed@example.com', 
      phone: '+966 54 987 6543', 
      totalOrders: 12, 
      totalSpent: '4,780.00 ر.س', 
      lastOrder: '8 مايو 2024',
      avatar: null
    },
    { 
      id: 4, 
      name: 'نورة سالم', 
      email: 'noura@example.com', 
      phone: '+966 56 456 7890', 
      totalOrders: 3, 
      totalSpent: '870.00 ر.س', 
      lastOrder: '5 مايو 2024',
      avatar: null
    },
    { 
      id: 5, 
      name: 'خالد إبراهيم', 
      email: 'khalid@example.com', 
      phone: '+966 58 234 5678', 
      totalOrders: 7, 
      totalSpent: '1,920.00 ر.س', 
      lastOrder: '3 مايو 2024',
      avatar: null
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">العملاء</h1>
        <p className="text-gray-600">إدارة قائمة العملاء في متجرك</p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">جميع العملاء</TabsTrigger>
            <TabsTrigger value="active">العملاء النشطين</TabsTrigger>
            <TabsTrigger value="new">العملاء الجدد</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="بحث عن عميل..." 
              className="w-60"
            />
            <Button variant="outline">تصدير</Button>
            <Button>إضافة عميل</Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b bg-gray-50">
                      <th className="py-3 px-4 font-medium text-right">العميل</th>
                      <th className="py-3 px-4 font-medium text-right">البريد الإلكتروني</th>
                      <th className="py-3 px-4 font-medium text-right">رقم الهاتف</th>
                      <th className="py-3 px-4 font-medium text-right">عدد الطلبات</th>
                      <th className="py-3 px-4 font-medium text-right">إجمالي المصروف</th>
                      <th className="py-3 px-4 font-medium text-right">آخر طلب</th>
                      <th className="py-3 px-4 font-medium text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="text-sm border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {customer.avatar ? (
                                <AvatarImage src={customer.avatar} alt={customer.name} />
                              ) : (
                                <AvatarFallback className="bg-oksale-100 text-oksale-700">
                                  {customer.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span>{customer.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{customer.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{customer.phone}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <ShoppingBag className="h-4 w-4 text-gray-400" />
                            <span>{customer.totalOrders}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{customer.totalSpent}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{customer.lastOrder}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">عرض</Button>
                            <Button variant="outline" size="sm">تحرير</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <UserRound className="h-16 w-16 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">العملاء النشطين</h3>
                <p className="text-gray-500 mb-4">هنا ستظهر قائمة بالعملاء النشطين في متجرك.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <UserRound className="h-16 w-16 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">العملاء الجدد</h3>
                <p className="text-gray-500 mb-4">هنا ستظهر قائمة بالعملاء الجدد في متجرك.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">نظرة عامة على العملاء</CardTitle>
            <CardDescription>إحصائيات وبيانات العملاء في متجرك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">إجمالي العملاء</div>
                  <div className="text-2xl font-bold">243</div>
                </div>
                <div className="bg-oksale-50 p-2 rounded-full">
                  <UserRound className="h-6 w-6 text-oksale-600" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">العملاء الجدد هذا الشهر</div>
                  <div className="text-2xl font-bold">28</div>
                </div>
                <div className="flex items-center text-green-600 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12% عن الشهر الماضي</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">متوسط قيمة الطلب</div>
                  <div className="text-2xl font-bold">215 ر.س</div>
                </div>
                <div className="flex items-center text-green-600 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+5% عن الشهر الماضي</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">أفضل العملاء</CardTitle>
            <CardDescription>العملاء الأكثر إنفاقاً في متجرك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.slice(0, 4).map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-xs font-medium">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-oksale-100 text-oksale-700">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">{customer.totalOrders} طلبات</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCustomers;
