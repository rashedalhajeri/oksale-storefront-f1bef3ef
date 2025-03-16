
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactInformationSectionProps {
  storeInfo: {
    email: string;
    phone: string;
    address: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({
  storeInfo,
  handleInputChange
}) => {
  return (
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
  );
};

export default ContactInformationSection;
