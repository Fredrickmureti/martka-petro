
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, DollarSign, Award, Clock, Users } from 'lucide-react';
import { 
  useAllCareersContent, 
  useAllCareersCards,
  useUpdateCareersContent,
  useCreateCareersCard,
  useUpdateCareersCard,
  useDeleteCareersCard
} from '@/hooks/useCareersManagement';
import { Tables } from '@/integrations/supabase/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const iconOptions = [
  { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Clock', label: 'Clock', icon: Clock },
  { value: 'Users', label: 'Users', icon: Users },
];

const ManageCareers = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Tables<'careers_cards'> | null>(null);
  const [editingContent, setEditingContent] = useState<Tables<'careers_content'> | null>(null);

  // Data queries
  const { data: contentSections = [], isLoading: isLoadingContent } = useAllCareersContent();
  const { data: cards = [], isLoading: isLoadingCards } = useAllCareersCards();

  // Mutations
  const updateContentMutation = useUpdateCareersContent();
  const createCardMutation = useCreateCareersCard();
  const updateCardMutation = useUpdateCareersCard();
  const deleteCardMutation = useDeleteCareersCard();

  const handleContentUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingContent) return;

    const formData = new FormData(e.currentTarget);
    const contentData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    };

    try {
      await updateContentMutation.mutateAsync({
        id: editingContent.id,
        content: contentData,
      });
      toast({ title: 'Success', description: 'Content updated successfully' });
      setEditingContent(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update content',
        variant: 'destructive',
      });
    }
  };

  const handleCardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const cardData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      value: formData.get('value') as string,
      unit: formData.get('unit') as string,
      card_type: formData.get('card_type') as string,
      is_active: true,
      sort_order: parseInt(formData.get('sort_order') as string) || 0,
    };

    try {
      if (editingCard) {
        await updateCardMutation.mutateAsync({ id: editingCard.id, card: cardData });
        toast({ title: 'Success', description: 'Card updated successfully' });
      } else {
        await createCardMutation.mutateAsync(cardData);
        toast({ title: 'Success', description: 'Card created successfully' });
      }
      
      setIsDialogOpen(false);
      setEditingCard(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: editingCard ? 'Failed to update card' : 'Failed to create card',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCard = async (id: number) => {
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCardMutation.mutateAsync(id);
        toast({ title: 'Success', description: 'Card deleted successfully' });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete card',
          variant: 'destructive',
        });
      }
    }
  };

  const openCreateDialog = () => {
    setEditingCard(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (card: Tables<'careers_cards'>) => {
    setEditingCard(card);
    setIsDialogOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Users;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Careers Content</h1>
          <p className="text-muted-foreground">Manage careers page content, benefits, and statistics.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="cards">Cards & Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="grid gap-6">
            {isLoadingContent ? (
              <div className="text-center py-8">Loading content...</div>
            ) : (
              contentSections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{section.section_key?.replace('_', ' ')}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingContent(section)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <strong>Title:</strong> {section.title}
                      </div>
                      <div>
                        <strong>Description:</strong> {section.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Content Edit Dialog */}
          {editingContent && (
            <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit {editingContent.section_key?.replace('_', ' ')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContentUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingContent.title || ''}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingContent.description || ''}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setEditingContent(null)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Benefits & Statistics Cards</CardTitle>
                  <CardDescription>Manage benefit cards and company statistics.</CardDescription>
                </div>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingCards ? (
                <div className="text-center py-8">Loading cards...</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cards.map((card) => {
                    const IconComponent = getIconComponent(card.icon || 'Users');
                    return (
                      <Card key={card.id} className="relative">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant={card.card_type === 'benefit' ? 'default' : 'secondary'}>
                              {card.card_type}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(card)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{card.title}</h3>
                              {card.value && (
                                <div className="text-lg font-bold text-blue-600">
                                  {card.value}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {card.description && (
                            <p className="text-xs text-muted-foreground mb-2">{card.description}</p>
                          )}
                          {card.unit && (
                            <p className="text-xs text-slate-500">{card.unit}</p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Card Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCard ? 'Edit Card' : 'Add New Card'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCardSubmit} className="space-y-4">
            <div>
              <Label htmlFor="card_type">Card Type</Label>
              <Select name="card_type" defaultValue={editingCard?.card_type || 'benefit'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="benefit">Benefit</SelectItem>
                  <SelectItem value="stat">Statistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingCard?.title || ''}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingCard?.description || ''}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="icon">Icon</Label>
              <Select name="icon" defaultValue={editingCard?.icon || 'Users'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Value (for stats)</Label>
                <Input
                  id="value"
                  name="value"
                  defaultValue={editingCard?.value || ''}
                  placeholder="e.g., 25+, 95%"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  defaultValue={editingCard?.unit || ''}
                  placeholder="e.g., Years in Business"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={editingCard?.sort_order || 0}
                min="0"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCard ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageCareers;
