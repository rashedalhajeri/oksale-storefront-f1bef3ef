
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlobeIcon } from 'lucide-react';

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
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center">
          <GlobeIcon className="h-5 w-5 mr-2" />
          Regional Settings
        </CardTitle>
        <CardDescription>Language, currency and country settings</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="store-language" className="font-medium">Primary Language</Label>
            <Select 
              value={storeInfo.language}
              onValueChange={(value) => handleSelectChange(value, 'language')}
            >
              <SelectTrigger id="store-language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-currency" className="font-medium">Currency</Label>
            <Select 
              value={storeInfo.currency}
              onValueChange={(value) => handleSelectChange(value, 'currency')}
            >
              <SelectTrigger id="store-currency" className="w-full">
                <SelectValue placeholder="Select currency" />
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
            <Label htmlFor="store-country" className="font-medium">Country</Label>
            <Select 
              value={storeInfo.country}
              onValueChange={(value) => handleSelectChange(value, 'country')}
            >
              <SelectTrigger id="store-country" className="w-full">
                <SelectValue placeholder="Select country" />
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
