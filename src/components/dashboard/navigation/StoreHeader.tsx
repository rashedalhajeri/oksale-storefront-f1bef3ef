
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StoreHeaderProps {
  storeData: any;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeData }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <Avatar className="h-10 w-10">
          {storeData?.logo_url ? (
            <AvatarImage src={storeData.logo_url} alt={storeData?.name} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white">
              {storeData?.name?.charAt(0) || 'S'}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="overflow-hidden">
          <h2 className="text-lg font-semibold truncate">{storeData?.name}</h2>
          <Link 
            to={`/store/${storeData?.handle?.replace('@', '')}`} 
            className="text-sm text-gray-500 hover:text-oksale-600 truncate block"
            target="_blank"
          >
            {storeData?.handle}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
