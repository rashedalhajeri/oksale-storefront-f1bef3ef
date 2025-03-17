
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  X,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[] | string;
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  showControls?: boolean;
  fallbackText?: string;
}

const ProductImageGallery = ({
  images,
  alt = "صورة المنتج",
  className,
  aspectRatio = "square",
  showControls = true,
  fallbackText = "لا توجد صورة"
}: ProductImageGalleryProps) => {
  // تحويل الصورة الواحدة إلى مصفوفة إذا لزم الأمر
  const imageArray = Array.isArray(images) ? images : (images ? [images] : []);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // التنقل بين الصور
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? imageArray.length - 1 : prev - 1));
    setIsLoaded(false);
  };
  
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === imageArray.length - 1 ? 0 : prev + 1));
    setIsLoaded(false);
  };
  
  // تحديد نسبة العرض إلى الارتفاع
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      case "square":
      default:
        return "aspect-square";
    }
  };

  // في حالة عدم وجود صور
  if (imageArray.length === 0) {
    return (
      <div 
        className={cn(
          "relative rounded-md overflow-hidden flex items-center justify-center bg-neutral-100",
          getAspectRatioClass(),
          className
        )}
      >
        <div className="text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-neutral-300" />
          <p className="mt-2 text-neutral-500 text-sm">{fallbackText}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("relative", className)}>
        <div 
          className={cn(
            "rounded-md overflow-hidden bg-neutral-100",
            getAspectRatioClass()
          )}
        >
          <img
            src={imageArray[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            onClick={() => setIsModalOpen(true)}
          />
          
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
            </div>
          )}
          
          {showControls && imageArray.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                onClick={() => setIsModalOpen(true)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </>
          )}
          
          {/* المؤشرات للصور المتعددة */}
          {imageArray.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {imageArray.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentIndex 
                      ? "bg-white w-4" 
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* الصور المصغرة */}
        {imageArray.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto py-1">
            {imageArray.map((img, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-16 h-16 rounded overflow-hidden cursor-pointer transition-all",
                  idx === currentIndex 
                    ? "ring-2 ring-neutral-800 ring-offset-1" 
                    : "ring-1 ring-neutral-200"
                )}
                onClick={() => setCurrentIndex(idx)}
              >
                <img 
                  src={img} 
                  alt={`${alt} - thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* المعرض المكبر */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] p-4">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/20 hover:bg-white/40"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="relative w-full h-full">
              <img
                src={imageArray[currentIndex]}
                alt={`${alt} - expanded ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] mx-auto object-contain"
              />
              
              {imageArray.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            
            {/* المؤشر */}
            {imageArray.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-white/80">
                {currentIndex + 1} / {imageArray.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
