
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardCustomersProps {
  storeData: any;
}

const DashboardCustomers: React.FC<DashboardCustomersProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  
  // Mock customers data
  const customers = [
    { 
      id: 1, 
      name: 'راشد الراجحي', 
      email: 'rhajri965@gmail.com', 
      phone: '96566605014', 
      registrationDate: 'منذ ثانية',
      totalOrders: 0, 
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      email: 'fatima@example.com', 
      phone: '96650765432', 
      registrationDate: 'منذ دقيقة',
      totalOrders: 3, 
    },
    { 
      id: 3, 
      name: 'محمد عبدالله', 
      email: 'mohammed@example.com', 
      phone: '96654987654', 
      registrationDate: 'منذ ساعة',
      totalOrders: 7, 
    },
    { 
      id: 4, 
      name: 'نورة سالم', 
      email: 'noura@example.com', 
      phone: '96656456789', 
      registrationDate: 'منذ يوم',
      totalOrders: 2, 
    },
  ];

  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const toggleCustomerSelection = (customerId: number) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const selectAllCustomers = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(customer => customer.id));
    }
  };

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {/* Header section - Improved header with customer count on the opposite side */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">العملاء</h1>
          <div className="text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
            عدد العملاء: {customers.length}
          </div>
        </div>
      </div>

      {/* Search and filters section - Improved layout */}
      <div className="space-y-3">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
          {/* Search with consistent styling */}
          <div className={`relative ${isMobile ? 'w-full' : 'w-2/3'}`}>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="بحث عن عميل..." className="pr-10 bg-white border-gray-200" />
          </div>

          <div className={`flex gap-2 ${isMobile ? 'w-full' : 'w-1/3'}`}>
            {/* Filter dropdown */}
            <Select>
              <SelectTrigger className="bg-white border-gray-200">
                <div className="flex items-center gap-1">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-sm">فلترة</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع العملاء</SelectItem>
                <SelectItem value="active">العملاء النشطين</SelectItem>
                <SelectItem value="new">العملاء الجدد</SelectItem>
              </SelectContent>
            </Select>

            {/* Add customer button - Compact design */}
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="sm">
              <Plus size={16} />
              <span className={`${isMobile ? 'hidden' : 'inline'}`}>إضافة عميل</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Customers table with improved mobile styling */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-0">
          {isMobile ? (
            // Mobile view - Clean and compact
            <div className="overflow-hidden">
              {customers.map((customer) => (
                <div 
                  key={customer.id} 
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal size={18} className="text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
                          <Pencil size={14} className="text-gray-500" />
                          <span>عرض</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
                          <Pencil size={14} className="text-gray-500" />
                          <span>تعديل</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-sm text-red-600 cursor-pointer">
                          <Trash2 size={14} className="text-red-500" />
                          <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop view - Full table with scroll area
            <ScrollArea className="w-full">
              <div className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-10 text-right py-3 font-semibold text-gray-600">
                        <Checkbox 
                          checked={selectedCustomers.length === customers.length && customers.length > 0}
                          onCheckedChange={selectAllCustomers}
                        />
                      </TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[140px]">الاسم</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[120px]">رقم الجوال</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[100px]">تاريخ التسجيل</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[180px]">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[100px]">الطلبات</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 w-16">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id} className="border-b hover:bg-gray-50">
                        <TableCell className="w-10 py-3 px-4">
                          <Checkbox 
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={() => toggleCustomerSelection(customer.id)}
                          />
                        </TableCell>
                        <TableCell className="py-3 px-4 font-medium text-gray-900">{customer.name}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.phone}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.registrationDate}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.email}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.totalOrders}</TableCell>
                        <TableCell className="py-3 px-4 w-16">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal size={18} className="text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
                                <Pencil size={14} className="text-gray-500" />
                                <span>عرض</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
                                <Pencil size={14} className="text-gray-500" />
                                <span>تعديل</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-sm text-red-600 cursor-pointer">
                                <Trash2 size={14} className="text-red-500" />
                                <span>حذف</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          )}

          {/* Pagination with better alignment */}
          <div className="p-4 flex justify-center border-t border-gray-100">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink className="text-sm">السابق</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive className="text-sm">1</PaginationLink>
                </PaginationItem>
                {!isMobile && (
                  <>
                    <PaginationItem>
                      <PaginationLink className="text-sm">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="text-sm">3</PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationLink className="text-sm">التالي</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCustomers;
