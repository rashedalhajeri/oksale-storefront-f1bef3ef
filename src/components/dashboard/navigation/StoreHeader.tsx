
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Store, ExternalLink } from 'lucide-react';

interface StoreHeaderProps {
  storeData: any;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeData }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <Avatar className="h-10 w-10 border border-gray-200">
          {storeData?.logo_url ? (
            <AvatarImage src={storeData.logo_url} alt={storeData?.name || 'متجر'} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white">
              {storeData?.name?.charAt(0) || 'S'}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="overflow-hidden">
          <h2 className="text-lg font-semibold truncate">{storeData?.name || 'متجر جديد'}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <a 
              href={`/${storeData?.handle}`}
              className="flex items-center gap-1 hover:text-oksale-600 truncate transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Store className="h-3.5 w-3.5" />
              <span className="truncate">{storeData?.handle || '@store'}</span>
              <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
