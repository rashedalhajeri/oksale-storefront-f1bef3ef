
import React, { useState } from 'react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Info, ShoppingBag, Image, Store, Link as LinkIcon } from 'lucide-react';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import { getSocialIcon, getSocialLabel, getPlaceholder, getHelperText, getAvailablePlatforms } from '@/utils/socialMediaUtils';

interface EditStoreDialogProps {
  storeInfo: {
    name: string;
    logo_url: string;
    cover_url: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    snapchat?: string;
    tiktok?: string;
    whatsapp?: string;
    website?: string;
    useCustomColors?: boolean;
    customColor?: string;
  };
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  coverUploading: boolean;
  logoUploading: boolean;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveAndClose: () => void;
}

const EditStoreDialog: React.FC<EditStoreDialogProps> = ({
  storeInfo,
  coverInputRef,
  logoInputRef,
  coverUploading,
  logoUploading,
  handleInputChange,
  handleSaveAndClose
}) => {
  const hasCover = !!storeInfo.cover_url;
  const [activeTab, setActiveTab] = useState("store");
  
  // Get social platforms with values
  const socialPlatforms = getAvailablePlatforms().map(platform => ({
    ...platform,
    value: storeInfo[platform.type as keyof typeof storeInfo] as string || ''
  }));

  return (
    <DialogContent className="max-w-xl overflow-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">تعديل معلومات المتجر</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          قم بتحديث معلومات المتجر وصوره ووسائل التواصل الاجتماعي
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="store" className="mt-2" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="store" className="flex items-center gap-1.5">
            <Store className="h-4 w-4" />
            <span>المتجر</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-1.5">
            <Image className="h-4 w-4" />
            <span>الصور</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1.5">
            <LinkIcon className="h-4 w-4" />
            <span>التواصل</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">اسم المتجر</Label>
              <Input 
                id="store-name" 
                value={storeInfo.name} 
                onChange={handleInputChange}
                className="w-full"
                placeholder="أدخل اسم المتجر"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>شعار المتجر</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                  {storeInfo.logo_url ? (
                    <img 
                      src={storeInfo.logo_url} 
                      alt={`${storeInfo.name} logo`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => logoInputRef.current?.click()}
                  disabled={logoUploading}
                  className="flex items-center gap-1.5"
                >
                  {logoUploading ? 'جارِ الرفع...' : 'تغيير الشعار'}
                  <Upload className="mr-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>صورة الغلاف</Label>
              <div className="flex flex-col gap-3">
                <div className="w-full h-36 rounded-lg overflow-hidden">
                  <img 
                    src={hasCover ? storeInfo.cover_url : DEFAULT_COVER_IMAGE} 
                    alt={`${storeInfo.name} cover`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-200">
                  <Info className="h-4 w-4 ml-2 flex-shrink-0" />
                  <span>هذه الصورة ستظهر لجميع زوار متجرك في أعلى الصفحة الرئيسية</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                  className="flex items-center gap-1.5"
                >
                  {coverUploading ? 'جارِ الرفع...' : 'تغيير الغلاف'}
                  <Upload className="mr-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <div className="space-y-4">
            {socialPlatforms.map(platform => (
              <div key={platform.type} className="space-y-2">
                <Label htmlFor={`social-${platform.type}`} className="flex items-center gap-2">
                  {React.cloneElement(platform.icon as React.ReactElement, {
                    className: "h-4 w-4",
                    style: { color: platform.color }
                  })}
                  <span>{getSocialLabel(platform.type)}</span>
                </Label>
                <Input
                  id={`social-${platform.type}`}
                  value={platform.value || ''}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder={getPlaceholder(platform.type)}
                  dir={platform.type === 'website' || platform.type === 'whatsapp' ? 'ltr' : 'auto'}
                />
                <p className="text-xs text-muted-foreground">{getHelperText(platform.type)}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <Button type="button" onClick={handleSaveAndClose}>
          حفظ التغييرات
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditStoreDialog;
