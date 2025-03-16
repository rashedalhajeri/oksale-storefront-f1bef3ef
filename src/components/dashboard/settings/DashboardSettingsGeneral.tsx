
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/utils/uploadUtils";

// Import refactored components
import StorePreview from "./sections/store-preview";
import StoreInformationSection from "./sections/StoreInformationSection";
import ContactInformationSection from "./sections/ContactInformationSection";
import SocialMediaSection from "./sections/SocialMediaSection";
import SocialMediaThemeSection from "./sections/SocialMediaThemeSection";
import RegionalSettingsSection from "./sections/RegionalSettingsSection";

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
    snapchat: storeData?.snapchat || '',
    tiktok: storeData?.tiktok || '',
    whatsapp: storeData?.whatsapp || '',
    language: storeData?.language || 'ar',
    currency: storeData?.currency || 'SAR',
    country: storeData?.country || 'SA',
    use_custom_colors: storeData?.use_custom_colors || false,
    custom_color: storeData?.custom_color || '#4B5563'
  });
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  
  const handleSaveChanges = async () => {
    setLoading(true);
    
    try {
      console.log('Updating store with ID:', storeData.id);
      console.log('Store info being saved:', storeInfo);
      
      const updateData = {
        name: storeInfo.name,
        description: storeInfo.description,
        logo_url: storeInfo.logo_url,
        cover_url: storeInfo.cover_url,
        contact_email: storeInfo.email,
        contact_phone: storeInfo.phone,
        address: storeInfo.address,
        instagram: storeInfo.instagram,
        twitter: storeInfo.twitter,
        facebook: storeInfo.facebook,
        website: storeInfo.website,
        snapchat: storeInfo.snapchat,
        tiktok: storeInfo.tiktok,
        whatsapp: storeInfo.whatsapp,
        language: storeInfo.language,
        currency: storeInfo.currency,
        country: storeInfo.country,
        use_custom_colors: storeInfo.use_custom_colors,
        custom_color: storeInfo.custom_color
      };
      
      console.log('Update data object:', updateData);
      
      const { error } = await supabase
        .from('stores')
        .update(updateData)
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
    const { name, value } = e.target;
    
    if (!name) {
      const id = e.target.id;
      const key = id.replace('store-', '').replace('social-', '');
      
      if (key === 'handle') {
        return;
      }
      
      setStoreInfo(prev => ({
        ...prev,
        [key]: value
      }));
      return;
    }
    
    setStoreInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (value: string, key: string) => {
    setStoreInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      setLogoUploading(true);
      console.log('Starting logo upload for file:', file.name);
      
      const publicUrl = await uploadFile(file, 'logos', storeData.id);
      
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
      
      const publicUrl = await uploadFile(file, 'covers', storeData.id);
      
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
    { value: "AE", label: "الإما��ات العربية المتحدة" },
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
        <StorePreview 
          storeInfo={{
            name: storeInfo.name,
            handle: storeInfo.handle,
            logo_url: storeInfo.logo_url,
            cover_url: storeInfo.cover_url,
            instagram: storeInfo.instagram,
            twitter: storeInfo.twitter,
            facebook: storeInfo.facebook,
            website: storeInfo.website,
            address: storeInfo.address,
            snapchat: storeInfo.snapchat,
            tiktok: storeInfo.tiktok,
            whatsapp: storeInfo.whatsapp,
            useCustomColors: storeInfo.use_custom_colors,
            customColor: storeInfo.custom_color
          }}
          coverInputRef={coverInputRef}
          logoInputRef={logoInputRef}
          coverUploading={coverUploading}
          logoUploading={logoUploading}
          featured={storeData.featured}
          handleLogoUpload={handleLogoUpload}
          handleCoverUpload={handleCoverUpload}
          handleInputChange={handleInputChange}
          handleSaveModal={handleSaveChanges}
        />

        <StoreInformationSection 
          storeInfo={storeInfo}
          handleInputChange={handleInputChange}
        />

        <ContactInformationSection 
          storeInfo={storeInfo}
          handleInputChange={handleInputChange}
          handleSaveModal={handleSaveChanges}
        />

        <SocialMediaSection 
          storeInfo={storeInfo}
          handleInputChange={handleInputChange}
        />

        <SocialMediaThemeSection 
          storeId={storeData.id}
        />

        <RegionalSettingsSection 
          storeInfo={storeInfo}
          handleSelectChange={handleSelectChange}
          currencies={currencies}
          countries={countries}
        />

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
