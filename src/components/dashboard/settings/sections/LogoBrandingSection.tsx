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
  return <Card>
      
      
    </Card>;
};
export default LogoBrandingSection;