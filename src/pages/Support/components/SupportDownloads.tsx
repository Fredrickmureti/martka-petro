
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

interface SupportDownloadsProps {
  downloadsContent?: {
    title?: string;
    description?: string;
  };
  downloads?: Array<{
    title: string;
    description: string;
    file_type: string;
    file_size: string;
    file_url?: string;
  }>;
  documents?: Array<{
    title: string;
    description: string;
    file_type: string;
    file_size: string;
    file_url: string;
    category: string;
  }>;
  isLoadingContent: boolean;
  isLoadingDownloads: boolean;
  isLoadingDocuments: boolean;
}

export const SupportDownloads = ({ 
  downloadsContent, 
  downloads, 
  documents, 
  isLoadingContent, 
  isLoadingDownloads, 
  isLoadingDocuments 
}: SupportDownloadsProps) => {
  return (
    <section className="py-20 bg-background perspective-1200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          {isLoadingContent ? (
            <>
              <Skeleton className="h-9 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-full max-w-lg mx-auto" />
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{downloadsContent?.title}</h2>
              <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{downloadsContent?.description}</p>
            </>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Database downloads */}
          {isLoadingDownloads ? Array.from({ length: 2 }).map((_, i) => 
            <Card key={i} className="hover-3d-gentle transform transition-all duration-500">
              <CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent>
            </Card>
          ) : (downloads || []).map((download, index) => (
            <Card key={`download-${index}`} 
                  className="hover-3d-gentle group transform-gpu"
                  style={{ 
                    animation: `fadeInRight 0.6s ease-out ${0.2 * index}s both`,
                    transformStyle: 'preserve-3d'
                  }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 transform group-hover:translateZ-10 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{download.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{download.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{download.file_type}</span>
                      <span>{download.file_size}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" 
                          className="transform group-hover:translateZ-20 group-hover:scale-110 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                          onClick={() => window.open(download.file_url || '#', '_blank')}>
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Document management downloads */}
          {isLoadingDocuments ? Array.from({ length: 2 }).map((_, i) => 
            <Card key={i} className="hover-3d-gentle transform transition-all duration-500">
              <CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent>
            </Card>
          ) : (documents || []).map((document, index) => (
            <Card key={`doc-${index}`} 
                  className="hover-3d-gentle group transform-gpu"
                  style={{ 
                    animation: `fadeInLeft 0.6s ease-out ${0.2 * index}s both`,
                    transformStyle: 'preserve-3d'
                  }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 transform group-hover:translateZ-10 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{document.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{document.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{document.file_type}</span>
                      <span>{document.file_size}</span>
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded capitalize">{document.category}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" 
                          className="transform group-hover:translateZ-20 group-hover:scale-110 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                          onClick={() => window.open(document.file_url, '_blank')}>
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
