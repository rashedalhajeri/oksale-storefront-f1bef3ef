
import React, { useRef } from 'react';
import { ShoppingBag, Upload, Share2, Instagram, Twitter, Facebook, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
}

const StorePreview: React.FC<StorePreviewProps> = ({
  storeInfo,
  coverInputRef,
  logoInputRef,
  coverUploading,
  logoUploading,
  featured,
  handleLogoUpload,
  handleCoverUpload
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
            <div className="w-full h-full bg-gradient-to-t from-oksale-600 to-oksale-800"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Button to change cover */}
        <div className="absolute bottom-0 right-0 p-2">
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
          >
            <Upload className="h-3 w-3 ml-1" />
            {coverUploading ? 'جارِ الرفع...' : 'تغيير الغلاف'}
          </Button>
          <input
            type="file"
            id="cover-upload"
            ref={coverInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleCoverUpload}
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
                  <button 
                    className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={logoUploading}
                  >
                    {logoUploading ? (
                      <span className="animate-spin block w-3 h-3 border-2 border-oksale-600 border-t-transparent rounded-full"/>
                    ) : (
                      <Upload className="h-3 w-3" />
                    )}
                  </button>
                  <input
                    type="file"
                    id="logo-upload"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
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
                  
                  {/* Social links with consistent spacing */}
                  <div className="flex items-center gap-3 md:gap-4 mt-2">
                    {storeInfo.instagram && (
                      <a 
                        href={`https://instagram.com/${storeInfo.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {storeInfo.twitter && (
                      <a 
                        href={`https://twitter.com/${storeInfo.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {storeInfo.facebook && (
                      <a 
                        href={`https://facebook.com/${storeInfo.facebook}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Share button only on desktop */}
              <div className="hidden md:flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 text-xs py-1 px-3 h-8"
                >
                  <Share2 className="w-3 h-3 mr-1.5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StorePreview;
