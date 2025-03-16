import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Plus, MoreHorizontal, Pencil, Trash2, Eye, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formatDistance, isAfter, subWeeks, format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { parsePhoneNumber, AsYouType } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
  registrationTimestamp: Date;
  totalOrders: number;
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

// Form types
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const DashboardCustomers: React.FC<DashboardCustomersProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  
  // Mock customers data with extended information and proper dates
  const customers: Customer[] = [
    { 
      id: 1, 
      name: 'راشد الراجحي', 
      email: 'rhajri965@gmail.com', 
      phone: '+96566605014', 
      registrationDate: 'منذ ثانية',
      registrationTimestamp: new Date(),
      totalOrders: 0, 
      address: 'الكويت، حولي، شارع المثنى، بناية 24، شقة 7',
      orders: [],
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      email: 'fatima@example.com', 
      phone: '+96650765432', 
      registrationDate: 'منذ دقيقة',
      registrationTimestamp: new Date(now.getTime() - 60 * 1000),
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
      phone: '+96654987654', 
      registrationDate: 'منذ ساعة',
      registrationTimestamp: new Date(now.getTime() - 60 * 60 * 1000),
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
      phone: '+96656456789', 
      registrationDate: 'منذ يوم',
      registrationTimestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000 * 10), // 10 days ago for testing
      totalOrders: 2, 
      address: 'قطر، الدوحة، اللؤلؤة، فيلا 42',
      orders: [
        { id: 301, date: '2 يونيو، 2023', status: 'مكتمل', total: 290, items: 2 },
        { id: 302, date: '18 يونيو، 2023', status: 'قيد المعالجة', total: 540, items: 3 },
      ]
    },
  ];

  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Forms
  const addForm = useForm<CustomerFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    }
  });

  const editForm = useForm<CustomerFormData>();

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDialogOpen(true);
  };

  const openEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    editForm.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || '',
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteConfirmation = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = (data: CustomerFormData) => {
    console.log('Adding customer:', data);
    // Here you would add the customer to the database
    // For mock purposes, we'll just show a success message
    toast({
      title: "تم إضافة العميل بنجاح",
      description: `تم إضافة العميل ${data.name} بنجاح.`,
    });
    addForm.reset();
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (data: CustomerFormData) => {
    console.log('Editing customer:', data);
    // Here you would update the customer in the database
    // For mock purposes, we'll just show a success message
    toast({
      title: "تم تحديث العميل بنجاح",
      description: `تم تحديث بيانات العميل ${data.name} بنجاح.`,
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;
    
    console.log('Deleting customer:', selectedCustomer.id);
    // Here you would delete the customer from the database
    // For mock purposes, we'll just show a success message
    toast({
      title: "تم حذف العميل بنجاح",
      description: `تم حذف العميل ${selectedCustomer.name} بنجاح.`,
    });
    setIsDeleteDialogOpen(false);
  };

  // Format registration date - show date if older than a week
  const formatRegistrationDate = (customer: Customer) => {
    if (isAfter(oneWeekAgo, customer.registrationTimestamp)) {
      return format(customer.registrationTimestamp, 'dd MMM yyyy', { locale: ar });
    }
    return formatDistance(customer.registrationTimestamp, now, { addSuffix: true, locale: ar });
  };
  
  // Format phone numbers with country code and proper spacing
  const formatPhoneNumber = (phone: string) => {
    try {
      if (!phone) return '';
      
      // Ensure the phone number starts with +
      const phoneWithPlus = phone.startsWith('+') ? phone : `+${phone}`;
      const phoneNumber = parsePhoneNumber(phoneWithPlus);
      
      if (phoneNumber) {
        return phoneNumber.formatInternational();
      }
      
      // Fallback to basic formatting with AsYouType if parsing fails
      return new AsYouType().input(phoneWithPlus);
    } catch (error) {
      console.error("Error formatting phone number:", error);
      return phone;
    }
  };

  // Get country code from phone number
  const getCountryFromPhone = (phone: string) => {
    try {
      if (!phone) return null;
      
      const phoneWithPlus = phone.startsWith('+') ? phone : `+${phone}`;
      const phoneNumber = parsePhoneNumber(phoneWithPlus);
      
      return phoneNumber?.country?.toLowerCase() || null;
    } catch (error) {
      console.error("Error getting country from phone:", error);
      return null;
    }
  };

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {/* Header section */}
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
          <div className={`relative flex ${isMobile ? 'w-full' : 'w-full flex-1'}`}>
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="بحث عن عميل..." className="pr-10 bg-white border-gray-200" />
            </div>
            <Button variant="outline" size="icon" className="bg-white border-gray-200 h-10 w-10 mr-2">
              <Filter size={16} className="text-gray-500" />
            </Button>
          </div>

          {/* Add customer button */}
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]" 
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} className="ml-1" />
            <span className={`${isMobile ? 'text-sm' : 'text-sm'}`}>إضافة عميل</span>
          </Button>
        </div>
      </div>

      {/* Customers table */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-0">
          {isMobile ? (
            // Mobile view - Improved phone number display
            <div className="overflow-hidden">
              {customers.map((customer) => (
                <div 
                  key={customer.id} 
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <div className="flex items-center gap-2 mt-1 flex-row-reverse">
                      <p className="text-sm text-gray-600 dir-ltr text-left">
                        {formatPhoneNumber(customer.phone)}
                      </p>
                      {getCountryFromPhone(customer.phone) && (
                        <span className="inline-block h-5 w-5 overflow-hidden rounded-sm border border-gray-200">
                          <img 
                            src={`https://flagcdn.com/w20/${getCountryFromPhone(customer.phone)}.png`} 
                            alt="Country flag" 
                            className="h-full w-full object-cover"
                          />
                        </span>
                      )}
                    </div>
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
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-sm cursor-pointer"
                          onClick={() => openEditCustomer(customer)}
                        >
                          <Pencil size={14} className="text-gray-500" />
                          <span>تعديل</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-sm text-red-600 cursor-pointer"
                          onClick={() => openDeleteConfirmation(customer)}
                        >
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
            // Desktop view - Improved phone number column
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[140px]">الاسم</TableHead>
                    <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[160px]">رقم الجوال</TableHead>
                    <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[130px]">تاريخ التسجيل</TableHead>
                    <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[180px]">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right py-3 font-semibold text-gray-600 min-w-[100px]">الطلبات</TableHead>
                    <TableHead className="text-right py-3 font-semibold text-gray-600 w-16">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id} className="border-b hover:bg-gray-50">
                      <TableCell className="py-3 px-4 font-medium text-gray-900">{customer.name}</TableCell>
                      <TableCell className="py-3 px-4 text-gray-700">
                        <div className="flex items-center gap-2 flex-row-reverse justify-end">
                          <span className="text-sm text-left dir-ltr">{formatPhoneNumber(customer.phone)}</span>
                          {getCountryFromPhone(customer.phone) && (
                            <span className="inline-block h-5 w-5 overflow-hidden rounded-sm border border-gray-200">
                              <img 
                                src={`https://flagcdn.com/w20/${getCountryFromPhone(customer.phone)}.png`} 
                                alt="Country flag" 
                                className="h-full w-full object-cover"
                              />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-700 text-sm">{formatRegistrationDate(customer)}</TableCell>
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
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-sm cursor-pointer"
                              onClick={() => openEditCustomer(customer)}
                            >
                              <Pencil size={14} className="text-gray-500" />
                              <span>تعديل</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-sm text-red-600 cursor-pointer"
                              onClick={() => openDeleteConfirmation(customer)}
                            >
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
          )}

          {/* Pagination */}
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
              <DialogDescription>
                معلومات العميل وطلباته السابقة
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[70vh]">
              <div className="p-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 text-lg border-b pb-2">معلومات العميل</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="mt-1 text-gray-400 h-4 w-4" />
                        <div>
                          <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                          <p className="font-medium">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-gray-400 h-4 w-4" />
                        <div>
                          <p className="text-sm text-gray-500">رقم الجوال</p>
                          <div className="font-medium flex items-center gap-2 flex-row-reverse justify-end">
                            <span className="text-left dir-ltr">{formatPhoneNumber(selectedCustomer.phone)}</span>
                            {getCountryFromPhone(selectedCustomer.phone) && (
                              <span className="inline-block h-5 w-5 overflow-hidden rounded-sm border border-gray-200">
                                <img 
                                  src={`https://flagcdn.com/w20/${getCountryFromPhone(selectedCustomer.phone)}.png`} 
                                  alt="Country flag" 
                                  className="h-full w-full object-cover"
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-1 text-gray-400 h-4 w-4" />
                        <div>
                          <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                          <p className="font-medium">{formatRegistrationDate(selectedCustomer)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Customer Address */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 text-lg border-b pb-2">العنوان</h3>
                    <div className="bg-gray-50 p-3 rounded-md flex items-start gap-3">
                      <MapPin className="mt-1 text-gray-400 h-4 w-4 flex-shrink-0" />
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
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Customer Dialog - Improved phone input */}
      {selectedCustomer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl">تعديل بيانات العميل</DialogTitle>
              <DialogDescription>
                قم بتعديل بيانات العميل ثم اضغط على زر الحفظ للتأكيد.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4 mt-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">الاسم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="edit-name"
                      className="pr-10"
                      placeholder="اسم العميل"
                      {...editForm.register("name", { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="edit-email"
                      type="email"
                      className="pr-10"
                      placeholder="البريد الإلكتروني"
                      {...editForm.register("email", { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">رقم الجوال</Label>
                  <div className="dir-ltr">
                    <PhoneInput
                      international
                      defaultCountry="SA"
                      value={editForm.watch("phone")}
                      onChange={(value) => editForm.setValue("phone", value || "")}
                      className="w-full rounded-md border border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="+966xxxxxxxxx"
                      numberInputProps={{
                        className: "w-full h-10 px-3 py-2 font-normal"
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-address">العنوان</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 text-gray-400" size={16} />
                    <textarea
                      id="edit-address"
                      className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-20"
                      placeholder="عنوان العميل"
                      {...editForm.register("address")}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Customer Dialog - Improved phone input */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl">إضافة عميل جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات العميل الجديد ثم اضغط على زر الإضافة للتأكيد.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={addForm.handleSubmit(handleAddSubmit)} className="space-y-4 mt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">الاسم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="add-name"
                    className="pr-10"
                    placeholder="اسم العميل"
                    {...addForm.register("name", { required: true })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="add-email"
                    type="email"
                    className="pr-10"
                    placeholder="البريد الإلكتروني"
                    {...addForm.register("email", { required: true })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-phone">رقم الجوال</Label>
                <div className="dir-ltr">
                  <PhoneInput
                    international
                    defaultCountry="SA"
                    value={addForm.watch("phone")}
                    onChange={(value) => addForm.setValue("phone", value || "")}
                    className="w-full rounded-md border border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="+966xxxxxxxxx"
                    numberInputProps={{
                      className: "w-full h-10 px-3 py-2 font-normal"
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-address">العنوان</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 text-gray-400" size={16} />
                  <textarea
                    id="add-address"
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-20"
                    placeholder="عنوان العميل"
                    {...addForm.register("address")}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="
