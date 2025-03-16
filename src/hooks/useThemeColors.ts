
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useThemeColors = (storeId?: string) => {
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>("#4B5563");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // فرضاً سنستخدم جدول theme_settings للإعدادات
  // ولكن هذا فقط مثال، يمكنك إضافة هذه الأعمدة إلى جدول stores
  
  useEffect(() => {
    const fetchThemeSettings = async () => {
      if (!storeId) return;
      
      setIsLoading(true);
      try {
        // هنا يمكنك استخدام الجدول الفعلي الذي يحتوي على هذه الإعدادات
        // في الحالة الحالية نفترض أن الإعدادات محفوظة في stores
        const { data, error } = await supabase
          .from('stores')
          .select('use_custom_colors, custom_color')
          .eq('id', storeId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setUseCustomColors(data.use_custom_colors || false);
          setCustomColor(data.custom_color || "#4B5563");
        }
      } catch (error) {
        console.error('Error fetching theme settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchThemeSettings();
  }, [storeId]);
  
  const updateThemeColors = async (useCustom: boolean, color: string) => {
    if (!storeId) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stores')
        .update({
          use_custom_colors: useCustom,
          custom_color: color
        })
        .eq('id', storeId);
        
      if (error) throw error;
      
      setUseCustomColors(useCustom);
      setCustomColor(color);
    } catch (error) {
      console.error('Error updating theme settings:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { useCustomColors, customColor, isLoading, updateThemeColors, setUseCustomColors, setCustomColor };
};
