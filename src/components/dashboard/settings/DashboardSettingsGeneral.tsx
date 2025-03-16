import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin, Upload, Phone, Mail, Instagram, Twitter, Facebook, Link2, Image } from 'lucide-react';
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
    handle: storeData?.handle?.replace('@', '') || '',
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
          handle: storeInfo.handle,
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
        <h1 className="text-2xl font-bold mb-1">المعلومات العامة</h1>
        <p className="text-gray-600">إدارة المعلومات الأساسية لمتجرك</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات المتجر</CardTitle>
            <CardDescription>المعلومات الأساسية التي ستظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">اسم المتجر</Label>
                <Input 
                  id="store-name" 
                  placeholder="أدخل اسم المتجر" 
                  value={storeInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-handle">معرف المتجر (Store handle)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    @
                  </span>
                  <Input 
                    id="store-handle" 
                    placeholder="yourstore" 
                    value={storeInfo.handle}
                    onChange={handleInputChange}
                    dir="ltr"
                    className="rounded-r-none"
                  />
                </div>
                <p className="text-sm text-gray-500">سيظهر في رابط المتجر: /yourstore</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-description">وصف المتجر</Label>
              <Textarea 
                id="store-description" 
                placeholder="أدخل وصفاً لمتجرك" 
                rows={4}
                value={storeInfo.description}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">يظهر في صفحة المتجر ويساعد في تحسين ظهور متجرك في محركات البحث</p>
            </div>

            <div className="space-y-2">
              <Label>شعار المتجر</Label>
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  {storeInfo.logo_url ? (
                    <AvatarImage src={storeInfo.logo_url} alt={storeInfo.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white text-2xl">
                      {storeInfo.name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <input
                    type="file"
                    id="logo-upload"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <Button 
                    variant="outline" 
                    className="mb-2"
                    disabled={logoUploading}
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 ml-2" />
                    {logoUploading ? 'جارِ الرفع...' : 'رفع شعار جديد'}
                  </Button>
                  <p className="text-sm text-gray-500">
                    يفضل استخدام صورة مربعة بأبعاد 500×500 بيكسل بصيغة PNG أو JPG
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>صورة غلاف المتجر</Label>
              <div className="border border-dashed border-gray-300 rounded-md p-4">
                {storeInfo.cover_url ? (
                  <div className="relative">
                    <img 
                      src={storeInfo.cover_url} 
                      alt="غلاف المتجر" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={coverUploading}
                      >
                        <Upload className="h-4 w-4 ml-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-md">
                    <Image className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">لم يتم تحميل صورة غلاف بعد</p>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={coverUploading}
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      {coverUploading ? 'جارِ الرفع...' : 'رفع صورة الغلاف'}
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  id="cover-upload"
                  ref={coverInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleCoverUpload}
                />
                <p className="text-sm text-gray-500 mt-2">
                  يفضل استخدام صورة بنسبة عرض 3:1 مثل 1200×400 بيكسل بصيغة JPG أو PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات الاتصال</CardTitle>
            <CardDescription>معلومات الاتصال التي ستظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-email">البريد الإلكتروني</Label>
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
                    className="rounded-r-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">رقم الهاتف</Label>
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
                    className="rounded-r-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-address">عنوان المتجر</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <Input 
                  id="store-address" 
                  placeholder="أدخل عنوان المتجر" 
                  value={storeInfo.address}
                  onChange={handleInputChange}
                  className="rounded-r-none"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-base font-medium">وسائل التواصل الاجتماعي</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social-instagram">انستجرام</Label>
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
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-twitter">تويتر (X)</Label>
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
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-facebook">فيسبوك</Label>
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
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-website">الموقع الإلكتروني</Label>
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
                      className="rounded-r-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإعدادات الإقليمية</CardTitle>
            <CardDescription>إعدادات اللغة والعملة والدولة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-language">اللغة الأساسية</Label>
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
                <Label htmlFor="store-currency">العملة</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-country">الدولة</Label>
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
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? 'جارِ الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsGeneral;
