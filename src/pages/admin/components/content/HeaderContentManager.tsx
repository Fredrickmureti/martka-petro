
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHeaderContent, useUpdateHeaderContent } from '@/hooks/useContentManagement';

export const HeaderContentManager = () => {
  const { toast } = useToast();
  const { data: headerContent, isLoading: isLoadingHeader } = useHeaderContent();
  const updateHeaderMutation = useUpdateHeaderContent();

  const handleUpdateHeader = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateHeaderMutation.mutateAsync({
        company_name: formData.get('company_name') as string,
        logo_url: formData.get('logo_url') as string || null,
      });
      
      toast({
        title: 'Success',
        description: 'Header content updated successfully! Changes will appear on the site immediately.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update header content',
        variant: 'destructive',
      });
    }
  };

  if (isLoadingHeader) {
    return <div className="text-center py-8">Loading header content...</div>;
  }

  return (
    <Card className="border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-blue-600" />
          Header Content & Branding
        </CardTitle>
        <CardDescription>Manage your company name and logo that appears in the website header.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateHeader} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                defaultValue={headerContent?.company_name || ''}
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                name="logo_url"
                type="url"
                defaultValue={headerContent?.logo_url || ''}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty to use default logo</p>
            </div>
          </div>
          
          {headerContent?.logo_url && (
            <div>
              <Label>Current Logo Preview</Label>
              <div className="mt-2 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <img 
                  src={headerContent.logo_url} 
                  alt="Current logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
          
          <Button type="submit" disabled={updateHeaderMutation.isPending} className="w-full md:w-auto">
            {updateHeaderMutation.isPending ? 'Updating...' : 'Update Header Content'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
