
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, Filter, Star, Sparkles, Tag } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  category: string;
  isNew: boolean;
  discount: number | null;
  rating: number;
}

interface ProductsGridProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  currency: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  currency
}) => {
  const { handle } = useParams();
  const [isAddingToCart, setIsAddingToCart] = useState<number | null>(null);
  
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation to product details
    event.stopPropagation(); // Prevent the click from bubbling up
    
    setIsAddingToCart(product.id);
    
    // Get the store ID from the URL
    const storeId = handle;
    
    if (!storeId) {
      console.error("Store ID not found");
      setIsAddingToCart(null);
      return;
    }
    
    try {
      const storeKey = `cart-${storeId}`;
      let cart = [];
      
      const savedCart = localStorage.getItem(storeKey);
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex((item: any) => item.productId === product.id);
      
      if (existingProductIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({
          id: uuidv4(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        });
      }
      
      localStorage.setItem(storeKey, JSON.stringify(cart));
      
      toast({
        title: "تمت الإضافة",
        description: `تمت إضافة ${product.name} إلى سلة التسوق`,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج إلى السلة"
      });
    } finally {
      setTimeout(() => {
        setIsAddingToCart(null);
      }, 500);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency || 'SAR'
    }).format(amount);
  };
  
  const renderMobileSearch = () => {
    return (
      <div className="mb-4 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="البحث عن منتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-full text-right rounded-full border-gray-300 bg-white shadow-sm"
          />
        </div>
      </div>
    );
  };
  
  const renderEmptyState = () => {
    return (
      <div className="col-span-full text-center py-12">
        <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
          <Tag className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد منتجات</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          {searchQuery
            ? `لم يتم العثور على منتجات تطابق "${searchQuery}"`
            : selectedCategory !== "All"
            ? `لا توجد منتجات في فئة "${selectedCategory}"`
            : "لم يتم العثور على منتجات. حاول مرة أخرى لاحقاً."}
        </p>
        {searchQuery && (
          <Button
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="bg-white"
          >
            مسح البحث
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div>
      {renderMobileSearch()}
      
      {products.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link key={product.id} to={`/${handle}/product/${product.id}`} className="block group">
              <Card className="overflow-hidden transition-all duration-300 h-full hover:shadow-md">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 relative h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {product.isNew && (
                    <Badge className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-green-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      جديد
                    </Badge>
                  )}
                  
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-red-500 text-white border-0">
                      خصم {product.discount}%
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                    
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < product.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 mr-1">
                        {product.rating}
                      </span>
                    </div>
                    
                    <div className="font-semibold text-sm">
                      {product.discount ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-red-600">
                            {formatCurrency(
                              product.price - (product.price * (product.discount / 100))
                            )}
                          </span>
                          <span className="text-gray-400 line-through text-xs">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span>{formatCurrency(product.price)}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8 border-gray-200"
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAddingToCart === product.id || !product.inStock}
                  >
                    {isAddingToCart === product.id ? (
                      "جاري الإضافة..."
                    ) : !product.inStock ? (
                      "غير متوفر"
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 ml-1" />
                        إضافة للسلة
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
