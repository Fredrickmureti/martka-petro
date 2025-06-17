
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Globe, Zap } from 'lucide-react';
import { downloadAdvancedSitemap } from '@/utils/advancedSitemap';
import { toast } from 'sonner';

export const SitemapGenerator = () => {
  const handleDownloadSitemap = async () => {
    try {
      await downloadAdvancedSitemap();
      toast.success('Advanced SEO sitemap downloaded successfully!');
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
          Advanced SEO Sitemap Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Generate a comprehensive XML sitemap with image optimization, structured data, and all dynamic content for maximum SEO performance.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Zap className="h-4 w-4" />
            <span>Includes products, projects, images, and priority optimization</span>
          </div>
          
          <Button onClick={handleDownloadSitemap} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Advanced Sitemap.xml
          </Button>
          
          <div className="text-xs text-muted-foreground">
            <p>This sitemap includes:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>All static pages with priority weights</li>
              <li>Dynamic product pages with image metadata</li>
              <li>Project pages with structured data</li>
              <li>Optimized change frequencies</li>
              <li>Image sitemaps for better image SEO</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
