
import React from 'react';
import { Button } from '@/components/ui/button';
import { getSocialIcon, getSocialUrl, getSocialLabel, type SocialMediaType } from '@/utils/socialMediaUtils';

interface StoreAboutProps {
  store: {
    description: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      website?: string;
      snapchat?: string;
      tiktok?: string;
      whatsapp?: string;
    };
  };
}

const StoreAbout = ({ store }: StoreAboutProps) => {
  // Ensure we have valid socialLinks object
  const socialLinks = store.socialLinks || {};
  
  // Only show section if there's a description or social links
  if (!store.description && !Object.values(socialLinks).some(Boolean)) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-neutral-800">About</h2>
      
      {store.description && (
        <p className="text-neutral-600 mb-6 leading-relaxed">{store.description}</p>
      )}
      
      {Object.entries(socialLinks).some(([_, value]) => !!value) && (
        <div className="flex flex-wrap gap-3">
          {Object.entries(socialLinks).map(([type, value]) => {
            if (!value) return null;
            
            return (
              <Button
                key={type}
                variant="outline"
                size="sm"
                className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                onClick={() => window.open(getSocialUrl(type as SocialMediaType, value), '_blank')}
              >
                <span className="mr-2">
                  {getSocialIcon(type as SocialMediaType, "w-4 h-4")}
                </span>
                {getSocialLabel(type as SocialMediaType)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoreAbout;
