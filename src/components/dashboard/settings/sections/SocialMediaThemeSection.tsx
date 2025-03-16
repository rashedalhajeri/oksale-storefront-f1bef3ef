
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAvailablePlatforms } from '@/utils/socialMediaUtils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Save } from 'lucide-react';

interface SocialMediaThemeSectionProps {
  storeId: string;
}

const SocialMediaThemeSection: React.FC<SocialMediaThemeSectionProps> = ({ storeId }) => {
  const { toast } = useToast();
  const { 
    useCustomColors, 
    customColor, 
    isLoading, 
    updateThemeColors,
    setUseCustomColors,
    setCustomColor
  } = useThemeColors(storeId);
  
  const availablePlatforms = getAvailablePlatforms();
  
  const handleSaveChanges = async () => {
    try {
      await updateThemeColors(useCustomColors, customColor);
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات ألوان وسائل التواصل الاجتماعي بنجاح",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ الإعدادات. يرجى المحاولة مرة أخرى.",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg">ألوان وسائل التواصل الاجتماعي</CardTitle>
        <CardDescription>
          تخصيص ألوان أيقونات وسائل التواصل الاجتماعي في متجرك
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>استخدام لون موحد</Label>
            <p className="text-sm text-gray-500">
              استخدم لون واحد موحد لجميع أيقونات وسائل التواصل الاجتماعي بدلاً من ألوانها الأصلية
            </p>
          </div>
          <Switch
            checked={useCustomColors}
            onCheckedChange={(checked) => setUseCustomColors(checked)}
          />
        </div>
        
        {useCustomColors && (
          <div className="space-y-4 pt-4 border-t">
            <Label htmlFor="custom-color">اللون الموحد</Label>
            <div className="flex items-center gap-4">
              <Input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="flex-1"
                placeholder="#000000"
              />
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-3">معاينة</h3>
              <div className="flex flex-wrap gap-4">
                {availablePlatforms.map((platform) => (
                  <div key={platform.type} className="flex flex-col items-center space-y-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {React.cloneElement(platform.icon as React.ReactElement, {
                        style: { color: useCustomColors ? customColor : platform.color },
                        className: "w-5 h-5"
                      })}
                    </div>
                    <span className="text-xs">{platform.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <Button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="w-full mt-4"
        >
          <Save className="w-4 h-4 mr-2" />
          حفظ إعدادات الألوان
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialMediaThemeSection;
