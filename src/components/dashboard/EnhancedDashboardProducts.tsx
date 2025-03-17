
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Check,
  X,
  Image as ImageIcon,
  Upload,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
  TagIcon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { cn } from "@/lib/utils";
import { uploadProductImageWithFeedback, deleteProductImage } from '@/utils/imageUploadUtils';
import ProductImageGallery from '@/components/ProductImageGallery';
import { useDebounce } from '@/hooks/useDebounce';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  in_stock: boolean;
  store_id: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  category_id: string | null;
}

interface EnhancedDashboardProductsProps {
  storeData: any;
}

const EnhancedDashboardProducts: React.FC<EnhancedDashboardProductsProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [isProductActive, setIsProductActive] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // مرشحات إضافية
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'high'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'created_at' | 'name' | 'price'>('created_at');

  useEffect(() => {
    fetchProducts();
  }, [storeData]);

  const fetchProducts = async () => {
    if (storeData?.id) {
      setLoading(true);
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('store_id', storeData.id);
          
        // تطبيق الترتيب
        query = query.order(sortField, { ascending: sortDirection === 'asc' });

        const { data, error } = await query;

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
      } finally {
        setLoading(false);
      }
    }
  };

  // دالة تصفية المنتجات المعروضة
  const getFilteredProducts = () => {
    return products.filter(product => {
      // تصفية حسب النص
      const matchesSearch = !debouncedSearchTerm || (
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        (product.description && product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
      
      // تصفية حسب التبويب النشط
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'in-stock' && product.in_stock) || 
        (activeTab === 'out-of-stock' && !product.in_stock);
      
      // تصفية حسب السعر
      const matchesPrice = priceFilter === 'all' ||
        (priceFilter === 'low' && product.price < 100) ||
        (priceFilter === 'high' && product.price >= 100);
      
      // تصفية حسب المخزون
      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'in-stock' && product.in_stock) ||
        (stockFilter === 'out-of-stock' && !product.in_stock);
      
      return matchesSearch && matchesTab && matchesPrice && matchesStock;
    });
  };

  const filteredProducts = getFilteredProducts();

  const resetForm = () => {
    setNewProductName('');
    setNewProductDescription('');
    setNewProductPrice('');
    setIsProductActive(true);
    setSelectedProduct(null);
    setIsEditing(false);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleProductOpen = () => {
    resetForm();
    setIsProductOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setNewProductName(product.name);
    setNewProductDescription(product.description || '');
    setNewProductPrice(product.price.toString());
    setIsProductActive(product.in_stock);
    setImagePreview(product.image_url);
    setIsProductOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    // إذا كان التحرير نشطًا والمنتج يحتوي على صورة، قم بحذفها من التخزين أيضًا
    if (isEditing && selectedProduct?.image_url) {
      try {
        await deleteProductImage(selectedProduct.image_url);
      } catch (error) {
        console.error("Failed to delete product image:", error);
      }
    }
    
    setImagePreview(null);
    setImageFile(null);
    
    // إعادة تعيين ملف الإدخال
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateProduct = async () => {
    if (!newProductName || !newProductPrice) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى ملء الحقول المطلوبة.",
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
      setIsUploading(true);
      let imageUrl = null;
      
      if (imageFile) {
        try {
          imageUrl = await uploadProductImageWithFeedback(
            imageFile, 
            storeData.id,
            (url) => console.log("Image uploaded:", url),
            (error) => {
              console.error("Error uploading image:", error);
              throw error;
            }
          );
        } catch (error) {
          console.error("Failed to upload image:", error);
          toast({
            variant: "destructive",
            title: "فشل تحميل الصورة",
            description: "حدث خطأ أثناء تحميل صورة المنتج، لكن سيتم الاستمرار في إنشاء المنتج.",
          });
        }
      }

      const { data: newData, error } = await supabase
        .from('products')
        .insert([
          {
            store_id: storeData.id,
            name: newProductName,
            description: newProductDescription,
            price: price,
            in_stock: isProductActive,
            image_url: imageUrl
          },
        ])
        .select();

      if (error) {
        console.error("Error creating product:", error);
        throw error;
      }

      setProducts([...products, ...(newData || [])]);
      resetForm();
      setIsProductOpen(false);
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    
    if (!newProductName || !newProductPrice) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى ملء الحقول المطلوبة.",
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
      setIsUploading(true);
      let imageUrl = selectedProduct.image_url;
      
      // إذا تم تحديد صورة جديدة، قم بالتحميل
      if (imageFile) {
        try {
          // إذا كانت هناك صورة قديمة، قم بحذفها أولاً
          if (selectedProduct.image_url) {
            await deleteProductImage(selectedProduct.image_url);
          }
          
          // تحميل الصورة الجديدة
          imageUrl = await uploadProductImageWithFeedback(
            imageFile, 
            storeData.id,
            (url) => console.log("Image uploaded:", url),
            (error) => {
              console.error("Error uploading image:", error);
              throw error;
            }
          );
        } catch (error) {
          console.error("Failed to handle product image:", error);
          toast({
            variant: "destructive",
            title: "فشل معالجة الصورة",
            description: "حدث خطأ أثناء معالجة صورة المنتج، لكن سيتم الاستمرار في تحديث المنتج.",
          });
        }
      } 
      // إذا تم إزالة الصورة (لا توجد صورة جديدة والصورة السابقة تم إزالتها)
      else if (!imagePreview && selectedProduct.image_url) {
        imageUrl = null;
      }

      const { data: updatedData, error } = await supabase
        .from('products')
        .update({
          name: newProductName,
          description: newProductDescription,
          price: price,
          in_stock: isProductActive,
          image_url: imageUrl,
          updated_at: new Date().toISOString()
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
      
      resetForm();
      setIsProductOpen(false);
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      // إذا كان المنتج يحتوي على صورة، قم بحذفها أولاً
      if (product.image_url) {
        try {
          await deleteProductImage(product.image_url);
        } catch (imageError) {
          console.error("Error deleting product image:", imageError);
          // استمر رغم فشل حذف الصورة
        }
      }
      
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

  // تبديل الترتيب
  const toggleSort = (field: 'created_at' | 'name' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    // إعادة تطبيق الاستعلام
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center w-11 h-11 rounded-xl shadow-sm relative overflow-hidden",
            "bg-gradient-to-br from-purple-800 to-indigo-900",
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-white/20 before:rounded-t-full"
          )}>
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">إدارة المنتجات</h1>
            <p className="text-gray-600">إدارة منتجات متجرك ({products.length})</p>
          </div>
        </div>
        <Button onClick={handleProductOpen} className={cn(
          "relative overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700",
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-white/10 before:rounded-t-full",
          "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
        )}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة منتج
        </Button>
      </div>

      {/* التبويبات والبحث والتصفية */}
      <Card className="mb-6 border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">جميع المنتجات</TabsTrigger>
                <TabsTrigger value="in-stock">متوفر</TabsTrigger>
                <TabsTrigger value="out-of-stock">نفذت الكمية</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث عن منتج..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {debouncedSearchTerm !== searchTerm && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border-gray-200 hover:border-gray-300 transition-all duration-300">
                  <Filter className="h-4 w-4" />
                  <span>تصفية</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => toggleSort('created_at')}
                  className={cn(
                    "flex-shrink-0",
                    sortField === 'created_at' ? "border-purple-300 text-purple-700" : ""
                  )}
                >
                  التاريخ {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => toggleSort('price')}
                  className={cn(
                    "flex-shrink-0",
                    sortField === 'price' ? "border-purple-300 text-purple-700" : ""
                  )}
                >
                  السعر {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="animate-pulse border-none shadow-sm">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 hover:shadow-purple-500/10">
              <div className="relative h-48 overflow-hidden">
                <ProductImageGallery 
                  images={product.image_url || ''} 
                  alt={product.name}
                  fallbackText="لا توجد صورة"
                  showControls={false}
                />
                
                <div className="absolute top-2 right-2">
                  <Badge variant={product.in_stock ? "default" : "secondary"} className={product.in_stock ? "bg-gradient-to-r from-purple-700 to-indigo-800" : ""}>
                    {product.in_stock ? "متوفر" : "غير متوفر"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                {product.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-purple-700">{product.price} ر.س</span>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditProduct(product)}
                      className="hover:bg-purple-50"
                    >
                      <Edit className="h-4 w-4 text-purple-700" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteProduct(product)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد منتجات</h3>
            <p className="text-gray-500 text-center mb-4">
              لم يتم العثور على أي منتجات مطابقة لمعايير البحث الخاصة بك.
            </p>
            <Button onClick={() => setSearchTerm('')}>عرض كل المنتجات</Button>
          </div>
        )}
      </div>

      {/* مربع حوار إضافة/تعديل المنتج */}
      <Drawer open={isProductOpen} onOpenChange={setIsProductOpen}>
        <DrawerContent className="h-[85%]">
          <DrawerHeader>
            <DrawerTitle>{isEditing ? 'تعديل منتج' : 'إضافة منتج جديد'}</DrawerTitle>
            <DrawerDescription>
              {isEditing ? 'قم بتعديل معلومات المنتج' : 'أدخل معلومات المنتج الجديد'}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 overflow-y-auto">
            <div className="mb-4">
              <Label htmlFor="product-image" className="block mb-2">صورة المنتج</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-2 bg-gray-50 relative">
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <img 
                      src={imagePreview} 
                      alt="Product Preview" 
                      className="w-full h-full object-contain" 
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-center text-sm mb-2">اسحب وأفلت الصورة هنا، أو انقر للاختيار</p>
                    <p className="text-gray-400 text-xs">PNG، JPG أو GIF بحد أقصى 5 ميغابايت</p>
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
                        <p className="text-purple-700">جارِ تحميل الصورة...</p>
                      </div>
                    )}
                  </>
                )}
                <input 
                  type="file"
                  id="product-image"
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="name" className="block mb-2">اسم المنتج *</Label>
              <Input
                id="name"
                placeholder="أدخل اسم المنتج"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description" className="block mb-2">وصف المنتج</Label>
              <Textarea
                id="description"
                placeholder="أدخل وصف المنتج"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                rows={4}
                disabled={isUploading}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="price" className="block mb-2">سعر المنتج *</Label>
              <div className="relative">
                <Input
                  id="price"
                  placeholder="0.00"
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="pl-16"
                  disabled={isUploading}
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 border-r border-gray-300 rounded-l-md text-gray-500">
                  ر.س
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <Label htmlFor="active">متوفر في المخزون</Label>
              <Switch
                id="active"
                checked={isProductActive}
                onCheckedChange={(checked) => setIsProductActive(checked)}
                disabled={isUploading}
              />
            </div>

            <Separator className="my-6" />

            <div className="mb-4">
              <Label className="block mb-2">الفئات</Label>
              <p className="text-gray-500 text-sm">سيتم تنفيذ إضافة الفئات في تحديث لاحق</p>
            </div>
          </div>
          <DrawerFooter>
            <Button 
              onClick={isEditing ? handleUpdateProduct : handleCreateProduct}
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  جارِ المعالجة...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {isEditing ? 'تحديث المنتج' : 'إضافة المنتج'}
                </>
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={resetForm} disabled={isUploading}>إلغاء</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EnhancedDashboardProducts;
