
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ProductForm } from './ProductForm';
import { ProductFormValues } from './form/productFormSchema';
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
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                    <DialogDescription>
                        {product ? 'Update the details of this product.' : 'Fill in the details for the new product.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 overflow-y-auto max-h-[calc(95vh-120px)]">
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
