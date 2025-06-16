
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, MapPin, Clock, Briefcase } from 'lucide-react';
import { useAllCareers, useCreateCareer, useUpdateCareer, useDeleteCareer } from '@/hooks/useCareers';
import { Tables } from '@/integrations/supabase/types';

const AdminCareers = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Tables<'careers'> | null>(null);

  const { data: careers = [], isLoading } = useAllCareers();
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();
  const deleteMutation = useDeleteCareer();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const requirementsText = formData.get('requirements') as string;
    let requirements: string[] = [];
    
    if (requirementsText) {
      try {
        requirements = requirementsText.split('\n').filter(req => req.trim() !== '');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid requirements format',
          variant: 'destructive',
        });
        return;
      }
    }

    const careerData = {
      title: formData.get('title') as string,
      department: formData.get('department') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      salary_range: formData.get('salary_range') as string,
      experience_required: formData.get('experience_required') as string,
      requirements: requirements,
      is_active: true,
    };

    try {
      if (editingCareer) {
        await updateMutation.mutateAsync({
          id: editingCareer.id,
          career: careerData,
        });
        toast({
          title: 'Success',
          description: 'Career updated successfully',
        });
      } else {
        await createMutation.mutateAsync(careerData);
        toast({
          title: 'Success',
          description: 'Career created successfully',
        });
      }
      
      setIsDialogOpen(false);
      setEditingCareer(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: editingCareer ? 'Failed to update career' : 'Failed to create career',
        variant: 'destructive',
      });
    }
  };

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

  // Helper function to safely get requirements as array
  const getRequirementsArray = (requirements: any): string[] => {
    if (Array.isArray(requirements)) {
      return requirements;
    }
    return [];
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingCareer?.title || ''}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    defaultValue={editingCareer?.department || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingCareer?.location || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Employment Type</Label>
                  <Input
                    id="type"
                    name="type"
                    defaultValue={editingCareer?.type || ''}
                    placeholder="e.g., Full-time, Part-time"
                  />
                </div>
                <div>
                  <Label htmlFor="experience_required">Experience Required</Label>
                  <Input
                    id="experience_required"
                    name="experience_required"
                    defaultValue={editingCareer?.experience_required || ''}
                    placeholder="e.g., 3+ years"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="salary_range">Salary Range</Label>
                <Input
                  id="salary_range"
                  name="salary_range"
                  defaultValue={editingCareer?.salary_range || ''}
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingCareer?.description || ''}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  defaultValue={
                    editingCareer?.requirements 
                      ? getRequirementsArray(editingCareer.requirements).join('\n')
                      : ''
                  }
                  rows={6}
                  placeholder="Enter each requirement on a new line"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCareer ? 'Update' : 'Create'} Career
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading careers...</div>
      ) : (
        <div className="space-y-6">
          {careers.map((career) => {
            const requirementsArray = getRequirementsArray(career.requirements);
            
            return (
              <Card key={career.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {career.department && <Badge variant="outline">{career.department}</Badge>}
                        {career.location && (
                          <Badge variant="outline" className="text-blue-600">
                            <MapPin size={12} className="mr-1" />
                            {career.location}
                          </Badge>
                        )}
                        {career.type && (
                          <Badge variant="outline">
                            <Clock size={12} className="mr-1" />
                            {career.type}
                          </Badge>
                        )}
                        {career.experience_required && (
                          <Badge variant="outline">
                            <Briefcase size={12} className="mr-1" />
                            {career.experience_required}
                          </Badge>
                        )}
                        <Badge variant={career.is_active ? "default" : "secondary"}>
                          {career.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      {career.salary_range && (
                        <div className="text-lg font-bold text-blue-600">{career.salary_range}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(career)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(career.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {career.description && (
                    <p className="text-muted-foreground mb-4">{career.description}</p>
                  )}
                  {requirementsArray.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {requirementsArray.map((req, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          
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
