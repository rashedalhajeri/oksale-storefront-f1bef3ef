
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Upload, ShoppingBag, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
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
          <ShoppingBag className="h-5 w-5 ml-2 text-oksale-600" />
          الشعار والصور
        </CardTitle>
        <CardDescription>شعار المتجر وصورة الغلاف</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-medium">تخصيص المظهر</h3>
            <p className="text-sm text-muted-foreground">
              خصص مظهر متجرك بإضافة شعار وصورة غلاف مميزة
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">تحديث الشعار والصور</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
              <DialogHeader className="contents space-y-0 text-left">
                <DialogTitle className="border-b border-border px-6 py-4 text-base">
                  تحديث الشعار والصور
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                تحديث شعار المتجر وصورة الغلاف
              </DialogDescription>
              
              <div className="overflow-y-auto">
                {/* Cover Image Section */}
                <div className="h-32">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
                    {storeInfo.cover_url && (
                      <img
                        className="h-full w-full object-cover"
                        src={storeInfo.cover_url}
                        alt="صورة غلاف المتجر"
                        width={512}
                        height={96}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                        onClick={() => coverInputRef.current?.click()}
                        aria-label={storeInfo.cover_url ? "تغيير صورة الغلاف" : "رفع صورة غلاف"}
                        disabled={coverUploading}
                      >
                        {coverUploading ? (
                          <span className="animate-spin">...</span>
                        ) : (
                          <Upload size={16} strokeWidth={2} aria-hidden="true" />
                        )}
                      </button>
                      {storeInfo.cover_url && (
                        <button
                          type="button"
                          className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                          aria-label="إزالة صورة الغلاف"
                        >
                          <X size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Logo Section */}
                <div className="-mt-10 px-6">
                  <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
                    {storeInfo.logo_url ? (
                      <img
                        src={storeInfo.logo_url}
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                        alt="شعار المتجر"
                      />
                    ) : (
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    )}
                    <button
                      type="button"
                      className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                      onClick={() => logoInputRef.current?.click()}
                      aria-label="تغيير شعار المتجر"
                      disabled={logoUploading}
                    >
                      {logoUploading ? (
                        <span className="animate-spin">...</span>
                      ) : (
                        <Upload size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="px-6 pb-6 pt-12">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name" className="font-medium">اسم المتجر</Label>
                      <Input id="store-name" readOnly value={storeInfo.name} className="bg-muted" />
                      <p className="text-xs text-gray-500">لتغيير اسم المتجر، انتقل إلى قسم "معلومات المتجر"</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-1">
                    <h4 className="text-sm font-medium">توصيات الصور</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• شعار المتجر: مربع بأبعاد 500×500 بكسل، بصيغة PNG أو JPG</li>
                      <li>• صورة الغلاف: مستطيلة بأبعاد 1200×300 بكسل، بصيغة PNG أو JPG</li>
                      <li>• حجم الملف: أقل من 2 ميجابايت لكل صورة</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="border-t border-border px-6 py-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">إغلاق</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/40">
            <div className="size-10 flex-shrink-0 rounded-md border border-border overflow-hidden flex items-center justify-center bg-background">
              {storeInfo.logo_url ? (
                <img 
                  src={storeInfo.logo_url} 
                  alt="شعار المتجر" 
                  className="h-full w-full object-contain"
                />
              ) : (
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <h4 className="font-medium">شعار المتجر</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {storeInfo.logo_url ? "تم رفع شعار المتجر" : "لم يتم رفع شعار للمتجر"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/40">
            <div className="size-10 flex-shrink-0 rounded-md border border-border overflow-hidden flex items-center justify-center bg-background">
              {storeInfo.cover_url ? (
                <img 
                  src={storeInfo.cover_url} 
                  alt="صورة غلاف المتجر" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <h4 className="font-medium">صورة الغلاف</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {storeInfo.cover_url ? "تم رفع صورة غلاف المتجر" : "لم يتم رفع صورة غلاف للمتجر"}
              </p>
            </div>
          </div>
        </div>
        
        <input
          type="file"
          ref={logoInputRef}
          className="hidden"
          accept="image/*"
          aria-label="رفع شعار المتجر"
        />
        
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          accept="image/*"
          aria-label="رفع صورة غلاف المتجر"
        />
      </CardContent>
    </Card>
  );
};

export default LogoBrandingSection;
