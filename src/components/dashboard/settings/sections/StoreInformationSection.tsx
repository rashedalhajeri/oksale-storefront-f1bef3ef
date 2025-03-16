import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, LockIcon, Info } from 'lucide-react';
interface StoreInformationSectionProps {
  storeInfo: {
    name: string;
    handle: string;
    description: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const StoreInformationSection: React.FC<StoreInformationSectionProps> = ({
  storeInfo,
  handleInputChange
}) => {
  return <Card>
      
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="store-name" className="font-medium">اسم المتجر</Label>
            <Input id="store-name" placeholder="أدخل اسم المتجر" value={storeInfo.name} onChange={handleInputChange} className="transition-all focus:border-oksale-500" />
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
              <Input id="store-handle" placeholder="yourstore" value={storeInfo.handle.replace('@', '')} disabled={true} dir="ltr" className="rounded-r-none bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <Info className="h-3 w-3 ml-1 text-oksale-600" />
              معرف المتجر لا يمكن تغييره بعد الإنشاء
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="store-description" className="font-medium">وصف المتجر</Label>
          <Textarea id="store-description" placeholder="أدخل وصفاً لمتجرك" rows={4} value={storeInfo.description} onChange={handleInputChange} className="transition-all focus:border-oksale-500" />
          <p className="text-xs text-gray-500">يظهر في صفحة المتجر ويساعد في تحسين ظهور متجرك في محركات البحث</p>
        </div>
      </CardContent>
    </Card>;
};
export default StoreInformationSection;