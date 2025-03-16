
import React from 'react';
import { Edit } from 'lucide-react';
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
    <div className="absolute top-3 right-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs font-medium"
          >
            <Edit className="h-3 w-3 ml-1" />
            تعديل
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default PreviewHeader;
