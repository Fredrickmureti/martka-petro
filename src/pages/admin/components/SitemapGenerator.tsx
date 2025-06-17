
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Globe } from 'lucide-react';
import { downloadSitemap } from '@/utils/sitemapGenerator';
import { toast } from 'sonner';

export const SitemapGenerator = () => {
  const handleDownloadSitemap = async () => {
    try {
      await downloadSitemap();
      toast.success('Sitemap downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate sitemap');
      console.error('Sitemap generation error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          SEO Sitemap Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Generate an XML sitemap that includes all your products, projects, and static pages for better search engine indexing.
        </p>
        <Button onClick={handleDownloadSitemap} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Sitemap.xml
        </Button>
      </CardContent>
    </Card>
  );
};
