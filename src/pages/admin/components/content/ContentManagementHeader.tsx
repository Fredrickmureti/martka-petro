
import { Settings } from 'lucide-react';

interface ContentManagementHeaderProps {
  title: string;
  description: string;
}

export const ContentManagementHeader = ({ title, description }: ContentManagementHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-blue-600" />
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
