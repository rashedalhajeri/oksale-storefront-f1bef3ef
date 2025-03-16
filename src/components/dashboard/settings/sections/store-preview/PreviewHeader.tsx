
import React from 'react';
import { PenSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";

interface PreviewHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ open, setOpen, children }) => {
  return (
    <div className="absolute top-3 left-3 z-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs font-medium flex items-center gap-1.5 shadow-md bg-white/80 hover:bg-white backdrop-blur-sm transition-all"
          >
            <PenSquare className="h-3 w-3" />
            تعديل
          </Button>
        </DialogTrigger>
        {children}
      </Dialog>
    </div>
  );
};

export default PreviewHeader;
