
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardCustomersProps {
  storeData: any;
}

// Extended customer type with address
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalOrders: number;
  // New fields
  address?: string;
  orders?: CustomerOrder[];
}

// Order type for customer orders
interface CustomerOrder {
  id: number;
  date: string;
  status: string;
  total: number;
  items: number;
}

const DashboardCustomers: React.FC<DashboardCustomersProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  
  // Mock customers data with extended information
  const customers: Customer[] = [
    { 
      id: 1, 
      name: 'راشد الراجحي', 
      email: 'rhajri965@gmail.com', 
      phone: '96566605014', 
      registrationDate: 'منذ ثانية',
      totalOrders: 0, 
      address: 'الكويت، حولي، شارع المثنى، بناية 24، شقة 7',
      orders: [],
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      email: 'fatima@example.com', 
      phone: '96650765432', 
      registrationDate: 'منذ دقيقة',
      totalOrders: 3, 
      address: 'المملكة العربية السعودية، الرياض، حي النخيل، طريق الملك فهد',
      orders: [
        { id: 101, date: '15 مايو، 2023', status: 'مكتمل', total: 350, items: 2 },
        { id: 102, date: '20 يونيو، 2023', status: 'مكتمل', total: 520, items: 3 },
        { id: 103, date: '5 يوليو، 2023', status: 'ملغي', total: 120, items: 1 },
      ]
    },
    { 
      id: 3, 
      name: 'محمد عبدالله', 
      email: 'mohammed@example.com', 
      phone: '96654987654', 
      registrationDate: 'منذ ساعة',
      totalOrders: 7, 
      address: 'الإمارات العربية المتحدة، دبي، شارع الشيخ زايد، برج الخالدية',
      orders: [
        { id: 201, date: '10 أبريل، 2023', status: 'مكتمل', total: 750, items: 4 },
        { id: 202, date: '25 أبريل، 2023', status: 'مكتمل', total: 1200, items: 6 },
        { id: 203, date: '15 مايو، 2023', status: 'مكتمل', total: 480, items: 3 },
      ]
    },
    { 
      id: 4, 
      name: 'نورة سالم', 
      email: 'noura@example.com', 
      phone: '96656456789', 
      registrationDate: 'منذ يوم',
      totalOrders: 2, 
      address: 'قطر، الدوحة، اللؤلؤة، فيلا 42',
      orders: [
        { id: 301, date: '2 يونيو، 2023', status: 'مكتمل', total: 290, items: 2 },
        { id: 302, date: '18 يونيو، 2023', status: 'قيد المعالجة', total: 540, items: 3 },
      ]
    },
  ];

  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDialogOpen(true);
  };

  // Format phone numbers with country code (966) and add spaces
  const formatPhoneNumber = (phone: string) => {
    // Check if the phone starts with 9665 or 9665x
    if (phone.startsWith('9665')) {
      // Format: 966 5x xxx xxxx
      const cleaned = phone.slice(3); // Remove 966
      if (cleaned.length >= 8) {
        return `${phone.slice(0, 3)} ${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4)}`;
      }
    }
    return phone; // Return as is if it doesn't match pattern
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

      {/* Search and filters section - Improved layout with filters inline */}
      <div className="space-y-3">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
          <div className={`relative flex ${isMobile ? 'w-full' : 'w-full flex-1'}`}>
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="بحث عن عميل..." className="pr-10 bg-white border-gray-200" />
            </div>
            <Select>
              <SelectTrigger className={`bg-white border-gray-200 ${isMobile ? 'w-full mt-2' : 'w-[150px] mr-2'}`}>
                <div className="flex items-center gap-1">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-sm">فلترة</span>
                </div>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">جميع العملاء</SelectItem>
                <SelectItem value="active">العملاء النشطين</SelectItem>
                <SelectItem value="new">العملاء الجدد</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add customer button - Compact design */}
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]" size="sm">
            <Plus size={16} className="ml-1" />
            <span className={`${isMobile ? 'text-sm' : 'text-sm'}`}>إضافة عميل</span>
          </Button>
        </div>
      </div>

      {/* Customers table with improved mobile styling */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-0">
          {isMobile ? (
            // Mobile view - Clean and compact list view without horizontal scroll
            <div className="overflow-hidden">
              {customers.map((customer) => (
                <div 
                  key={customer.id} 
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-600 mt-1 dir-ltr text-right">
                      {formatPhoneNumber(customer.phone)}
                    </p>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal size={18} className="text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-sm cursor-pointer"
                          onClick={() => openCustomerDetails(customer)}
                        >
                          <Eye size={14} className="text-gray-500" />
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
                        <TableCell className="py-3 px-4 text-gray-700 text-sm dir-ltr text-right">
                          {formatPhoneNumber(customer.phone)}
                        </TableCell>
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
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-sm cursor-pointer"
                                onClick={() => openCustomerDetails(customer)}
                              >
                                <Eye size={14} className="text-gray-500" />
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

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
          <DialogContent className="max-w-3xl overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedCustomer.name}</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 text-lg border-b pb-2">معلومات العميل</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">رقم الجوال</p>
                    <p className="font-medium dir-ltr text-right">{formatPhoneNumber(selectedCustomer.phone)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                    <p className="font-medium">{selectedCustomer.registrationDate}</p>
                  </div>
                </div>
              </div>
              
              {/* Customer Address */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 text-lg border-b pb-2">العنوان</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-700">{selectedCustomer.address || 'لا يوجد عنوان مسجل'}</p>
                </div>
              </div>
            </div>
            
            {/* Customer Orders */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 text-lg border-b pb-2 mb-4">
                الطلبات ({selectedCustomer.orders?.length || 0})
              </h3>
              
              {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-right py-2 px-4 font-medium text-gray-600 text-sm">رقم الطلب</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-600 text-sm">التاريخ</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-600 text-sm">الحالة</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-600 text-sm">عدد المنتجات</th>
                        <th className="text-right py-2 px-4 font-medium text-gray-600 text-sm">المبلغ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4 text-gray-700">#{order.id}</td>
                          <td className="py-3 px-4 text-gray-700">{order.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs inline-block ${
                              order.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 
                              order.status === 'قيد المعالجة' ? 'bg-blue-100 text-blue-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{order.items}</td>
                          <td className="py-3 px-4 text-gray-700 font-medium">{order.total} ر.س</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  لا توجد طلبات سابقة
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DashboardCustomers;
