
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useThemeColors = (storeId?: string) => {
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>("#4B5CF6"); // تغيير اللون الافتراضي إلى أزرق أكثر حيوية
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchThemeSettings = async () => {
      if (!storeId) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('stores')
          .select('use_custom_colors, custom_color')
          .eq('id', storeId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setUseCustomColors(data.use_custom_colors || false);
          setCustomColor(data.custom_color || "#4B5CF6");
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
      
      // تطبيق التغييرات على CSS المتغيرات
      document.documentElement.style.setProperty('--custom-primary', color);
      document.documentElement.style.setProperty('--custom-primary-hover', adjustColorBrightness(color, -15));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating theme settings:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // مساعدة لتعديل سطوع اللون
  const adjustColorBrightness = (hex: string, percent: number) => {
    // تحويل الـ hex إلى rgb
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // تعديل القيم بنسبة مئوية
    r = Math.min(255, Math.max(0, r + (percent / 100) * 255));
    g = Math.min(255, Math.max(0, g + (percent / 100) * 255));
    b = Math.min(255, Math.max(0, b + (percent / 100) * 255));

    // تحويل قيم RGB إلى سداسي عشري
    const rHex = Math.round(r).toString(16).padStart(2, '0');
    const gHex = Math.round(g).toString(16).padStart(2, '0');
    const bHex = Math.round(b).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };
  
  return { 
    useCustomColors, 
    customColor, 
    isLoading, 
    updateThemeColors, 
    setUseCustomColors, 
    setCustomColor 
  };
};
