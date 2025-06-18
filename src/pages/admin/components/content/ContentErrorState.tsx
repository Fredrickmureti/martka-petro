
import { Settings } from 'lucide-react';

interface ContentErrorStateProps {
  footerError?: Error | null;
  aboutError?: Error | null;
  supportError?: Error | null;
}

export const ContentErrorState = ({ footerError, aboutError, supportError }: ContentErrorStateProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-red-600" />
            Manage Website Content
          </h1>
          <p className="text-red-500">Error loading content. Please try refreshing the page.</p>
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">
          There was an error loading the content sections. Please check your database connection and try again.
        </p>
        {footerError && <p className="text-sm text-red-600 mt-2">Footer: {footerError.message}</p>}
        {aboutError && <p className="text-sm text-red-600 mt-2">About: {aboutError.message}</p>}
        {supportError && <p className="text-sm text-red-600 mt-2">Support: {supportError.message}</p>}
      </div>
    </div>
  );
};
