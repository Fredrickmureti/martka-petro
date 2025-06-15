import { Card, CardContent } from '@/components/ui/card';
import { useAdminLocations } from '@/hooks/useAdminLocations';
import { LocationsTable } from './components/LocationsTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { LocationFormDialog } from './components/LocationFormDialog';
import { DeleteLocationDialog } from './components/DeleteLocationDialog';
import { toast } from '@/components/ui/use-toast';
import { LocationFormValues } from './components/form/locationFormSchema';
import { PlusCircle } from 'lucide-react';

const AdminLocations = () => {
    const { 
        useGetLocations, 
        useAddLocation,
        useUpdateLocation,
        useDeleteLocation
    } = useAdminLocations();

    const { data: locations, isLoading, isError, error } = useGetLocations();
    const addLocation = useAddLocation();
    const updateLocation = useUpdateLocation();
    const deleteLocation = useDeleteLocation();
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Tables<'locations'> | null>(null);

    const handleAdd = () => {
        setSelectedLocation(null);
        setIsFormOpen(true);
    };
    
    const handleEdit = (location: Tables<'locations'>) => {
        setSelectedLocation(location);
        setIsFormOpen(true);
    };

    const handleDeleteRequest = (location: Tables<'locations'>) => {
        setSelectedLocation(location);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (values: LocationFormValues) => {
        try {
            if (selectedLocation) {
                await updateLocation.mutateAsync({ ...values, id: selectedLocation.id });
            } else {
                await addLocation.mutateAsync(values);
            }
            setIsFormOpen(false);
            setSelectedLocation(null);
        } catch (e) {
            // Errors are handled by the mutation's onError callback
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedLocation) {
             if (selectedLocation.is_headquarters) {
                toast({
                    title: "Action Prohibited",
                    description: "Cannot delete the headquarters. Please set another location as headquarters first.",
                    variant: "destructive",
                });
                return;
            }
            try {
                await deleteLocation.mutateAsync(selectedLocation.id);
                setIsDeleteOpen(false);
                setSelectedLocation(null);
            } catch (e) {
                // Errors are handled by the mutation's onError callback
            }
        }
    };

    if (isError && error) {
        toast({
            variant: "destructive",
            title: "Error fetching locations",
            description: error.message,
        })
    }

  return (
    <>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold">Locations</h1>
                <p className="text-muted-foreground">Manage your company's office locations.</p>
            </div>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Location
            </Button>
        </div>
        <Card>
            <CardContent className="pt-6">
                {isLoading && (
                    <div className="space-y-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                )}
                {!isLoading && locations && locations.length > 0 && (
                    <LocationsTable locations={locations} onEdit={handleEdit} onDelete={handleDeleteRequest} />
                )}
                {!isLoading && locations?.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold">No locations found</h3>
                        <p className="text-muted-foreground mb-4">Add a new location to get started.</p>
                        <Button onClick={handleAdd}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Location
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>

        <LocationFormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSubmit={handleFormSubmit}
            location={selectedLocation}
            isSubmitting={addLocation.isPending || updateLocation.isPending}
        />

        <DeleteLocationDialog
            isOpen={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onConfirm={handleDeleteConfirm}
            isDeleting={deleteLocation.isPending}
        />
    </>
  );
};

export default AdminLocations;
