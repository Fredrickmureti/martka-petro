
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStatsContent, useUpdateStatsContent } from '@/hooks/useStatsManagement';
import { toast } from 'sonner';
import { TrendingUp, CheckCircle, Award, Star } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  description: string;
}

const ManageStats = () => {
  const { data: statsData, isLoading } = useStatsContent();
  const updateStats = useUpdateStatsContent();

  const [stats, setStats] = useState<Record<string, StatItem>>({
    clients: {
      title: 'Happy Clients',
      value: '500+',
      description: 'Satisfied customers worldwide'
    },
    projects: {
      title: 'Projects Completed',
      value: '1000+',
      description: 'Successfully delivered projects'
    },
    experience: {
      title: 'Years of Experience',
      value: '15+',
      description: 'Industry experience and expertise'
    },
    rating: {
      title: 'Customer Rating',
      value: '4.9/5',
      description: 'Average customer satisfaction rating'
    }
  });

  React.useEffect(() => {
    if (statsData) {
      setStats({
        clients: {
          title: statsData.clients_title?.title || 'Happy Clients',
          value: statsData.clients_value?.value || '500+',
          description: statsData.clients_description?.description || 'Satisfied customers worldwide'
        },
        projects: {
          title: statsData.projects_title?.title || 'Projects Completed',
          value: statsData.projects_value?.value || '1000+',
          description: statsData.projects_description?.description || 'Successfully delivered projects'
        },
        experience: {
          title: statsData.experience_title?.title || 'Years of Experience',
          value: statsData.experience_value?.value || '15+',
          description: statsData.experience_description?.description || 'Industry experience and expertise'
        },
        rating: {
          title: statsData.rating_title?.title || 'Customer Rating',
          value: statsData.rating_value?.value || '4.9/5',
          description: statsData.rating_description?.description || 'Average customer satisfaction rating'
        }
      });
    }
  }, [statsData]);

  const handleStatChange = (statKey: string, field: keyof StatItem, value: string) => {
    setStats(prev => ({
      ...prev,
      [statKey]: {
        ...prev[statKey],
        [field]: value
      }
    }));
  };

  const handleSave = async (statKey: string) => {
    const stat = stats[statKey];
    
    try {
      await Promise.all([
        updateStats.mutateAsync({
          elementId: `${statKey}_title`,
          content: { title: stat.title }
        }),
        updateStats.mutateAsync({
          elementId: `${statKey}_value`,
          content: { value: stat.value }
        }),
        updateStats.mutateAsync({
          elementId: `${statKey}_description`,
          content: { description: stat.description }
        })
      ]);

      toast.success(`${stat.title} updated successfully`);
    } catch (error) {
      toast.error('Failed to update stats');
      console.error('Error updating stats:', error);
    }
  };

  const getIcon = (statKey: string) => {
    const icons = {
      clients: TrendingUp,
      projects: CheckCircle,
      experience: Award,
      rating: Star
    };
    const IconComponent = icons[statKey as keyof typeof icons];
    return IconComponent ? <IconComponent className="text-green-500" size={24} /> : null;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage Stats</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Homepage Statistics</h1>
        <p className="text-muted-foreground">
          Update the statistics displayed on the homepage hero section.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(stats).map(([statKey, stat]) => (
          <Card key={statKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getIcon(statKey)}
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${statKey}-title`}>Title</Label>
                <Input
                  id={`${statKey}-title`}
                  value={stat.title}
                  onChange={(e) => handleStatChange(statKey, 'title', e.target.value)}
                  placeholder="Enter stat title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${statKey}-value`}>Value</Label>
                <Input
                  id={`${statKey}-value`}
                  value={stat.value}
                  onChange={(e) => handleStatChange(statKey, 'value', e.target.value)}
                  placeholder="Enter stat value (e.g., 500+)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${statKey}-description`}>Description</Label>
                <Textarea
                  id={`${statKey}-description`}
                  value={stat.description}
                  onChange={(e) => handleStatChange(statKey, 'description', e.target.value)}
                  placeholder="Enter stat description"
                  rows={3}
                />
              </div>

              <Button 
                onClick={() => handleSave(statKey)}
                disabled={updateStats.isPending}
                className="w-full"
              >
                {updateStats.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageStats;
