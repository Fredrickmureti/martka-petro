
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus } from 'lucide-react';
import { usePageBackgrounds, useUpdatePageBackground, useCreatePageBackground } from '@/hooks/usePageContent';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';
import BackgroundForm from './BackgroundForm';

const BackgroundImageManager = () => {
  const [editingBackground, setEditingBackground] = useState<Tables<'page_backgrounds'> | null>(null);
  const [isNewBackgroundOpen, setIsNewBackgroundOpen] = useState(false);

  const { data: backgrounds, isLoading: backgroundsLoading } = usePageBackgrounds();
  const updateBackground = useUpdatePageBackground();
  const createBackground = useCreatePageBackground();

  const [backgroundForm, setBackgroundForm] = useState({
    page_name: '',
    section_key: '',
    image_url: '',
    overlay_opacity: 0.7,
    is_active: true
  });

  const handleBackgroundSubmit = () => {
    if (editingBackground) {
      updateBackground.mutate(
        { id: editingBackground.id, data: backgroundForm },
        {
          onSuccess: () => {
            toast({ title: "Background updated successfully" });
            setEditingBackground(null);
          },
          onError: (error) => {
            toast({ title: "Error updating background", description: error.message, variant: "destructive" });
          }
        }
      );
    } else {
      createBackground.mutate(backgroundForm, {
        onSuccess: () => {
          toast({ title: "Background created successfully" });
          setIsNewBackgroundOpen(false);
          resetBackgroundForm();
        },
        onError: (error) => {
          toast({ title: "Error creating background", description: error.message, variant: "destructive" });
        }
      });
    }
  };

  const resetBackgroundForm = () => {
    setBackgroundForm({
      page_name: '',
      section_key: '',
      image_url: '',
      overlay_opacity: 0.7,
      is_active: true
    });
  };

  const editBackground = (background: Tables<'page_backgrounds'>) => {
    setEditingBackground(background);
    setBackgroundForm({
      page_name: background.page_name,
      section_key: background.section_key,
      image_url: background.image_url || '',
      overlay_opacity: background.overlay_opacity || 0.7,
      is_active: background.is_active || true
    });
  };

  if (backgroundsLoading) {
    return <div>Loading backgrounds...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Background Images</h3>
        <Dialog open={isNewBackgroundOpen} onOpenChange={setIsNewBackgroundOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetBackgroundForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Background
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Background</DialogTitle>
            </DialogHeader>
            <BackgroundForm 
              form={backgroundForm}
              setForm={setBackgroundForm}
              onSubmit={handleBackgroundSubmit}
              submitText="Create Background"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {backgrounds?.map((background) => (
          <Card key={background.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-base">
                  {background.page_name} - {background.section_key}
                </CardTitle>
                <Badge variant={background.is_active ? 'default' : 'secondary'}>
                  {background.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => editBackground(background)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              {editingBackground?.id === background.id ? (
                <BackgroundForm 
                  form={backgroundForm}
                  setForm={setBackgroundForm}
                  onSubmit={handleBackgroundSubmit}
                  onCancel={() => setEditingBackground(null)}
                  submitText="Save"
                  showCancel
                />
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Image: {background.image_url || 'Not set'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Opacity: {background.overlay_opacity}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BackgroundImageManager;
