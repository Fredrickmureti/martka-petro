
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Settings, Building, Zap, Wrench, Shield, Headphones } from 'lucide-react';
import { useAllServices, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useServices';
import { Tables } from '@/integrations/supabase/types';
import { Switch } from '@/components/ui/switch';

const iconMap = {
  Building,
  Zap,
  Settings,
  Wrench,
  Shield,
  Headphones,
};

const AdminServices = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Tables<'services'> | null>(null);

  const { data: services = [], isLoading } = useAllServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const featuresText = formData.get('features') as string;
    let features: string[] = [];
    
    if (featuresText) {
      try {
        features = featuresText.split('\n').filter(feature => feature.trim() !== '');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid features format',
          variant: 'destructive',
        });
        return;
      }
    }

    const serviceData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      features: features,
      image_url: formData.get('image_url') as string,
      icon: formData.get('icon') as string,
      sort_order: parseInt(formData.get('sort_order') as string) || 0,
      is_active: formData.get('is_active') === 'on',
    };

    try {
      if (editingService) {
        await updateMutation.mutateAsync({
          id: editingService.id,
          service: serviceData,
        });
        toast({
          title: 'Success',
          description: 'Service updated successfully',
        });
      } else {
        await createMutation.mutateAsync(serviceData);
        toast({
          title: 'Success',
          description: 'Service created successfully',
        });
      }
      
      setIsDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: editingService ? 'Failed to update service' : 'Failed to create service',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({
          title: 'Success',
          description: 'Service deleted successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete service',
          variant: 'destructive',
        });
      }
    }
  };

  const openEditDialog = (service: Tables<'services'>) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const getFeaturesArray = (features: any): string[] => {
    if (Array.isArray(features)) {
      return features;
    }
    return [];
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent || Settings;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage service offerings and content.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingService?.title || ''}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    name="icon"
                    defaultValue={editingService?.icon || ''}
                    placeholder="e.g., Building, Zap, Settings"
                  />
                </div>
                <div>
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    defaultValue={editingService?.sort_order || 0}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  defaultValue={editingService?.image_url || ''}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingService?.description || ''}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  name="features"
                  defaultValue={
                    editingService?.features 
                      ? getFeaturesArray(editingService.features).join('\n')
                      : ''
                  }
                  rows={6}
                  placeholder="Enter each feature on a new line"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingService?.is_active ?? true}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingService ? 'Update' : 'Create'} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading services...</div>
      ) : (
        <div className="space-y-6">
          {services.map((service) => {
            const featuresArray = getFeaturesArray(service.features);
            const IconComponent = getIcon(service.icon || 'Settings');
            
            return (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">Order: {service.sort_order}</Badge>
                          <Badge variant={service.is_active ? "default" : "secondary"}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          {service.icon && (
                            <Badge variant="outline">{service.icon}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {service.description && (
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                  )}
                  
                  {service.image_url && (
                    <div className="mb-4">
                      <img 
                        src={service.image_url} 
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {featuresArray.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {featuresArray.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          
          {services.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No services found. Click "Add Service" to create your first service.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default AdminServices;
