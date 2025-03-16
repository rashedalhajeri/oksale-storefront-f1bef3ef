
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Upload, ShoppingBag } from 'lucide-react';

interface LogoBrandingSectionProps {
  storeInfo: {
    name: string;
    logo_url: string;
    cover_url: string;
  };
  logoInputRef: React.RefObject<HTMLInputElement>;
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoUploading: boolean;
  coverUploading: boolean;
}

const LogoBrandingSection: React.FC<LogoBrandingSectionProps> = ({
  storeInfo,
  logoInputRef,
  coverInputRef,
  logoUploading,
  coverUploading
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center">
          <Image className="h-5 w-5 ml-2 text-oksale-600" />
          الشعار والعلامة التجارية
        </CardTitle>
        <CardDescription>شعار متجرك وصورة الغلاف التي تظهر للعملاء</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="font-medium block">شعار المتجر</Label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                {storeInfo.logo_url ? (
                  <img 
                    src={storeInfo.logo_url} 
                    alt={`${storeInfo.name} logo`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={logoUploading}
                >
                  {logoUploading ? (
                    <>
                      <span className="animate-spin block w-3 h-3 border-2 border-oksale-600 border-t-transparent rounded-full ml-1"></span>
                      جارِ الرفع...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3 ml-1.5" />
                      تحميل شعار جديد
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500">
                  يفضل استخدام صورة مربعة بأبعاد 512×512 بيكسل. الحد الأقصى للحجم: 2 ميجابايت
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="font-medium block">صورة الغلاف</Label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                {storeInfo.cover_url ? (
                  <img 
                    src={storeInfo.cover_url} 
                    alt={`${storeInfo.name} cover`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                >
                  {coverUploading ? (
                    <>
                      <span className="animate-spin block w-3 h-3 border-2 border-oksale-600 border-t-transparent rounded-full ml-1"></span>
                      جارِ الرفع...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3 ml-1.5" />
                      تحميل صورة غلاف جديدة
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500">
                  يفضل استخدام صورة بنسبة عرض 2:1. الحد الأقصى للحجم: 4 ميجابايت
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoBrandingSection;
