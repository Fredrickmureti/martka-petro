
import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { ProductsHeader } from './components/ProductsHeader';
import { ProductList } from './components/ProductList';
import { ProductFormDialog } from './components/ProductFormDialog';
import { DeleteProductDialog } from './components/DeleteProductDialog';
import { ProductFormValues } from './components/ProductForm';

const AdminProducts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Tables<'products'> | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const {
    products,
    isLoadingProducts,
    productsError,
    categories,
    isLoadingCategories,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
    deleteProduct,
    isDeleting,
  } = useAdminProducts();
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Tables<'products'>) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  
  const handleDeleteProduct = (id: number) => {
      setDeletingProductId(id);
      setIsDeleteDialogOpen(true);
  }

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId, {
          onSuccess: () => {
            setIsDeleteDialogOpen(false);
            setDeletingProductId(null);
          }
      });
    }
  }

  const handleFormSubmit = (values: ProductFormValues) => {
    const onSettled = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    }

    if (editingProduct) {
      updateProduct({ id: editingProduct.id, data: values }, { onSuccess: onSettled });
    } else {
      createProduct(values, { onSuccess: onSettled });
    }
  };
  
  const isLoading = isLoadingProducts || isLoadingCategories;

  return (
    <div>
      <ProductsHeader onAddProduct={handleAddProduct} />
      <ProductList
        products={products}
        isLoading={isLoading}
        error={productsError as Error | null}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      
      <ProductFormDialog
        isOpen={isFormOpen}
        onOpenChange={(isOpen) => {
            setIsFormOpen(isOpen);
            if (!isOpen) setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
        product={editingProduct}
        categories={categories || []}
        isSubmitting={isCreating || isUpdating}
      />

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminProducts;
