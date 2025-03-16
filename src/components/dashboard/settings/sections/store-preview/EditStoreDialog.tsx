
import React from 'react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Info, ShoppingBag } from 'lucide-react';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';

interface EditStoreDialogProps {
  storeInfo: {
    name: string;
    logo_url: string;
    cover_url: string;
  };
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  coverUploading: boolean;
  logoUploading: boolean;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveAndClose: () => void;
}

const EditStoreDialog: React.FC<EditStoreDialogProps> = ({
  storeInfo,
  coverInputRef,
  logoInputRef,
  coverUploading,
  logoUploading,
  handleInputChange,
  handleSaveAndClose
}) => {
  const hasCover = !!storeInfo.cover_url;

  return (
    <DialogContent className="max-w-xl overflow-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">تعديل معلومات المتجر</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          قم بتحديث معلومات المتجر وصوره هنا
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-3">
        <div className="space-y-2">
          <Label htmlFor="store-name">اسم المتجر</Label>
          <Input 
            id="store-name" 
            value={storeInfo.name} 
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
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
        
        <div className="space-y-2">
          <Label>صورة الغلاف</Label>
          <div className="flex flex-col gap-3">
            <div className="w-full h-36 rounded-lg overflow-hidden">
              <img 
                src={hasCover ? storeInfo.cover_url : DEFAULT_COVER_IMAGE} 
                alt={`${storeInfo.name} cover`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-200">
              <Info className="h-4 w-4 ml-2 flex-shrink-0" />
              <span>هذه الصورة ستظهر لجميع زوار متجرك في أعلى الصفحة الرئيسية</span>
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
        <Button type="button" onClick={handleSaveAndClose}>
          حفظ التغييرات
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditStoreDialog;
