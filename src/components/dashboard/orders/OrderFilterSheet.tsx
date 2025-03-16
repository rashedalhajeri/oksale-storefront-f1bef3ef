
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFilterSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tabValue: string;
  setTabValue: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const OrderFilterSheet: React.FC<OrderFilterSheetProps> = ({
  isOpen,
  setIsOpen,
  tabValue,
  setTabValue,
  sortOption,
  setSortOption,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 w-1/2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>تصفية</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader className="mb-4">
          <SheetTitle>تصفية الطلبات</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">حالة الطلب</label>
            <div className="grid grid-cols-2 gap-2">
              {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                <Button 
                  key={status}
                  variant={tabValue === status ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => {
                    setTabValue(status);
                    setIsOpen(false);
                  }}
                  className="justify-start text-xs"
                >
                  {status === 'all' && 'الكل'}
                  {status === 'pending' && 'قيد الانتظار'}
                  {status === 'processing' && 'قيد التجهيز'}
                  {status === 'completed' && 'مكتمل'}
                  {status === 'cancelled' && 'ملغي'}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">ترتيب حسب</label>
            <Select 
              defaultValue={sortOption} 
              onValueChange={(value) => setSortOption(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="oldest">الأقدم</SelectItem>
                <SelectItem value="highest">الأعلى قيمة</SelectItem>
                <SelectItem value="lowest">الأقل قيمة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="text-sm font-medium mb-1 block">بحث</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن طلب..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <SheetFooter className="mt-6 flex-row space-x-2 justify-end">
            <SheetClose asChild>
              <Button type="button" variant="outline" size="sm">
                إغلاق
              </Button>
            </SheetClose>
            <Button 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setTabValue('all');
                setSortOption('newest');
                setIsOpen(false);
              }}
            >
              إعادة تعيين
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderFilterSheet;
