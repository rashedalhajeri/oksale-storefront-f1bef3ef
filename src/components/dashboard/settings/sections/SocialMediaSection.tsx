
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Instagram, Twitter, Facebook } from 'lucide-react';

interface SocialMediaSectionProps {
  storeInfo: {
    instagram: string;
    twitter: string;
    facebook: string;
    website: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  storeInfo,
  handleInputChange
}) => {
  return (
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
  );
};

export default SocialMediaSection;
