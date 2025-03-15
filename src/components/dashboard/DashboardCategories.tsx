
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MoreVertical, Plus, Edit, Trash2, Tag, ChevronRight, Search, Layers } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface DashboardCategoriesProps {
  storeData: any;
}

const DashboardCategories: React.FC<DashboardCategoriesProps> = ({ storeData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);

  // Mock categories data
  const categories = [
    { id: 1, name: 'الإلكترونيات', slug: 'electronics', description: 'منتجات إلكترونية متنوعة', productsCount: 24, isActive: true },
    { id: 2, name: 'الملابس', slug: 'clothing', description: 'ملابس رجالية ونسائية', productsCount: 36, isActive: true },
    { id: 3, name: 'الأحذية', slug: 'shoes', description: 'أحذية رجالية ونسائية', productsCount: 18, isActive: true },
    { id: 4, name: 'الإكسسوارات', slug: 'accessories', description: 'إكسسوارات متنوعة', productsCount: 15, isActive: true },
    { id: 5, name: 'الهواتف الذكية', slug: 'smartphones', description: 'هواتف ذكية وملحقاتها', productsCount: 12, isActive: false, parentId: 1 },
    { id: 6, name: 'أجهزة الكمبيوتر', slug: 'computers', description: 'أجهزة كمبيوتر محمولة ومكتبية', productsCount: 8, isActive: true, parentId: 1 },
    { id: 7, name: 'ملابس رجالية', slug: 'mens-clothing', description: 'ملابس رجالية متنوعة', productsCount: 20, isActive: true, parentId: 2 },
    { id: 8, name: 'ملابس نسائية', slug: 'womens-clothing', description: 'ملابس نسائية متنوعة', productsCount: 16, isActive: true, parentId: 2 },
  ];

  const handleEditCategory = (category: any) => {
    setEditCategory(category);
    setOpenDialog(true);
  };

  const handleAddCategory = () => {
    setEditCategory(null);
    setOpenDialog(true);
  };

  const getCategoryHierarchy = (category: any) => {
    if (!category.parentId) return null;
    
    const parent = categories.find(c => c.id === category.parentId);
    if (!parent) return null;
    
    return (
      <div className="flex items-center text-xs text-gray-500 mb-1">
        <span>{parent.name}</span>
        <ChevronRight className="h-3 w-3 mx-1" />
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">الفئات</h1>
        <p className="text-gray-600">إدارة فئات المنتجات في متجرك</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="البحث في الفئات..." 
            className="pr-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">تصدير الفئات</Button>
          <Button onClick={handleAddCategory}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة فئة
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b bg-gray-50">
                  <th className="py-3 px-4 font-medium text-right">الفئة</th>
                  <th className="py-3 px-4 font-medium text-right">عدد المنتجات</th>
                  <th className="py-3 px-4 font-medium text-right">الحالة</th>
                  <th className="py-3 px-4 font-medium text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {categories.filter(cat => !cat.parentId).map((category) => (
                  <React.Fragment key={category.id}>
                    <tr className="text-sm border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-500">{category.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-gray-50">
                          {category.productsCount} منتج
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {category.isActive ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            نشط
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            غير نشط
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditCategory(category)}
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
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                    {/* Sub-categories */}
                    {categories.filter(subCat => subCat.parentId === category.id).map(subCategory => (
                      <tr key={subCategory.id} className="text-sm border-b hover:bg-gray-50 bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div className="pr-4 border-r border-gray-200">
                            <div className="flex items-center text-xs text-gray-500 mb-1">
                              <span>{category.name}</span>
                              <ChevronRight className="h-3 w-3 mx-1" />
                            </div>
                            <div className="font-medium">{subCategory.name}</div>
                            <div className="text-xs text-gray-500">{subCategory.description}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-gray-50">
                            {subCategory.productsCount} منتج
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {subCategory.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              نشط
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              غير نشط
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditCategory(subCategory)}
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
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[485px]">
          <DialogHeader>
            <DialogTitle>
              {editCategory ? 'تحرير الفئة' : 'إضافة فئة جديدة'}
            </DialogTitle>
            <DialogDescription>
              {editCategory 
                ? 'قم بتحرير معلومات الفئة أدناه' 
                : 'أدخل معلومات الفئة الجديدة أدناه'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">اسم الفئة</Label>
              <Input 
                id="name" 
                placeholder="أدخل اسم الفئة" 
                defaultValue={editCategory?.name || ''} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">الاسم في الرابط (Slug)</Label>
              <Input 
                id="slug" 
                placeholder="الاسم-في-الرابط" 
                defaultValue={editCategory?.slug || ''} 
                dir="ltr"
              />
              <p className="text-xs text-gray-500">سيظهر في رابط صفحة الفئة</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">وصف الفئة</Label>
              <Textarea 
                id="description" 
                placeholder="أدخل وصفاً للفئة" 
                defaultValue={editCategory?.description || ''} 
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent">الفئة الأب (اختياري)</Label>
              <select 
                id="parent" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={editCategory?.parentId || ''}
              >
                <option value="">بدون فئة أب</option>
                {categories.filter(cat => !cat.parentId).map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="status">حالة الفئة</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="status" 
                  defaultChecked={editCategory ? editCategory.isActive : true} 
                />
                <Label htmlFor="status" className="mr-2">
                  {editCategory ? (editCategory.isActive ? 'نشط' : 'غير نشط') : 'نشط'}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              {editCategory ? 'حفظ التغييرات' : 'إضافة الفئة'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-blue-50">
                <Layers className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-gray-500 text-sm">إجمالي الفئات</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-green-50">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter(c => c.isActive).length}
            </div>
            <p className="text-gray-500 text-sm">الفئات النشطة</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-oksale-50">
                <Layers className="h-5 w-5 text-oksale-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.reduce((sum, cat) => sum + cat.productsCount, 0)}
            </div>
            <p className="text-gray-500 text-sm">إجمالي المنتجات في الفئات</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCategories;
