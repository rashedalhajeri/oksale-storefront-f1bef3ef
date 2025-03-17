
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlobeIcon } from 'lucide-react';
import { getCurrencySymbol } from '@/utils/dashboard/currencyUtils';

interface RegionalSettingsSectionProps {
  storeInfo: {
    language: string;
    currency: string;
    country: string;
  };
  handleSelectChange: (value: string, key: string) => void;
  currencies: Array<{ value: string; label: string }>;
  countries: Array<{ value: string; label: string }>;
}

const RegionalSettingsSection: React.FC<RegionalSettingsSectionProps> = ({
  storeInfo,
  handleSelectChange,
  currencies,
  countries
}) => {
  return (
    <Card className="overflow-hidden glow-card hover:shadow-lg transition-all duration-300">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-lg flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full mr-2">
            <GlobeIcon className="h-5 w-5" />
          </div>
          إعدادات المنطقة واللغة
        </CardTitle>
        <CardDescription>إعدادات اللغة والعملة والدولة</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="store-language" className="font-medium">اللغة الرئيسية</Label>
            <Select 
              value={storeInfo.language}
              onValueChange={(value) => handleSelectChange(value, 'language')}
            >
              <SelectTrigger 
                id="store-language" 
                className="w-full focus-ring transition-all duration-300"
              >
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
              <SelectTrigger 
                id="store-currency" 
                className="w-full focus-ring transition-all duration-300"
              >
                <SelectValue placeholder="اختر العملة" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value} className="flex items-center">
                    <span className="mr-1">{currency.label}</span>
                    <span className="rtl-number text-xs text-gray-500">({getCurrencySymbol(currency.value)})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              تؤثر العملة على طريقة عرض الأسعار والمبالغ في متجرك وتقاريره
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-country" className="font-medium">الدولة</Label>
            <Select 
              value={storeInfo.country}
              onValueChange={(value) => handleSelectChange(value, 'country')}
            >
              <SelectTrigger 
                id="store-country" 
                className="w-full focus-ring transition-all duration-300"
              >
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
  );
};

export default RegionalSettingsSection;
