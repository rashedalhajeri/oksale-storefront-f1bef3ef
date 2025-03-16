
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PaginationState } from '@/utils/dashboard/orderTypes';

interface OrderPaginationProps {
  pagination: PaginationState;
  handlePageChange: (newPage: number) => void;
  isMobile: boolean;
}

const OrderPagination: React.FC<OrderPaginationProps> = ({ pagination, handlePageChange, isMobile }) => {
  const renderPaginationItems = () => {
    const { page, totalPages } = pagination;
    const items = [];
    
    const pageNumbers = new Set<number>();
    pageNumbers.add(1);
    pageNumbers.add(totalPages);
    
    for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
      pageNumbers.add(i);
    }
    
    const sortedPageNumbers = Array.from(pageNumbers).sort((a, b) => a - b);
    
    for (let i = 0; i < sortedPageNumbers.length; i++) {
      const pageNum = sortedPageNumbers[i];
      
      if (i > 0 && sortedPageNumbers[i] - sortedPageNumbers[i - 1] > 1) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={pageNum}>
          <PaginationLink
            isActive={page === pageNum}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  if (pagination.totalPages <= 1) return null;

  if (isMobile) {
    return (
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(1)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm">
            {pagination.page} / {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.totalPages)}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagination.page - 1);
            }}
            className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        
        {renderPaginationItems()}
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagination.page + 1);
            }}
            className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default OrderPagination;
