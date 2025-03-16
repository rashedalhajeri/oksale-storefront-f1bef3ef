
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  MapPin, 
  Upload, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook, 
  Link2, 
  Image, 
  LockIcon,
  Store,
  GanttChartSquare,
  Languages,
  GlobeIcon,
  CircleDollarSign,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DashboardSettingsGeneralProps {
  storeData: any;
}

const DashboardSettingsGeneral: React.FC<DashboardSettingsGeneralProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: storeData?.name || '',
    handle: storeData?.handle || '',
    description: storeData?.description || '',
    logo_url: storeData?.logo_url || '',
    cover_url: storeData?.cover_url || '',
    email: storeData?.contact_email || '',
    phone: storeData?.contact_phone || '',
    address: storeData?.address || '',
    instagram: storeData?.instagram || '',
    twitter: storeData?.twitter || '',
    facebook: storeData?.facebook || '',
    website: storeData?.website || '',
    language: storeData?.language || 'ar',
    currency: storeData?.currency || 'SAR',
    country: storeData?.country || 'SA',
  });
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  
  const handleSaveChanges = async () => {
    setLoading(true);
    
    try {
      console.log('Updating store with ID:', storeData.id);
      
      const { error } = await supabase
        .from('stores')
        .update({
          name: storeInfo.name,
          description: storeInfo.description,
          logo_url: storeInfo.logo_url,
          cover_url: storeInfo.cover_url,
          contact_email: storeInfo.email,
          contact_phone: storeInfo.phone,
          instagram: storeInfo.instagram,
          twitter: storeInfo.twitter,
          facebook: storeInfo.facebook,
          website: storeInfo.website,
          language: storeInfo.language,
          currency: storeInfo.currency,
          country: storeInfo.country
        })
        .eq('id', storeData.id);
      
      if (error) {
        console.error('Error updating store:', error);
        throw error;
      }
      
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث معلومات المتجر بنجاح.",
      });
    } catch (error) {
      console.error('Error updating store:', error);
      toast({
        variant: "destructive",
        title: "فشل حفظ التغييرات",
        description: "حدث خطأ أثناء تحديث المعلومات. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace('store-', '').replace('social-', '');
    
    if (key === 'handle') {
      return;
    }
    
    setStoreInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSelectChange = (value: string, key: string) => {
    setStoreInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const uploadFile = async (file: File, folder: string) => {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('يرجى اختيار ملف صورة صالح');
      }
      
      const maxSize = folder === 'logos' ? 2 * 1024 * 1024 : 4 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(`حجم الملف كبير جدًا. يجب أن يكون أقل من ${folder === 'logos' ? '2' : '4'} ميجابايت`);
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${storeData.id}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      console.log(`Uploading file to store-assets/${filePath}`);
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('store-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`فشل رفع الملف: ${uploadError.message}`);
      }
      
      const { data } = supabase.storage
        .from('store-assets')
        .getPublicUrl(filePath);
      
      console.log('File uploaded successfully. Public URL:', data.publicUrl);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadFile function:', error);
      throw error;
    }
  };
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      setLogoUploading(true);
      console.log('Starting logo upload for file:', file.name);
      
      const publicUrl = await uploadFile(file, 'logos');
      
      setStoreInfo(prev => ({
        ...prev,
        logo_url: publicUrl
      }));
      
      toast({
        title: "تم رفع الشعار",
        description: "تم رفع شعار المتجر بنجاح.",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        variant: "destructive",
        title: "فشل رفع الشعار",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء رفع الشعار. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
    }
  };
  
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      setCoverUploading(true);
      console.log('Starting cover upload for file:', file.name);
      
      const publicUrl = await uploadFile(file, 'covers');
      
      setStoreInfo(prev => ({
        ...prev,
        cover_url: publicUrl
      }));
      
      toast({
        title: "تم رفع صورة الغلاف",
        description: "تم رفع صورة غلاف المتجر بنجاح.",
      });
    } catch (error) {
      console.error('Error uploading cover:', error);
      toast({
        variant: "destructive",
        title: "فشل رفع صورة الغلاف",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء رفع صورة الغلاف. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setCoverUploading(false);
      if (coverInputRef.current) {
        coverInputRef.current.value = '';
      }
    }
  };

  const currencies = [
    { value: "SAR", label: "ريال سعودي (SAR)" },
    { value: "AED", label: "درهم إماراتي (AED)" },
    { value: "USD", label: "دولار أمريكي (USD)" },
    { value: "EUR", label: "يورو (EUR)" },
    { value: "KWD", label: "دينار كويتي (KWD)" },
    { value: "BHD", label: "دينار بحريني (BHD)" },
    { value: "QAR", label: "ريال قطري (QAR)" },
    { value: "OMR", label: "ريال عماني (OMR)" },
    { value: "EGP", label: "جنيه مصري (EGP)" },
    { value: "JOD", label: "دينار أردني (JOD)" },
  ];

  const countries = [
    { value: "SA", label: "المملكة العربية السعودية" },
    { value: "AE", label: "الإمارات العربية المتحدة" },
    { value: "KW", label: "الكويت" },
    { value: "BH", label: "البحرين" },
    { value: "QA", label: "قطر" },
    { value: "OM", label: "عمان" },
    { value: "EG", label: "مصر" },
    { value: "JO", label: "الأردن" },
    { value: "IQ", label: "العراق" },
    { value: "YE", label: "اليمن" },
    { value: "LB", label: "لبنان" },
    { value: "PS", label: "فلسطين" },
    { value: "SY", label: "سوريا" },
    { value: "SD", label: "السودان" },
    { value: "LY", label: "ليبيا" },
    { value: "TN", label: "تونس" },
    { value: "DZ", label: "الجزائر" },
    { value: "MA", label: "المغرب" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">إعدادات المتجر</h1>
        <p className="text-gray-600">تخصيص وإدارة معلومات متجرك الأساسية</p>
      </div>

      <div className="space-y-6">
        {/* Store Profile Card */}
        <Card className="overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-oksale-600 to-oksale-800">
            {storeInfo.cover_url && (
              <img 
                src={storeInfo.cover_url} 
                alt="غلاف المتجر" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 right-0 p-2">
              <Button 
                variant="secondary" 
                size="sm"
                className="text-xs"
                onClick={() => coverInputRef.current?.click()}
                disabled={coverUploading}
              >
                <Upload className="h-3 w-3 ml-1" />
                {coverUploading ? 'جارِ الرفع...' : 'تغيير الغلاف'}
              </Button>
              <input
                type="file"
                id="cover-upload"
                ref={coverInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverUpload}
              />
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-10 mb-4">
              <div className="relative flex-shrink-0">
                <Avatar className="h-20 w-20 ring-4 ring-background">
                  {storeInfo.logo_url ? (
                    <AvatarImage src={storeInfo.logo_url} alt={storeInfo.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white text-2xl">
                      {storeInfo.name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <button 
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={logoUploading}
                >
                  <Upload className="h-3 w-3" />
                </button>
                <input
                  type="file"
                  id="logo-upload"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
              
              <div className="flex-grow">
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">{storeInfo.name || 'اسم المتجر'}</h2>
                    <span className="bg-oksale-50 text-oksale-700 px-2 py-0.5 rounded-full text-xs">
                      {storeInfo.handle ? `@${storeInfo.handle}` : '@username'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{storeInfo.description || 'وصف المتجر يظهر هنا'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Globe className="h-4 w-4 text-oksale-600" />
                <span>{countries.find(c => c.value === storeInfo.country)?.label || 'الدولة'}</span>
              </div>
              {storeInfo.address && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="h-4 w-4 text-oksale-600" />
                  <span className="truncate">{storeInfo.address}</span>
                </div>
              )}
              {storeInfo.email && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Mail className="h-4 w-4 text-oksale-600" />
                  <span className="truncate">{storeInfo.email}</span>
                </div>
              )}
              {storeInfo.phone && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Phone className="h-4 w-4 text-oksale-600" />
                  <span dir="ltr">{storeInfo.phone}</span>
                </div>
              )}
            </div>
            
            <div className="flex mt-4 gap-2">
              {storeInfo.instagram && (
                <a href={`https://instagram.com/${storeInfo.instagram}`} target="_blank" rel="noopener noreferrer" 
                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Instagram className="h-4 w-4 text-gray-700" />
                </a>
              )}
              {storeInfo.twitter && (
                <a href={`https://twitter.com/${storeInfo.twitter}`} target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Twitter className="h-4 w-4 text-gray-700" />
                </a>
              )}
              {storeInfo.facebook && (
                <a href={`https://facebook.com/${storeInfo.facebook}`} target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Facebook className="h-4 w-4 text-gray-700" />
                </a>
              )}
              {storeInfo.website && (
                <a href={storeInfo.website} target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Globe className="h-4 w-4 text-gray-700" />
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Basic Store Information */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center">
              <Store className="h-5 w-5 ml-2 text-oksale-600" />
              المعلومات الأساسية
            </CardTitle>
            <CardDescription>معلومات المتجر الأساسية التي تظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name" className="font-medium">اسم المتجر</Label>
                <Input 
                  id="store-name" 
                  placeholder="أدخل اسم المتجر" 
                  value={storeInfo.name}
                  onChange={handleInputChange}
                  className="transition-all focus:border-oksale-500"
                />
                <p className="text-xs text-gray-500">الاسم الذي سيظهر للعملاء وفي نتائج البحث</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-handle" className="flex items-center gap-1 font-medium">
                  معرف المتجر
                  <LockIcon className="h-3 w-3 text-gray-500" />
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    @
                  </span>
                  <Input 
                    id="store-handle" 
                    placeholder="yourstore" 
                    value={storeInfo.handle.replace('@', '')}
                    disabled={true}
                    dir="ltr"
                    className="rounded-r-none bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 ml-1 text-oksale-600" />
                  معرف المتجر لا يمكن تغييره بعد الإنشاء
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-description" className="font-medium">وصف المتجر</Label>
              <Textarea 
                id="store-description" 
                placeholder="أدخل وصفاً لمتجرك" 
                rows={4}
                value={storeInfo.description}
                onChange={handleInputChange}
                className="transition-all focus:border-oksale-500"
              />
              <p className="text-xs text-gray-500">يظهر في صفحة المتجر ويساعد في تحسين ظهور متجرك في محركات البحث</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center">
              <Phone className="h-5 w-5 ml-2 text-oksale-600" />
              معلومات الاتصال
            </CardTitle>
            <CardDescription>وسائل التواصل التي ستظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-email" className="font-medium">البريد الإلكتروني</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input 
                    id="store-email" 
                    type="email"
                    placeholder="contact@yourstore.com" 
                    value={storeInfo.email}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone" className="font-medium">رقم الهاتف</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <Input 
                    id="store-phone" 
                    placeholder="+966 55 123 4567" 
                    value={storeInfo.phone}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-address" className="font-medium">عنوان المتجر</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <Input 
                  id="store-address" 
                  placeholder="أدخل عنوان المتجر" 
                  value={storeInfo.address}
                  onChange={handleInputChange}
                  className="rounded-r-none transition-all focus:border-oksale-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center">
              <Globe className="h-5 w-5 ml-2 text-oksale-600" />
              وسائل التواصل الاجتماعي
            </CardTitle>
            <CardDescription>حسابات التواصل الاجتماعي لمتجرك</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="social-instagram" className="font-medium">انستجرام</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <Input 
                    id="social-instagram" 
                    placeholder="yourstorename" 
                    value={storeInfo.instagram}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
                <p className="text-xs text-gray-500">أدخل اسم المستخدم فقط بدون @</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social-twitter" className="font-medium">تويتر (X)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Twitter className="h-4 w-4" />
                  </span>
                  <Input 
                    id="social-twitter" 
                    placeholder="yourstorename" 
                    value={storeInfo.twitter}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
                <p className="text-xs text-gray-500">أدخل اسم المستخدم فقط بدون @</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="social-facebook" className="font-medium">فيسبوك</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Facebook className="h-4 w-4" />
                  </span>
                  <Input 
                    id="social-facebook" 
                    placeholder="yourstorename" 
                    value={storeInfo.facebook}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
                <p className="text-xs text-gray-500">أدخل اسم الصفحة أو المعرف</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social-website" className="font-medium">الموقع الإلكتروني</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Globe className="h-4 w-4" />
                  </span>
                  <Input 
                    id="social-website" 
                    placeholder="https://www.yourwebsite.com" 
                    value={storeInfo.website}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none transition-all focus:border-oksale-500"
                  />
                </div>
                <p className="text-xs text-gray-500">أدخل الرابط كاملاً بما في ذلك https://</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center">
              <GlobeIcon className="h-5 w-5 ml-2 text-oksale-600" />
              الإعدادات الإقليمية
            </CardTitle>
            <CardDescription>إعدادات اللغة والعملة والدولة</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-language" className="font-medium">اللغة الأساسية</Label>
                <Select 
                  value={storeInfo.language}
                  onValueChange={(value) => handleSelectChange(value, 'language')}
                >
                  <SelectTrigger id="store-language" className="w-full">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                    <SelectItem value="fr">الفرنسية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-currency" className="font-medium">العملة</Label>
                <Select 
                  value={storeInfo.currency}
                  onValueChange={(value) => handleSelectChange(value, 'currency')}
                >
                  <SelectTrigger id="store-currency" className="w-full">
                    <SelectValue placeholder="اختر العملة" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-country" className="font-medium">الدولة</Label>
                <Select 
                  value={storeInfo.country}
                  onValueChange={(value) => handleSelectChange(value, 'country')}
                >
                  <SelectTrigger id="store-country" className="w-full">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveChanges} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? 'جارِ الحفظ...' : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsGeneral;
