
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCreateCareer, useUpdateCareer } from '@/hooks/useCareers';
import { Tables } from '@/integrations/supabase/types';

interface CareersFormProps {
  editingCareer: Tables<'careers'> | null;
  onClose: () => void;
}

export const CareersForm = ({ editingCareer, onClose }: CareersFormProps) => {
  const { toast } = useToast();
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();

  const getRequirementsArray = (requirements: any): string[] => {
    if (Array.isArray(requirements)) {
      return requirements;
    }
    return [];
  };

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
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: editingCareer ? 'Failed to update career' : 'Failed to create career',
        variant: 'destructive',
      });
    }
  };

  return (
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
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          {editingCareer ? 'Update' : 'Create'} Career
        </Button>
      </div>
    </form>
  );
};
