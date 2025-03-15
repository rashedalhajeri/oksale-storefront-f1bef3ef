
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent, Calendar, Tag, Plus, Edit, Trash2, Timer, Search, MoreVertical, ShoppingBag, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

interface DashboardOffersProps {
  storeData: any;
}

const DashboardOffers: React.FC<DashboardOffersProps> = ({ storeData }) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editOffer, setEditOffer] = useState<any>(null);

  // Mock offers data
  const offers = [
    { 
      id: 1, 
      name: 'عرض رمضان', 
      code: 'RAMADAN30', 
      type: 'percent', 
      value: 30, 
      minPurchase: 200, 
      maxUse: 100, 
      usedCount: 45, 
      startDate: '15 مارس 2024', 
      endDate: '15 أبريل 2024',
      status: 'active',
      productsCount: 24
    },
    { 
      id: 2, 
      name: 'خصم الصيف', 
      code: 'SUMMER20', 
      type: 'percent', 
      value: 20, 
      minPurchase: 150, 
      maxUse: 50, 
      usedCount: 12, 
      startDate: '1 يونيو 2024', 
      endDate: '31 أغسطس 2024',
      status: 'scheduled',
      productsCount: 0
    },
    { 
      id: 3, 
      name: 'خصم ثابت', 
      code: 'FLAT50', 
      type: 'fixed', 
      value: 50, 
      minPurchase: 300, 
      maxUse: 200, 
      usedCount: 89, 
      startDate: '1 يناير 2024', 
      endDate: '30 يونيو 2024',
      status: 'active',
      productsCount: 0
    },
    { 
      id: 4, 
      name: 'كود المتابعين', 
      code: 'FOLLOW15', 
      type: 'percent', 
      value: 15, 
      minPurchase: 0, 
      maxUse: 500, 
      usedCount: 234, 
      startDate: '1 يناير 2024', 
      endDate: '31 ديسمبر 2024',
      status: 'active',
      productsCount: 0
    },
    { 
      id: 5, 
      name: 'عرض نهاية الموسم', 
      code: 'SEASON40', 
      type: 'percent', 
      value: 40, 
      minPurchase: 0, 
      maxUse: 0, 
      usedCount: 0, 
      startDate: '1 مايو 2024', 
      endDate: '10 مايو 2024',
      status: 'expired',
      productsCount: 18
    },
  ];

  const handleEditOffer = (offer: any) => {
    setEditOffer(offer);
    setOpenAddDialog(true);
  };

  const handleAddOffer = () => {
    setEditOffer(null);
    setOpenAddDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">مجدول</Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">منتهي</Badge>
        );
      default:
        return (
          <Badge variant="outline">غير معروف</Badge>
        );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">العروض</h1>
        <p className="text-gray-600">إدارة عروض وكوبونات الخصم في متجرك</p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">جميع العروض</TabsTrigger>
            <TabsTrigger value="active">العروض النشطة</TabsTrigger>
            <TabsTrigger value="scheduled">العروض المجدولة</TabsTrigger>
            <TabsTrigger value="expired">العروض المنتهية</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="البحث في العروض..." 
                className="pr-10"
              />
            </div>
            <Button onClick={handleAddOffer}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة عرض
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b bg-gray-50">
                      <th className="py-3 px-4 font-medium text-right">اسم العرض</th>
                      <th className="py-3 px-4 font-medium text-right">رمز الكوبون</th>
                      <th className="py-3 px-4 font-medium text-right">قيمة الخصم</th>
                      <th className="py-3 px-4 font-medium text-right">تاريخ البداية</th>
                      <th className="py-3 px-4 font-medium text-right">تاريخ الانتهاء</th>
                      <th className="py-3 px-4 font-medium text-right">الاستخدام</th>
                      <th className="py-3 px-4 font-medium text-right">الحالة</th>
                      <th className="py-3 px-4 font-medium text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => (
                      <tr key={offer.id} className="text-sm border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{offer.name}</div>
                          {offer.productsCount > 0 && (
                            <div className="text-xs text-gray-500">
                              يطبق على {offer.productsCount} منتج
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-gray-50 font-mono">
                            {offer.code}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {offer.type === 'percent' 
                            ? `${offer.value}%` 
                            : `${offer.value} ر.س`
                          }
                          {offer.minPurchase > 0 && (
                            <div className="text-xs text-gray-500">
                              للطلبات أكثر من {offer.minPurchase} ر.س
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{offer.startDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{offer.endDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {offer.maxUse > 0 ? (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>{offer.usedCount} من {offer.maxUse}</span>
                                <span>{Math.round((offer.usedCount / offer.maxUse) * 100)}%</span>
                              </div>
                              <Progress value={(offer.usedCount / offer.maxUse) * 100} className="h-1.5" />
                            </div>
                          ) : (
                            <span>{offer.usedCount} استخدام</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(offer.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditOffer(offer)}
                            >
                              <Edit className="h-4 w-4 ml-1" />
                              تحرير
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  نسخ الكود
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b bg-gray-50">
                      <th className="py-3 px-4 font-medium text-right">اسم العرض</th>
                      <th className="py-3 px-4 font-medium text-right">رمز الكوبون</th>
                      <th className="py-3 px-4 font-medium text-right">قيمة الخصم</th>
                      <th className="py-3 px-4 font-medium text-right">تاريخ الانتهاء</th>
                      <th className="py-3 px-4 font-medium text-right">الاستخدام</th>
                      <th className="py-3 px-4 font-medium text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.filter(offer => offer.status === 'active').map((offer) => (
                      <tr key={offer.id} className="text-sm border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{offer.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-gray-50 font-mono">
                            {offer.code}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {offer.type === 'percent' 
                            ? `${offer.value}%` 
                            : `${offer.value} ر.س`
                          }
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{offer.endDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {offer.maxUse > 0 ? (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>{offer.usedCount} من {offer.maxUse}</span>
                                <span>{Math.round((offer.usedCount / offer.maxUse) * 100)}%</span>
                              </div>
                              <Progress value={(offer.usedCount / offer.maxUse) * 100} className="h-1.5" />
                            </div>
                          ) : (
                            <span>{offer.usedCount} استخدام</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditOffer(offer)}
                            >
                              <Edit className="h-4 w-4 ml-1" />
                              تحرير
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  نسخ الكود
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
        
        <TabsContent value="scheduled" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Timer className="h-16 w-16 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">العروض المجدولة</h3>
                <p className="text-gray-500 mb-4">هنا ستظهر العروض المجدولة للتفعيل في المستقبل.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Timer className="h-16 w-16 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">العروض المنتهية</h3>
                <p className="text-gray-500 mb-4">هنا ستظهر العروض التي انتهت صلاحيتها.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Offer Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[485px]">
          <DialogHeader>
            <DialogTitle>
              {editOffer ? 'تحرير العرض' : 'إضافة عرض جديد'}
            </DialogTitle>
            <DialogDescription>
              {editOffer 
                ? 'قم بتحرير معلومات العرض أدناه' 
                : 'أدخل معلومات العرض الجديد أدناه'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">اسم العرض</Label>
              <Input 
                id="name" 
                placeholder="أدخل اسم العرض" 
                defaultValue={editOffer?.name || ''} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">رمز الكوبون</Label>
              <Input 
                id="code" 
                placeholder="COUPON20" 
                defaultValue={editOffer?.code || ''} 
                dir="ltr"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">نوع الخصم</Label>
                <select 
                  id="type" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={editOffer?.type || 'percent'}
                >
                  <option value="percent">نسبة مئوية (%)</option>
                  <option value="fixed">قيمة ثابتة (ر.س)</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">قيمة الخصم</Label>
                <Input 
                  id="value" 
                  type="number" 
                  placeholder="20" 
                  defaultValue={editOffer?.value || ''} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">تاريخ البداية</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  defaultValue="2024-05-01" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  defaultValue="2024-06-01" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minPurchase">الحد الأدنى للطلب (ر.س)</Label>
                <Input 
                  id="minPurchase" 
                  type="number" 
                  placeholder="0" 
                  defaultValue={editOffer?.minPurchase || '0'} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxUse">عدد مرات الاستخدام</Label>
                <Input 
                  id="maxUse" 
                  type="number" 
                  placeholder="0 (غير محدود)" 
                  defaultValue={editOffer?.maxUse || '0'} 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">وصف العرض (اختياري)</Label>
              <Textarea 
                id="description" 
                placeholder="أدخل وصفاً للعرض" 
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              {editOffer ? 'حفظ التغييرات' : 'إضافة العرض'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Offer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-green-50">
                <Percent className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {offers.filter(o => o.status === 'active').length}
            </div>
            <p className="text-gray-500 text-sm">عروض نشطة</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-blue-50">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {offers.reduce((sum, offer) => sum + offer.usedCount, 0)}
            </div>
            <p className="text-gray-500 text-sm">كود مستخدم</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-oksale-50">
                <Activity className="h-5 w-5 text-oksale-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-gray-500 text-sm">معدل تحويل الكوبونات</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOffers;
