
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactInformationSectionProps {
  storeInfo: {
    email: string;
    phone: string;
    address: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveModal?: () => void;
}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({
  storeInfo,
  handleInputChange,
  handleSaveModal
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center">
          <Phone className="h-5 w-5 ml-2 text-oksale-600" />
          معلومات الاتصال
        </CardTitle>
        <CardDescription>بيانات التواصل المتجر (البريد الإلكتروني، رقم الهاتف، العنوان)</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-medium">بيانات الاتصال</h3>
            <p className="text-sm text-muted-foreground">
              تظهر هذه المعلومات للعملاء على صفحة المتجر
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">تعديل بيانات الاتصال</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
              <DialogHeader className="contents space-y-0 text-left">
                <DialogTitle className="border-b border-border px-6 py-4 text-base">
                  تعديل بيانات الاتصال
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                تعديل بيانات الاتصال الخاصة بمتجرك
              </DialogDescription>
              
              <div className="overflow-y-auto px-6 py-4">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-email" className="font-medium">البريد الإلكتروني</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input 
                        id="store-email" 
                        name="email"
                        placeholder="your@email.com" 
                        value={storeInfo.email}
                        onChange={handleInputChange}
                        dir="ltr"
                        className="rounded-r-none transition-all focus:border-oksale-500" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني الذي سيتم عرضه للعملاء</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-phone" className="font-medium">رقم الهاتف</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input 
                        id="store-phone" 
                        name="phone"
                        placeholder="+966500000000" 
                        value={storeInfo.phone}
                        onChange={handleInputChange}
                        dir="ltr"
                        className="rounded-r-none transition-all focus:border-oksale-500" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">رقم الهاتف الذي سيتم عرضه للعملاء</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-address" className="font-medium">العنوان</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input 
                        id="store-address" 
                        name="address"
                        placeholder="عنوان المتجر" 
                        value={storeInfo.address}
                        onChange={handleInputChange}
                        className="rounded-r-none transition-all focus:border-oksale-500" 
                      />
                    </div>
                    <p className="text-xs text-gray-500">العنوان الفعلي للمتجر إن وجد</p>
                  </div>
                </form>
              </div>
              
              <DialogFooter className="border-t border-border px-6 py-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">إلغاء</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" onClick={handleSaveModal}>حفظ التغييرات</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/40">
            <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h4 className="font-medium">البريد الإلكتروني</h4>
              <p className="text-sm text-muted-foreground mt-1" dir="ltr">{storeInfo.email || "لم يتم تحديد بريد إلكتروني"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/40">
            <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h4 className="font-medium">رقم الهاتف</h4>
              <p className="text-sm text-muted-foreground mt-1" dir="ltr">{storeInfo.phone || "لم يتم تحديد رقم هاتف"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/40">
            <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h4 className="font-medium">العنوان</h4>
              <p className="text-sm text-muted-foreground mt-1">{storeInfo.address || "لم يتم تحديد عنوان"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformationSection;
