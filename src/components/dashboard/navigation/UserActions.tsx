
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

const UserActions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "نراك قريباً!",
      });
      
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "فشل تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  return (
    <div className="p-3">
      <Button 
        variant="ghost" 
        className="w-full justify-start text-white/70 hover:text-white hover:bg-[#1A2747]/50"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4 ml-2" />
        تسجيل الخروج
      </Button>
    </div>
  );
};

export default UserActions;
