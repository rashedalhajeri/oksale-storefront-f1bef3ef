
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { ShoppingBag } from 'lucide-react';

interface TopProductsCardProps {
  topProducts: any[];
  loading: boolean;
  currency?: string;
}

const TopProductsCard: React.FC<TopProductsCardProps> = ({ topProducts, loading, currency = 'SAR' }) => {
  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-full">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">أفضل المنتجات مبيعاً</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              المنتجات الأكثر مبيعاً في متجرك
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {topProducts.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">لا يوجد بيانات للمنتجات</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-center">عدد المبيعات</TableHead>
                    <TableHead className="text-left">المبلغ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-right">{product.name}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                          {product.sales}
                        </span>
                      </TableCell>
                      <TableCell className="text-left">{product.amount} {currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopProductsCard;
