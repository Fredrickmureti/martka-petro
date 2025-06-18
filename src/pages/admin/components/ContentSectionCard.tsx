
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Settings, Code, Eye, Zap } from 'lucide-react';
import { ContentPreview } from './content/ContentPreview';
import FuturisticInput from './FuturisticInput';
import FuturisticTextarea from './FuturisticTextarea';
import FuturisticButton from './FuturisticButton';
import { cn } from '@/lib/utils';

interface ContentSectionCardProps {
  section: {
    id: number;
    title: string;
    section_key: string;
    content: any;
    is_active: boolean;
  };
  onUpdate: (id: number, data: any) => void;
  isUpdating: boolean;
}

const ContentSectionCard = ({ section, onUpdate, isUpdating }: ContentSectionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: section.title || '',
    content: JSON.stringify(section.content, null, 2)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedContent = JSON.parse(formData.content);
      onUpdate(section.id, {
        title: formData.title,
        content: parsedContent,
      });
      setIsEditing(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your content structure.');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: section.title || '',
      content: JSON.stringify(section.content, null, 2)
    });
    setIsEditing(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Edit Form */}
      <Card className={cn(
        "relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
        "backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500",
        "hover:scale-[1.02] transform-gpu group"
      )}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl flex items-center gap-3 text-white">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                {section.title}
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={cn(
                  "text-xs bg-slate-800/50 border-blue-400/30 text-blue-300",
                  "hover:bg-blue-900/30 transition-colors duration-300"
                )}>
                  <Code className="w-3 h-3 mr-1" />
                  {section.section_key}
                </Badge>
                <Badge variant={section.is_active ? "default" : "secondary"} className={cn(
                  "text-xs transition-all duration-300",
                  section.is_active 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/25" 
                    : "bg-slate-600 text-slate-300"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    section.is_active ? "bg-white animate-pulse" : "bg-slate-400"
                  )} />
                  {section.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            {!isEditing && (
              <FuturisticButton
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </FuturisticButton>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FuturisticInput
                id={`title_${section.id}`}
                label="Section Title"
                value={formData.title}
                onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                required
              />
              
              <FuturisticTextarea
                id={`content_${section.id}`}
                label="Content Configuration"
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                rows={12}
                required
              />
              
              <div className="flex gap-3 pt-4">
                <FuturisticButton 
                  type="submit" 
                  loading={isUpdating}
                  variant="primary"
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isUpdating ? 'Updating Neural Network...' : 'Save Changes'}
                </FuturisticButton>
                <FuturisticButton 
                  type="button" 
                  variant="secondary" 
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </FuturisticButton>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <h4 className="font-medium text-sm text-blue-300 mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Current Configuration Matrix
                </h4>
                <div className={cn(
                  "bg-slate-950/70 rounded-xl p-4 border border-slate-700/50",
                  "backdrop-blur-sm shadow-inner text-sm max-h-48 overflow-y-auto",
                  "scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600"
                )}>
                  <pre className="text-slate-300 text-xs leading-relaxed font-mono">
                    {JSON.stringify(section.content, null, 2)}
                  </pre>
                </div>
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none" />
              </div>
            </div>
          )}
        </CardContent>
        
        {/* Neural network connection lines */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-32 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute right-0 w-px bg-gradient-to-r from-blue-400/20 to-transparent",
                "h-4 transition-all duration-300 group-hover:from-blue-400/60"
              )}
              style={{ top: `${i * 20}%` }}
            />
          ))}
        </div>
      </Card>

      {/* Live Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-bold text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Live Neural Preview
          </h4>
        </div>
        
        <div className={cn(
          "relative overflow-hidden rounded-xl border border-slate-700/50",
          "bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm",
          "shadow-xl hover:shadow-2xl transition-shadow duration-300"
        )}>
          {/* Preview header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 border-b border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm text-slate-300 font-mono">preview://section.render</span>
            </div>
          </div>
          
          {/* Preview content */}
          <div className="p-6">
            <ContentPreview
              sectionKey={section.section_key}
              title={section.title}
              content={section.content}
              isActive={section.is_active}
            />
          </div>
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ContentSectionCard;
