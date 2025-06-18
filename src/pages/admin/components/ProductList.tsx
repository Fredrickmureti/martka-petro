
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Grid, List, MoreHorizontal, Trash2, Edit, Package, Tag, DollarSign, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/integrations/supabase/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ProductWithCategory } from '@/hooks/useAdminProducts';
import { ProductPreviewCard } from './PreviewCard';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import FuturisticButton from './FuturisticButton';

type ProductListProps = {
  products: ProductWithCategory[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onEdit: (product: Tables<'products'>) => void;
  onDelete: (id: number) => void;
};

export const ProductList = ({ products, isLoading, error, onEdit, onDelete }: ProductListProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  if (isLoading) {
    return (
      <Card className={cn(
        "border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
        "backdrop-blur-sm shadow-2xl"
      )}>
        <CardContent className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-400/20 animate-pulse" />
            </div>
            <p className="text-blue-300 font-mono">Loading neural database...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn(
        "border-0 bg-gradient-to-br from-red-900/20 to-slate-800/80",
        "backdrop-blur-sm shadow-2xl border border-red-500/30"
      )}>
        <CardContent className="text-red-400 text-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
              <Package className="w-8 h-8 text-red-400" />
            </div>
            <p className="font-mono">System Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className={cn(
        "border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
        "backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500"
      )}>
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none rounded-xl" />
        
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                Product Database
              </CardTitle>
              <CardDescription className="text-blue-300 font-mono">
                {products?.length || 0} product{products?.length !== 1 ? 's' : ''} in neural storage
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <FuturisticButton
                variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Matrix View
              </FuturisticButton>
              <FuturisticButton
                variant={viewMode === 'table' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4 mr-2" />
                Data Stream
              </FuturisticButton>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!products || products.length === 0 ? (
        <Card className={cn(
          "border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
          "backdrop-blur-sm shadow-2xl"
        )}>
          <CardContent className="text-center py-16">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center border border-slate-500/30">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 text-lg font-medium">Neural Storage Empty</p>
                <p className="text-slate-500 font-mono">Initialize database with first product entry</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductPreviewCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className={cn(
          "relative overflow-hidden rounded-xl border-0",
          "bg-gradient-to-br from-slate-900/80 to-slate-800/80",
          "backdrop-blur-sm shadow-2xl"
        )}>
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none rounded-xl" />
          
          <div className="p-6 relative z-10">
            <div className="border border-slate-700/50 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                    <TableHead className="text-blue-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="text-blue-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Category
                      </div>
                    </TableHead>
                    <TableHead className="text-blue-300 font-semibold">Manufacturer</TableHead>
                    <TableHead className="text-blue-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price
                      </div>
                    </TableHead>
                    <TableHead className="text-blue-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Stock
                      </div>
                    </TableHead>
                    <TableHead className="w-[100px] text-right text-blue-300 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow 
                      key={product.id}
                      className={cn(
                        "border-slate-700/30 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20",
                        "transition-all duration-300 group animate-fade-in-up",
                        `stagger-${Math.min(index + 1, 6)}`
                      )}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                          <span className="text-white">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/30">
                          {product.product_categories?.name || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{product.manufacturer || 'N/A'}</TableCell>
                      <TableCell className="text-slate-300">{product.price || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            "bg-gradient-to-r",
                            product.in_stock 
                              ? "from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30"
                              : "from-red-500/20 to-red-400/20 text-red-300 border-red-400/30"
                          )}
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full mr-2 animate-pulse",
                            product.in_stock ? "bg-green-400" : "bg-red-400"
                          )} />
                          {product.in_stock ? 'Available' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <FuturisticButton size="sm" variant="secondary">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </FuturisticButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end"
                            className={cn(
                              "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
                              "border-slate-700/50 shadow-2xl"
                            )}
                          >
                            <DropdownMenuItem 
                              onSelect={() => onEdit(product)}
                              className="text-slate-300 hover:bg-blue-900/30 hover:text-white transition-colors duration-200"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700/50" />
                            <DropdownMenuItem 
                              onSelect={() => onDelete(product.id)} 
                              className="text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
