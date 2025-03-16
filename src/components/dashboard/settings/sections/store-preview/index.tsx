
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import CoverImage from './CoverImage';
import StoreInfo from './StoreInfo';
import PreviewHeader from './PreviewHeader';
import EditStoreDialog from './EditStoreDialog';
import InputFields from './InputFields';

interface StorePreviewProps {
  storeInfo: {
    name: string;
    handle: string;
    logo_url: string;
    cover_url: string;
    instagram: string;
    twitter: string;
    facebook: string;
    website: string;
    address: string;
    snapchat?: string;
    tiktok?: string;
    whatsapp?: string;
    useCustomColors?: boolean;
    customColor?: string;
  };
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  coverUploading: boolean;
  logoUploading: boolean;
  featured?: boolean;
  handleLogoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveModal?: () => void;
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
  handleInputChange,
  handleSaveModal
}) => {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSaveAndClose = () => {
    if (handleSaveModal) {
      handleSaveModal();
    }
    setOpen(false);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <CoverImage 
          coverUrl={storeInfo.cover_url}
          coverLoaded={coverLoaded}
          setCoverLoaded={setCoverLoaded}
          storeName={storeInfo.name}
        />
        
        <PreviewHeader 
          open={open}
          setOpen={setOpen}
        />
        
        <StoreInfo 
          storeInfo={storeInfo}
          logoLoaded={logoLoaded}
          setLogoLoaded={setLogoLoaded}
        />
        
        <EditStoreDialog 
          storeInfo={storeInfo}
          coverInputRef={coverInputRef}
          logoInputRef={logoInputRef}
          coverUploading={coverUploading}
          logoUploading={logoUploading}
          handleInputChange={handleInputChange}
          handleSaveAndClose={handleSaveAndClose}
        />
        
        <InputFields 
          coverInputRef={coverInputRef}
          logoInputRef={logoInputRef}
          handleCoverUpload={handleCoverUpload}
          handleLogoUpload={handleLogoUpload}
        />
      </div>
    </Card>
  );
};

export default StorePreview;
