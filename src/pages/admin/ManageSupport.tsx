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
import { Plus, Edit, Trash2, Phone, MessageCircle } from 'lucide-react';
import { 
  useSupportFaqs, 
  useSupportDownloads, 
  useSupportOptions 
} from '@/hooks/useSupportPage';
import {
  useCreateSupportFaq,
  useUpdateSupportFaq,
  useDeleteSupportFaq,
  useCreateSupportDownload,
  useUpdateSupportDownload,
  useDeleteSupportDownload,
  useCreateSupportOption,
  useUpdateSupportOption,
  useDeleteSupportOption
} from '@/hooks/useSupportManagement';
import { Tables } from '@/integrations/supabase/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const actionTypeOptions = [
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'link', label: 'Website Link' },
];

const ManageSupport = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('options');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogType, setDialogType] = useState<'faq' | 'download' | 'option'>('option');

  // Data queries
  const { data: faqs = [], isLoading: isLoadingFaqs } = useSupportFaqs();
  const { data: downloads = [], isLoading: isLoadingDownloads } = useSupportDownloads();
  const { data: options = [], isLoading: isLoadingOptions } = useSupportOptions();

  // Mutations
  const createFaqMutation = useCreateSupportFaq();
  const updateFaqMutation = useUpdateSupportFaq();
  const deleteFaqMutation = useDeleteSupportFaq();
  
  const createDownloadMutation = useCreateSupportDownload();
  const updateDownloadMutation = useUpdateSupportDownload();
  const deleteDownloadMutation = useDeleteSupportDownload();
  
  const createOptionMutation = useCreateSupportOption();
  const updateOptionMutation = useUpdateSupportOption();
  const deleteOptionMutation = useDeleteSupportOption();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (dialogType === 'faq') {
        const faqData = {
          question: formData.get('question') as string,
          answer: formData.get('answer') as string,
          is_active: true,
          sort_order: parseInt(formData.get('sort_order') as string) || 0,
        };

        if (editingItem) {
          await updateFaqMutation.mutateAsync({ id: editingItem.id, faq: faqData });
          toast({ title: 'Success', description: 'FAQ updated successfully' });
        } else {
          await createFaqMutation.mutateAsync(faqData);
          toast({ title: 'Success', description: 'FAQ created successfully' });
        }
      } else if (dialogType === 'download') {
        const downloadData = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          file_type: formData.get('file_type') as string,
          file_size: formData.get('file_size') as string,
          file_url: formData.get('file_url') as string,
          is_active: true,
          sort_order: parseInt(formData.get('sort_order') as string) || 0,
        };

        if (editingItem) {
          await updateDownloadMutation.mutateAsync({ id: editingItem.id, download: downloadData });
          toast({ title: 'Success', description: 'Download updated successfully' });
        } else {
          await createDownloadMutation.mutateAsync(downloadData);
          toast({ title: 'Success', description: 'Download created successfully' });
        }
      } else if (dialogType === 'option') {
        // Handle contact info based on action type
        const actionType = formData.get('action_type') as string;
        let contactInfo = {};
        let actionUrl = formData.get('action_url') as string;

        if (actionType === 'phone') {
          const phone = formData.get('contact_phone') as string;
          contactInfo = { phone };
          actionUrl = `tel:${phone.replace(/\D/g, '')}`;
        } else if (actionType === 'whatsapp') {
          const whatsapp = formData.get('contact_whatsapp') as string;
          contactInfo = { whatsapp };
          actionUrl = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
        } else if (actionType === 'email') {
          const email = formData.get('contact_email') as string;
          contactInfo = { email };
          actionUrl = `mailto:${email}`;
        }

        const optionData = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          icon: formData.get('icon') as string,
          action_text: formData.get('action_text') as string,
          availability: formData.get('availability') as string,
          action_type: actionType,
          action_url: actionUrl,
          contact_info: Object.keys(contactInfo).length > 0 ? contactInfo : null,
          is_active: true,
          sort_order: parseInt(formData.get('sort_order') as string) || 0,
        };

        if (editingItem) {
          await updateOptionMutation.mutateAsync({ id: editingItem.id, option: optionData });
          toast({ title: 'Success', description: 'Support option updated successfully' });
        } else {
          await createOptionMutation.mutateAsync(optionData);
          toast({ title: 'Success', description: 'Support option created successfully' });
        }
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingItem ? 'update' : 'create'} ${dialogType}`,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number, type: 'faq' | 'download' | 'option') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === 'faq') {
          await deleteFaqMutation.mutateAsync(id);
        } else if (type === 'download') {
          await deleteDownloadMutation.mutateAsync(id);
        } else {
          await deleteOptionMutation.mutateAsync(id);
        }
        toast({ title: 'Success', description: `${type} deleted successfully` });
      } catch (error) {
        toast({
          title: 'Error',
          description: `Failed to delete ${type}`,
          variant: 'destructive',
        });
      }
    }
  };

  const openCreateDialog = (type: 'faq' | 'download' | 'option') => {
    setDialogType(type);
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: any, type: 'faq' | 'download' | 'option') => {
    setDialogType(type);
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const getActionTypeDisplay = (option: any) => {
    const contactInfo = option.contact_info as any;
    if (option.action_type === 'phone' && contactInfo?.phone) {
      return `Phone: ${contactInfo.phone}`;
    } else if (option.action_type === 'whatsapp' && contactInfo?.whatsapp) {
      return `WhatsApp: ${contactInfo.whatsapp}`;
    } else if (option.action_type === 'email' && contactInfo?.email) {
      return `Email: ${contactInfo.email}`;
    } else if (option.action_url) {
      return `Link: ${option.action_url}`;
    }
    return option.action_type || 'link';
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Support Content</h1>
          <p className="text-muted-foreground">Manage support options, FAQs, and downloads with contact functionality.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="options">Support Options</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="options">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Support Contact Options</CardTitle>
                  <CardDescription>Manage support contact methods with phone, WhatsApp, email, and links.</CardDescription>
                </div>
                <Button onClick={() => openCreateDialog('option')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Support Option
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingOptions ? (
                <div className="text-center py-8">Loading support options...</div>
              ) : (
                <div className="space-y-4">
                  {options.map((option) => (
                    <div key={option.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {option.action_type === 'phone' ? (
                              <Phone size={20} className="text-blue-600" />
                            ) : (
                              <MessageCircle size={20} className="text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{option.title}</h3>
                            <p className="text-sm text-muted-foreground">{getActionTypeDisplay(option)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={option.is_active ? "default" : "secondary"}>
                            {option.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(option, 'option')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(option.id, 'option')}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {option.description && (
                        <p className="text-muted-foreground mb-2">{option.description}</p>
                      )}
                      {option.availability && (
                        <p className="text-sm text-blue-600">{option.availability}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Manage FAQ content for the support page.</CardDescription>
                </div>
                <Button onClick={() => openCreateDialog('faq')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingFaqs ? (
                <div className="text-center py-8">Loading FAQs...</div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <div className="flex gap-2">
                          <Badge variant={faq.is_active ? "default" : "secondary"}>
                            {faq.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(faq, 'faq')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(faq.id, 'faq')}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Support Downloads</CardTitle>
                  <CardDescription>Manage downloadable resources.</CardDescription>
                </div>
                <Button onClick={() => openCreateDialog('download')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingDownloads ? (
                <div className="text-center py-8">Loading downloads...</div>
              ) : (
                <div className="space-y-4">
                  {downloads.map((download) => (
                    <div key={download.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{download.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {download.file_type} • {download.file_size}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={download.is_active ? "default" : "secondary"}>
                            {download.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(download, 'download')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(download.id, 'download')}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {download.description && (
                        <p className="text-muted-foreground">{download.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {dialogType === 'faq' ? 'FAQ' : dialogType === 'download' ? 'Download' : 'Support Option'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {dialogType === 'option' && (
              <>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingItem?.title || ''}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingItem?.description || ''}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="action_type">Action Type</Label>
                    <Select name="action_type" defaultValue={editingItem?.action_type || 'link'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {actionTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      name="icon"
                      defaultValue={editingItem?.icon || ''}
                      placeholder="e.g., Phone, MessageCircle"
                    />
                  </div>
                </div>
                
                {/* Contact Information Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_phone">Phone Number</Label>
                    <Input
                      id="contact_phone"
                      name="contact_phone"
                      type="tel"
                      defaultValue={(editingItem?.contact_info as any)?.phone || ''}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_whatsapp">WhatsApp Number</Label>
                    <Input
                      id="contact_whatsapp"
                      name="contact_whatsapp"
                      type="tel"
                      defaultValue={(editingItem?.contact_info as any)?.whatsapp || ''}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="contact_email">Email Address</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    defaultValue={(editingItem?.contact_info as any)?.email || ''}
                    placeholder="support@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="action_url">Custom Action URL (optional)</Label>
                  <Input
                    id="action_url"
                    name="action_url"
                    type="url"
                    defaultValue={editingItem?.action_url || ''}
                    placeholder="https://example.com/page"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="action_text">Action Button Text</Label>
                    <Input
                      id="action_text"
                      name="action_text"
                      defaultValue={editingItem?.action_text || ''}
                      placeholder="e.g., Call Now, Send Message"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      name="availability"
                      defaultValue={editingItem?.availability || ''}
                      placeholder="e.g., 24/7, Mon-Fri 9AM-5PM"
                    />
                  </div>
                </div>
              </>
            )}

            {dialogType === 'faq' && (
              <>
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    name="question"
                    defaultValue={editingItem?.question || ''}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    name="answer"
                    defaultValue={editingItem?.answer || ''}
                    rows={4}
                    required
                  />
                </div>
              </>
            )}

            {dialogType === 'download' && (
              <>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingItem?.title || ''}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingItem?.description || ''}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="file_type">File Type</Label>
                    <Input
                      id="file_type"
                      name="file_type"
                      defaultValue={editingItem?.file_type || ''}
                      placeholder="e.g., PDF, DOC"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="file_size">File Size</Label>
                    <Input
                      id="file_size"
                      name="file_size"
                      defaultValue={editingItem?.file_size || ''}
                      placeholder="e.g., 2.5 MB"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="file_url">File URL</Label>
                  <Input
                    id="file_url"
                    name="file_url"
                    type="url"
                    defaultValue={editingItem?.file_url || ''}
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={editingItem?.sort_order || 0}
                min="0"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageSupport;
