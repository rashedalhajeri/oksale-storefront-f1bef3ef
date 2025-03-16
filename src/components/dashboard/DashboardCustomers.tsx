
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardCustomersProps {
  storeData: any;
}

const DashboardCustomers: React.FC<DashboardCustomersProps> = ({ storeData }) => {
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
  const [contextMenuCustomer, setContextMenuCustomer] = useState<number | null>(null);

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
      {/* Header section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-right">العملاء</h1>
            <p className="text-gray-500 text-sm text-right mt-1">عدد العملاء: {customers.length}</p>
          </div>
        </div>
      </div>

      {/* Filters and actions section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
          {/* Search */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="بحث..." className="pr-10" />
            </div>
          </div>

          {/* Filter dropdown */}
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger>
                <div className="flex justify-between items-center w-full">
                  <Filter size={16} className="ml-2 text-gray-400" />
                  <SelectValue placeholder="فلترة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع العملاء</SelectItem>
                <SelectItem value="active">العملاء النشطين</SelectItem>
                <SelectItem value="new">العملاء الجدد</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selection dropdown */}
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger>
                <div className="flex justify-between items-center w-full">
                  <Users size={16} className="ml-2 text-gray-400" />
                  <span className="text-gray-600">{selectedCustomers.length}</span>
                  <SelectValue placeholder="جميع العملاء" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع العملاء</SelectItem>
                <SelectItem value="selected">العملاء المحددين</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions dropdown */}
          <div className="md:col-span-1">
            <Select>
              <SelectTrigger>
                <div className="flex justify-between items-center w-full">
                  <CheckCircle size={16} className="ml-2 text-gray-400" />
                  <SelectValue placeholder="إجراءات" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="export">تصدير العملاء</SelectItem>
                <SelectItem value="delete">حذف العملاء المحددين</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Add customer button */}
        <div className="flex justify-end">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus size={16} className="ml-2" /> إضافة عميل
          </Button>
        </div>
      </div>

      {/* Customers table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b">
                  <TableHead className="py-3 px-4 text-right w-10">
                    <Checkbox 
                      checked={selectedCustomers.length === customers.length && customers.length > 0}
                      onCheckedChange={selectAllCustomers}
                    />
                  </TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right">الاسم</TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right">رقم الجوال</TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right">تاريخ التسجيل</TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right">عدد الطلبات</TableHead>
                  <TableHead className="py-3 px-4 font-medium text-gray-500 text-right w-16">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <ContextMenu key={customer.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow className="border-b hover:bg-gray-50">
                        <TableCell className="py-3 px-4 w-10">
                          <Checkbox 
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={() => toggleCustomerSelection(customer.id)}
                          />
                        </TableCell>
                        <TableCell className="py-3 px-4 font-medium">{customer.name}</TableCell>
                        <TableCell className="py-3 px-4">{customer.phone}</TableCell>
                        <TableCell className="py-3 px-4">{customer.registrationDate}</TableCell>
                        <TableCell className="py-3 px-4">{customer.email}</TableCell>
                        <TableCell className="py-3 px-4">{customer.totalOrders}</TableCell>
                        <TableCell className="py-3 px-4 w-16">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal size={18} className="text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem className="flex items-center gap-2 text-sm">
                                <Pencil size={14} className="text-gray-500" />
                                <span>عرض</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-sm">
                                <Pencil size={14} className="text-gray-500" />
                                <span>تعديل</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-sm text-red-600">
                                <Trash2 size={14} className="text-red-500" />
                                <span>حذف</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem className="flex items-center gap-2">
                        <Pencil size={14} className="text-gray-500" />
                        <span>عرض</span>
                      </ContextMenuItem>
                      <ContextMenuItem className="flex items-center gap-2">
                        <Pencil size={14} className="text-gray-500" />
                        <span>تعديل</span>
                      </ContextMenuItem>
                      <ContextMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 size={14} className="text-red-500" />
                        <span>حذف</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex justify-between items-center border-t">
            <div>
              <Select defaultValue="10">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink>السابق</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>التالي</PaginationLink>
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
