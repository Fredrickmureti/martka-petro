
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { useAllCareers, useDeleteCareer } from '@/hooks/useCareers';
import { Tables } from '@/integrations/supabase/types';
import { CareersForm } from './components/careers/CareersForm';
import { CareerCard } from './components/careers/CareerCard';

const AdminCareers = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Tables<'careers'> | null>(null);

  const { data: careers = [], isLoading } = useAllCareers();
  const deleteMutation = useDeleteCareer();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this career?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({
          title: 'Success',
          description: 'Career deleted successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete career',
          variant: 'destructive',
        });
      }
    }
  };

  const openEditDialog = (career: Tables<'careers'>) => {
    setEditingCareer(career);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCareer(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCareer(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Careers Management</h1>
          <p className="text-muted-foreground">Manage job postings and career opportunities.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Career
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCareer ? 'Edit Career' : 'Add New Career'}
              </DialogTitle>
            </DialogHeader>
            <CareersForm editingCareer={editingCareer} onClose={closeDialog} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading careers...</div>
      ) : (
        <div className="space-y-6">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
          
          {careers.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No careers found. Click "Add Career" to create your first job posting.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default AdminCareers;
