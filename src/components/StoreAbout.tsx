
import React from 'react';
import { User, Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreAboutProps {
  store: {
    description: string;
    socialLinks: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

const StoreAbout = ({ store }: StoreAboutProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-neutral-800">About</h2>
      
      <p className="text-neutral-600 mb-6 leading-relaxed">{store.description}</p>
      
      <div className="flex flex-wrap gap-3">
        {store.socialLinks.instagram && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            onClick={() => window.open(store.socialLinks.instagram, '_blank')}
          >
            <Instagram className="w-4 h-4 mr-2 text-pink-500" />
            Instagram
          </Button>
        )}
        
        {store.socialLinks.twitter && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            onClick={() => window.open(store.socialLinks.twitter, '_blank')}
          >
            <Twitter className="w-4 h-4 mr-2 text-blue-400" />
            Twitter
          </Button>
        )}
        
        {store.socialLinks.facebook && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            onClick={() => window.open(store.socialLinks.facebook, '_blank')}
          >
            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
            Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default StoreAbout;
