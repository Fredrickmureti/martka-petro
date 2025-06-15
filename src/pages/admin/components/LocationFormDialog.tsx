
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { LocationForm } from './LocationForm';
import { LocationFormValues } from './form/locationFormSchema';
import { Tables } from '@/integrations/supabase/types';

type LocationFormDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: LocationFormValues) => void;
    location: Tables<'locations'> | null;
    isSubmitting: boolean;
};

export const LocationFormDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    location,
    isSubmitting,
}: LocationFormDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{location ? 'Edit Location' : 'Add New Location'}</DialogTitle>
                    <DialogDescription>
                    {location ? 'Update the details of this location.' : 'Fill in the details for the new location.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <LocationForm
                        onSubmit={onSubmit}
                        location={location}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
