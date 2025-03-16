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
  return <Card>
      
      
    </Card>;
};
export default ContactInformationSection;