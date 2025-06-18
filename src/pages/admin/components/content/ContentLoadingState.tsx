
import { Settings } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const ContentLoadingState = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-blue-600" />
            Manage Website Content
          </h1>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
};
