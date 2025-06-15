
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ProductForm, ProductFormValues } from './ProductForm';
import { Tables } from '@/integrations/supabase/types';

type ProductFormDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: ProductFormValues) => void;
    product: Tables<'products'> | null;
    categories: Pick<Tables<'product_categories'>, 'id' | 'name'>[];
    isSubmitting: boolean;
};

export const ProductFormDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    product,
    categories,
    isSubmitting,
}: ProductFormDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                    {product ? 'Update the details of this product.' : 'Fill in the details for the new product.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <ProductForm
                        onSubmit={onSubmit}
                        product={product}
                        categories={categories}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
