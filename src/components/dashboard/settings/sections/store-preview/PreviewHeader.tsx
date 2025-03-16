
import React from 'react';
import { Eye, Edit, PenSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";

interface PreviewHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ open, setOpen }) => {
  return (
    <div className="absolute top-3 right-3 z-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs font-medium flex items-center gap-1.5 shadow-md"
          >
            {open ? <PenSquare className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {open ? 'تعديل' : 'معاينة'}
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default PreviewHeader;
