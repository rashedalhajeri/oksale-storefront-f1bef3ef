
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  UserPlus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Shield, 
  Mail, 
  AlertCircle
} from 'lucide-react';

interface DashboardSettingsUsersProps {
  storeData: any;
}

const DashboardSettingsUsers: React.FC<DashboardSettingsUsersProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [openNewUser, setOpenNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'owner',
      avatar: null,
      lastActive: '5 دقائق مضت'
    },
    {
      id: 2,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      role: 'admin',
      avatar: null,
      lastActive: 'اليوم، 10:23 ص'
    },
    {
      id: 3,
      name: 'محمد علي',
      email: 'mohamed@example.com',
      role: 'manager',
      avatar: null,
      lastActive: 'أمس، 5:45 م'
    },
    {
      id: 4,
      name: 'فاطمة خالد',
      email: 'fatima@example.com',
      role: 'staff',
      avatar: null,
      lastActive: '3 أيام مضت'
    }
  ];

  const roleLabels: Record<string, string> = {
    owner: 'مالك المتجر',
    admin: 'مسؤول',
    manager: 'مدير',
    staff: 'موظف'
  };

  const roleColors: Record<string, string> = {
    owner: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    manager: 'bg-green-100 text-green-800',
    staff: 'bg-gray-100 text-gray-800'
  };

  const handleAddUser = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpenNewUser(false);
      toast({
        title: "تمت إضافة المستخدم",
        description: "تم إرسال دعوة للمستخدم بنجاح.",
      });
    }, 1000);
  };

  const handleSaveRoles = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث أدوار المستخدمين بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">المستخدمين والصلاحيات</h1>
        <p className="text-gray-600">إدارة فريق العمل والصلاحيات في متجرك</p>
      </div>

      <div className="space-y-6">
        {/* Team Members */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-oksale-600" />
                فريق العمل
              </CardTitle>
              <CardDescription>إدارة المستخدمين الذين يمكنهم الوصول إلى لوحة التحكم</CardDescription>
            </div>
            <Dialog open={openNewUser} onOpenChange={setOpenNewUser}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center">
                  <UserPlus className="h-4 w-4 ml-2" />
                  إضافة عضو جديد
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة عضو جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات العضو الجديد وسيتم إرسال دعوة له عبر البريد الإلكتروني.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-user-name">الاسم</Label>
                    <Input id="new-user-name" placeholder="أدخل اسم المستخدم" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-user-email">البريد الإلكتروني</Label>
                    <Input id="new-user-email" type="email" placeholder="name@example.com" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-user-role">الدور</Label>
                    <Select defaultValue="staff">
                      <SelectTrigger id="new-user-role">
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">مسؤول</SelectItem>
                        <SelectItem value="manager">مدير</SelectItem>
                        <SelectItem value="staff">موظف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenNewUser(false)}>إلغاء</Button>
                  <Button onClick={handleAddUser} disabled={loading}>
                    {loading ? 'جارِ الإضافة...' : 'إضافة عضو'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b">
                      <th className="pb-2 font-medium text-right">العضو</th>
                      <th className="pb-2 font-medium text-right">البريد الإلكتروني</th>
                      <th className="pb-2 font-medium text-right">الدور</th>
                      <th className="pb-2 font-medium text-right">آخر نشاط</th>
                      <th className="pb-2 font-medium text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {member.avatar ? (
                                <AvatarImage src={member.avatar} alt={member.name} />
                              ) : (
                                <AvatarFallback className="bg-gray-200 text-gray-700">
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600" dir="ltr">{member.email}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${roleColors[member.role]}`}>
                            {roleLabels[member.role]}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">{member.lastActive}</td>
                        <td className="py-3 text-right">
                          {member.role !== 'owner' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">القائمة</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center">
                                  <Edit3 className="h-4 w-4 ml-2" />
                                  <span>تعديل</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <Mail className="h-4 w-4 ml-2" />
                                  <span>إعادة إرسال الدعوة</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 flex items-center">
                                  <Trash2 className="h-4 w-4 ml-2" />
                                  <span>إزالة</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles and Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-oksale-600" />
              الأدوار والصلاحيات
            </CardTitle>
            <CardDescription>تحديد صلاحيات كل دور في النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              {/* Admin Role */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-medium">مسؤول (Admin)</h3>
                    <p className="text-sm text-gray-500">المسؤولون لديهم صلاحيات واسعة في النظام</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المتجر</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل معلومات المتجر</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل مظهر المتجر</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>تغيير خطة الاشتراك</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>إضافة منتجات جديدة</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل المنتجات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>حذف المنتجات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>عرض الطلبات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل حالة الطلبات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>إلغاء الطلبات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>عرض المستخدمين</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>إضافة مستخدمين</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>إدارة الصلاحيات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Separator />
              
              {/* Staff Role */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-medium">موظف (Staff)</h3>
                    <p className="text-sm text-gray-500">الموظفون لديهم صلاحيات محدودة في النظام</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المتجر</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>تعديل معلومات المتجر</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>تعديل مظهر المتجر</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>تغيير خطة الاشتراك</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>إضافة منتجات جديدة</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل المنتجات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>حذف المنتجات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>عرض الطلبات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span>تعديل حالة الطلبات</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>إلغاء الطلبات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>عرض المستخدمين</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>إضافة مستخدمين</span>
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>إدارة الصلاحيات</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button onClick={handleSaveRoles} disabled={loading}>
              {loading ? 'جارِ الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </CardFooter>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-oksale-600" />
              إعدادات الأمان
            </CardTitle>
            <CardDescription>إعدادات الأمان وتسجيل الدخول للمستخدمين</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">تفعيل المصادقة الثنائية</h3>
                  <p className="text-sm text-gray-500">إلزام جميع المستخدمين بتفعيل المصادقة الثنائية</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">تسجيل الخروج التلقائي</h3>
                  <p className="text-sm text-gray-500">تسجيل خروج المستخدمين تلقائياً بعد فترة عدم نشاط</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">سجل النشاط</h3>
                  <p className="text-sm text-gray-500">الاحتفاظ بسجل لجميع أنشطة المستخدمين في النظام</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettingsUsers;
