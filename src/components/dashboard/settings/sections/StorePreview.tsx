
import React, { useRef } from 'react';
import { ShoppingBag, Upload, Instagram, Twitter, Facebook, CheckCircle, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StorePreviewProps {
  storeInfo: {
    name: string;
    handle: string;
    logo_url: string;
    cover_url: string;
    instagram: string;
    twitter: string;
    facebook: string;
  };
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  coverUploading: boolean;
  logoUploading: boolean;
  featured?: boolean;
  handleLogoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StorePreview: React.FC<StorePreviewProps> = ({
  storeInfo,
  coverInputRef,
  logoInputRef,
  coverUploading,
  logoUploading,
  featured,
  handleLogoUpload,
  handleCoverUpload,
  handleInputChange
}) => {
  const displayHandle = storeInfo.handle.startsWith('@') 
    ? storeInfo.handle
    : `@${storeInfo.handle}`;

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Cover image container with fixed height */}
        <div className="h-[30vh] overflow-hidden">
          {storeInfo.cover_url ? (
            <img 
              src={storeInfo.cover_url} 
              alt={`${storeInfo.name} cover`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-t from-[#8E9196] to-[#F6F6F7]"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Edit button in the top right corner */}
        <div className="absolute top-3 right-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm"
                className="text-xs font-medium"
              >
                <Edit className="h-3 w-3 mr-1" />
                تعديل
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">تعديل معلومات المتجر</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-3">
                {/* Store name input */}
                <div className="space-y-2">
                  <Label htmlFor="store-name">اسم المتجر</Label>
                  <Input 
                    id="store-name" 
                    value={storeInfo.name} 
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                {/* Logo upload */}
                <div className="space-y-2">
                  <Label>شعار المتجر</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                      {storeInfo.logo_url ? (
                        <img 
                          src={storeInfo.logo_url} 
                          alt={`${storeInfo.name} logo`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => logoInputRef.current?.click()}
                      disabled={logoUploading}
                    >
                      {logoUploading ? 'جارِ الرفع...' : 'تغيير الشعار'}
                      <Upload className="mr-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Cover upload */}
                <div className="space-y-2">
                  <Label>صورة الغلاف</Label>
                  <div className="flex flex-col gap-3">
                    <div className="w-full h-36 rounded-lg overflow-hidden">
                      {storeInfo.cover_url ? (
                        <img 
                          src={storeInfo.cover_url} 
                          alt={`${storeInfo.name} cover`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-t from-[#8E9196] to-[#F6F6F7]"></div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => coverInputRef.current?.click()}
                      disabled={coverUploading}
                    >
                      {coverUploading ? 'جارِ الرفع...' : 'تغيير الغلاف'}
                      <Upload className="mr-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button">
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <input
            type="file"
            id="cover-upload"
            ref={coverInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleCoverUpload}
          />
          <input
            type="file"
            id="logo-upload"
            ref={logoInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
        
        {/* Store info container with improved positioning */}
        <div className="absolute bottom-0 left-0 right-0 pb-5 flex items-end text-white">
          <div className="w-full px-3 md:px-6">
            <div className="flex items-center justify-between">
              {/* Store logo and info */}
              <div className="flex items-center gap-3 md:gap-6">
                {/* Logo with consistent size */}
                <div className="relative w-14 h-14 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 md:border-3 border-white shadow-lg bg-white flex-shrink-0">
                  {storeInfo.logo_url ? (
                    <img 
                      src={storeInfo.logo_url} 
                      alt={`${storeInfo.name} logo`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-neutral-500" />
                    </div>
                  )}
                </div>
                
                {/* Store details with consistent text sizes */}
                <div>
                  <div className="flex items-center gap-1 md:gap-1.5 mb-0.5 md:mb-1">
                    <h1 className="text-lg md:text-2xl font-bold truncate">{storeInfo.name || 'اسم المتجر'}</h1>
                    {featured && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center p-0.5 md:p-1 rounded-full border border-blue-400 h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0">
                        <CheckCircle className="w-2 h-2 md:w-3 md:h-3" />
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-white text-xs md:text-sm">
                    <span className="truncate">{displayHandle}</span>
                  </div>
                  
                  {/* Social links - only show if they exist */}
                  {(storeInfo.instagram || storeInfo.twitter || storeInfo.facebook) && (
                    <div className="flex items-center gap-3 md:gap-4 mt-2">
                      {storeInfo.instagram && (
                        <a 
                          href={storeInfo.instagram.startsWith('http') ? storeInfo.instagram : `https://instagram.com/${storeInfo.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-blue-200 transition-colors"
                        >
                          <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                      {storeInfo.twitter && (
                        <a 
                          href={storeInfo.twitter.startsWith('http') ? storeInfo.twitter : `https://twitter.com/${storeInfo.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-blue-200 transition-colors"
                        >
                          <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                      {storeInfo.facebook && (
                        <a 
                          href={storeInfo.facebook.startsWith('http') ? storeInfo.facebook : `https://facebook.com/${storeInfo.facebook}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-blue-200 transition-colors"
                        >
                          <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StorePreview;
