
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSupportFaqs, useSupportDownloads, useSupportOptions } from '@/hooks/useSupportPage';

const ManageSupport = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: faqs, isLoading: isLoadingFaqs } = useSupportFaqs();
  const { data: downloads, isLoading: isLoadingDownloads } = useSupportDownloads();
  const { data: supportOptions, isLoading: isLoadingOptions } = useSupportOptions();

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ table, id, isActive }: { table: 'support_faqs' | 'support_downloads' | 'support_options'; id: number; isActive: boolean }) => {
      const { error } = await supabase
        .from(table)
        .update({ is_active: !isActive })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      toast({
        title: 'Success',
        description: `Item ${variables.isActive ? 'deactivated' : 'activated'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['supportFaqs'] });
      queryClient.invalidateQueries({ queryKey: ['supportDownloads'] });
      queryClient.invalidateQueries({ queryKey: ['supportOptions'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update item status',
        variant: 'destructive',
      });
    },
  });

  const handleToggleActive = (table: 'support_faqs' | 'support_downloads' | 'support_options', id: number, isActive: boolean) => {
    toggleActiveMutation.mutate({ table, id, isActive });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Support Page</h1>
          <p className="text-muted-foreground">Update content for the public support page.</p>
        </div>
      </div>

      <Tabs defaultValue="faqs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="options">Support Options</TabsTrigger>
        </TabsList>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Frequently Asked Questions
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </CardTitle>
              <CardDescription>Manage questions and answers displayed on the support page.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFaqs ? (
                <div className="text-center py-8">Loading FAQs...</div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Answer</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Order</TableHead>
                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faqs && faqs.length > 0 ? (
                        faqs.map((faq) => (
                          <TableRow key={faq.id}>
                            <TableCell className="font-medium max-w-xs">
                              <div className="truncate">{faq.question}</div>
                            </TableCell>
                            <TableCell className="max-w-md">
                              <div className="truncate text-muted-foreground">{faq.answer}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={faq.is_active ? 'default' : 'secondary'}>
                                {faq.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>{faq.sort_order}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleActive('support_faqs', faq.id, faq.is_active || false)}
                                >
                                  {faq.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            No FAQs found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Downloads & Resources
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Download
                </Button>
              </CardTitle>
              <CardDescription>Manage downloadable files and resources.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingDownloads ? (
                <div className="text-center py-8">Loading downloads...</div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloads && downloads.length > 0 ? (
                        downloads.map((download) => (
                          <TableRow key={download.id}>
                            <TableCell className="font-medium">{download.title}</TableCell>
                            <TableCell className="max-w-md">
                              <div className="truncate text-muted-foreground">{download.description}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{download.file_type}</Badge>
                            </TableCell>
                            <TableCell>{download.file_size}</TableCell>
                            <TableCell>
                              <Badge variant={download.is_active ? 'default' : 'secondary'}>
                                {download.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleActive('support_downloads', download.id, download.is_active || false)}
                                >
                                  {download.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No downloads found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Support Options
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </CardTitle>
              <CardDescription>Manage support contact options and methods.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOptions ? (
                <div className="text-center py-8">Loading support options...</div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supportOptions && supportOptions.length > 0 ? (
                        supportOptions.map((option) => (
                          <TableRow key={option.id}>
                            <TableCell className="font-medium">{option.title}</TableCell>
                            <TableCell className="max-w-md">
                              <div className="truncate text-muted-foreground">{option.description}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{option.icon}</Badge>
                            </TableCell>
                            <TableCell>{option.availability}</TableCell>
                            <TableCell>
                              <Badge variant={option.is_active ? 'default' : 'secondary'}>
                                {option.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleActive('support_options', option.id, option.is_active || false)}
                                >
                                  {option.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No support options found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageSupport;
