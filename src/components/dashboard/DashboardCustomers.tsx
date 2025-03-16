
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Filter, Plus, MoreHorizontal, CheckCircle, Pencil, Trash2 } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Header section - Improved styling */}
      <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="w-full text-right">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">العملاء</h1>
            <p className="text-gray-500 text-sm">عدد العملاء: {customers.length}</p>
          </div>
        </div>
      </div>

      {/* Search and filters section - Improved layout for mobile */}
      <div className="space-y-3">
        {/* Search with consistent styling */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="بحث عن عميل..." className="pr-10 bg-white border-gray-200" />
        </div>

        {/* Filter controls with better spacing */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3'}`}>
          {/* Filter dropdown */}
          <Select>
            <SelectTrigger className="bg-white border-gray-200">
              <div className="flex items-center w-full">
                <Filter size={16} className="ml-2 text-gray-500" />
                <SelectValue placeholder="تصفية العملاء" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع العملاء</SelectItem>
              <SelectItem value="active">العملاء النشطين</SelectItem>
              <SelectItem value="new">العملاء الجدد</SelectItem>
            </SelectContent>
          </Select>

          {/* Add customer button */}
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
            <Plus size={16} className="ml-1.5" /> إضافة عميل
          </Button>
        </div>
      </div>

      {/* Customers table with improved styling */}
      <Card className="shadow-sm border border-gray-100 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {!isMobile && (
                    <TableHead className="w-10 text-right py-3 font-semibold text-gray-600">
                      <Checkbox 
                        checked={selectedCustomers.length === customers.length && customers.length > 0}
                        onCheckedChange={selectAllCustomers}
                      />
                    </TableHead>
                  )}
                  <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[140px]">الاسم</TableHead>
                  <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[120px]">رقم الجوال</TableHead>
                  {!isMobile && (
                    <>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[100px]">تاريخ التسجيل</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[180px]">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[100px]">الطلبات</TableHead>
                    </>
                  )}
                  <TableHead className="text-right py-3 font-semibold text-gray-600 w-16">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="border-b hover:bg-gray-50">
                    {!isMobile && (
                      <TableCell className="w-10 py-3 px-4">
                        <Checkbox 
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => toggleCustomerSelection(customer.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell className="py-3 px-4 font-medium text-gray-900">{customer.name}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.phone}</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.registrationDate}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.email}</TableCell>
                        <TableCell className="py-3 px-4 text-gray-700 text-sm">{customer.totalOrders}</TableCell>
                      </>
                    )}
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
