import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Banknote,
  Settings,
  Plus,
  Edit,
  Trash2,
  ChevronsLeft,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [isProductActive, setIsProductActive] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;

        if (!userId) {
          console.error("User ID not found in session");
          navigate('/signin');
          return;
        }

        const { data: store, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('owner_id', userId)
          .single();

        if (storeError) {
          console.error("Error fetching store data:", storeError);
          throw storeError;
        }

        setStoreData(store);
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل بيانات المتجر",
          description: "حدث خطأ أثناء تحميل بيانات المتجر، يرجى المحاولة مرة أخرى.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (storeData?.id) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('store_id', storeData.id);

          if (error) {
            console.error("Error fetching products:", error);
            throw error;
          }

          setProducts(data || []);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          toast({
            variant: "destructive",
            title: "فشل تحميل المنتجات",
            description: "حدث خطأ أثناء تحميل المنتجات، يرجى المحاولة مرة أخرى.",
          });
        }
      }
    };

    fetchProducts();
  }, [storeData, toast]);

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleProductsToggle = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const handleCreateProduct = async () => {
    if (!newProductName || !newProductDescription || !newProductPrice) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول.",
      });
      return;
    }

    const price = parseFloat(newProductPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "السعر يجب أن يكون رقمًا صالحًا وأكبر من الصفر.",
      });
      return;
    }

    try {
      const { data: newData, error } = await supabase
        .from('products')
        .insert([
          {
            store_id: storeData.id,
            name: newProductName,
            description: newProductDescription,
            price: price,
            is_active: isProductActive,
          },
        ])
        .select();

      if (error) {
        console.error("Error creating product:", error);
        throw error;
      }

      setProducts([...products, ...(newData || [])]);
      setNewProductName('');
      setNewProductDescription('');
      setNewProductPrice('');
      setIsProductActive(true);
      toast({
        title: "تم إنشاء المنتج بنجاح",
        description: "تمت إضافة المنتج الجديد إلى متجرك.",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      toast({
        variant: "destructive",
        title: "فشل إنشاء المنتج",
        description: "حدث خطأ أثناء إنشاء المنتج، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setNewProductName(product.name);
    setNewProductDescription(product.description);
    setNewProductPrice(product.price.toString());
    setIsProductActive(product.is_active);
  };

  const handleUpdateProduct = async () => {
    if (!newProductName || !newProductDescription || !newProductPrice) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول.",
      });
      return;
    }

    const price = parseFloat(newProductPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "السعر يجب أن يكون رقمًا صالحًا وأكبر من الصفر.",
      });
      return;
    }

    try {
      if (!selectedProduct) {
        console.error("No product selected for update");
        return;
      }

      const { data: updatedData, error } = await supabase
        .from('products')
        .update({
          name: newProductName,
          description: newProductDescription,
          price: price,
          is_active: isProductActive,
        })
        .eq('id', selectedProduct.id)
        .select();

      if (error) {
        console.error("Error updating product:", error);
        throw error;
      }

      setProducts(products.map(product =>
        product.id === selectedProduct.id 
          ? (updatedData && updatedData[0] ? updatedData[0] : product) 
          : product
      ));
      
      setNewProductName('');
      setNewProductDescription('');
      setNewProductPrice('');
      setIsProductActive(true);
      setIsEditing(false);
      setSelectedProduct(null);
      toast({
        title: "تم تحديث المنتج بنجاح",
        description: "تم تحديث المنتج بنجاح في متجرك.",
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      toast({
        variant: "destructive",
        title: "فشل تحديث المنتج",
        description: "حدث خطأ أثناء تحديث المنتج، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) {
        console.error("Error deleting product:", error);
        throw error;
      }

      setProducts(products.filter(p => p.id !== product.id));
      toast({
        title: "تم حذف المنتج بنجاح",
        description: "تم حذف المنتج من متجرك.",
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast({
        variant: "destructive",
        title: "فشل حذف المنتج",
        description: "حدث خطأ أثناء حذف المنتج، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-oksale-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>لا يوجد متجر</CardTitle>
            <CardDescription>
              لم يتم العثور على متجر مرتبط بحسابك. يرجى إنشاء متجر جديد.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/signup')}>إنشاء متجر</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statisticsData = [
    {
      name: "المنتجات",
      value: storeData?.products_count ? storeData.products_count.toString() : "0",
      icon: <Package className="h-5 w-5 text-oksale-600" />,
      description: "إجمالي المنتجات",
    },
    {
      name: "الزيارات",
      value: storeData?.visits ? storeData.visits.toString() : "0",
      icon: <Users className="h-5 w-5 text-oksale-600" />,
      description: "زائر هذا الشهر",
    },
    {
      name: "الطلبات",
      value: storeData?.orders_count ? storeData.orders_count.toString() : "0",
      icon: <ShoppingCart className="h-5 w-5 text-oksale-600" />,
      description: "طلب هذا الشهر",
    },
    {
      name: "الإيرادات",
      value: storeData?.revenue ? `${storeData.revenue.toString()} ر.س` : "0 ر.س",
      icon: <Banknote className="h-5 w-5 text-oksale-600" />,
      description: "الإيرادات هذا الشهر",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Drawer open={isProductsOpen} onOpenChange={setIsProductsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">المنتجات</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>إدارة المنتجات</DrawerTitle>
            <DrawerDescription>
              إضافة وتعديل وحذف المنتجات في متجرك.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="mb-4">
              <Label htmlFor="name">اسم المنتج</Label>
              <Input
                id="name"
                placeholder="اسم المنتج"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">وصف المنتج</Label>
              <Textarea
                id="description"
                placeholder="وصف المنتج"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="price">سعر المنتج</Label>
              <Input
                id="price"
                placeholder="سعر المنتج"
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <Label htmlFor="active">نشط</Label>
              <Switch
                id="active"
                checked={isProductActive}
                onCheckedChange={(checked) => setIsProductActive(checked)}
              />
            </div>
            <DrawerFooter>
              <Button variant="outline" onClick={() => {
                setIsProductsOpen(false);
                setNewProductName('');
                setNewProductDescription('');
                setNewProductPrice('');
                setIsProductActive(true);
                setIsEditing(false);
                setSelectedProduct(null);
              }}>
                إلغاء
              </Button>
              {isEditing ? (
                <Button onClick={handleUpdateProduct}>تحديث المنتج</Button>
              ) : (
                <Button onClick={handleCreateProduct}>إنشاء المنتج</Button>
              )}
            </DrawerFooter>
          </div>
          <Separator />
          <ScrollArea className="h-[50vh] w-full rounded-md border p-4">
            <Table>
              <TableCaption>قائمة المنتجات في متجرك.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المنتج</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} ر.س</TableCell>
                    <TableCell>
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        تعديل
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        حذف
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Button onClick={() => setIsProductsOpen(false)}>
                      <ChevronsLeft className="h-4 w-4 mr-2" />
                      إغلاق
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white shadow-md p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{storeData?.name}</h2>
              <Link to={`/store/${storeData?.handle.replace('@', '')}`} className="text-sm text-gray-500 hover:text-gray-700">
                {storeData?.handle}
              </Link>
            </div>
          </div>
          <Separator className="mb-4" />
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-oksale-700">
                  <Home className="h-4 w-4" />
                  <span>لوحة التحكم</span>
                </Link>
              </li>
              <li>
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 hover:text-oksale-700 w-full justify-start">
                  <Package className="h-4 w-4" />
                  <span>المنتجات</span>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 hover:text-oksale-700 w-full justify-start" onClick={handleSettingsToggle}>
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={
              <div>
                <h1 className="text-2xl font-semibold mb-4">إحصائيات المتجر</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statisticsData.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{item.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">نظرة عامة على الأداء</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>الزيارات حسب الموقع الجغرافي</CardTitle>
                    <CardDescription>توزيع الزيارات من مختلف المناطق.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={75} />
                  </CardContent>
                </Card>
              </div>
            } />
            <Route path="/settings" element={
              <div className="space-y-4">
                <h1 className="text-2xl font-semibold mb-4">إعدادات المتجر</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>تعديل معلومات المتجر</CardTitle>
                    <CardDescription>تحديث اسم المتجر ومعلومات الاتصال.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="storeName">اسم المتجر</Label>
                        <Input type="text" id="storeName" defaultValue={storeData?.name} />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">البريد الإلكتروني للتواصل</Label>
                        <Input type="email" id="contactEmail" defaultValue="contact@example.com" />
                      </div>
                      <Button>حفظ التغييرات</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

